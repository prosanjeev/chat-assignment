import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Friend } from "../models/friendModel.js";

export const register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        if (!fullName || !email || !password || !confirmPassword ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exit try diffrent" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        // profilePhoto
        const ProfilePhoto = `https://avatar.iran.liara.run/public?fullName=${email}`;
      
        await User.create({
            fullName,
            email,
            password: hashedPassword,
            profilePhoto:ProfilePhoto,
            
        });
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while creating the account",
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        };

          // Update the last login time
          user.lastLogin = new Date();
          await user.save();
        
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,
            lastLogin: user.lastLogin.toISOString() // Ensure lastLogin is an ISO string
        })

    } catch (error) {
        console.log(error)
    }
}

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logout successfully."
        })
    } catch (error) {
        console.log(error)
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}

// Fetch friends for the logged-in user
// Fetch friends for the logged-in user
export const listFriends = async (req, res) => {
    const loggedInUserId = req.id; // Assuming req.id contains the logged-in user's ID

    try {
        // Find friend relationships where loggedInUserId is userId
        const friends = await Friend.find({
            userId: loggedInUserId
        })
        .populate('friendId', 'fullName email lastLogin'); // Populate friendId with fullName and email fields

        // Map the friends array to include only the necessary data for the response
        const formattedFriends = friends.map(friend => ({
            _id: friend._id,
            friendId: {
                _id: friend.friendId._id,
                fullName: friend.friendId.fullName,
                email: friend.friendId.email,
                lastLogin: friend.friendId.lastLogin,
            },
            createdAt: friend.createdAt,
            updatedAt: friend.updatedAt
        }));

        res.status(200).json(formattedFriends);
    } catch (error) {
        console.error('Error retrieving friends:', error);
        res.status(500).send('Error retrieving friends');
    }
};

// Fetch friend requests with pending status for the logged-in user
export const listFriendRequests = async (req, res) => {
    const loggedInUserId = req.id; // Assuming req.id contains the logged-in user's ID

    try {
        // Find friend relationships where friendId is loggedInUserId and status is 'pending'
        const friendRequests = await Friend.find({
            friendId: loggedInUserId,
            status: 'pending'
        })
        .populate('userId', 'fullName email profilePhoto'); // Populate userId with fullName and email fields

        // Map the friendRequests array to include only the necessary data for the response
        const formattedRequests = friendRequests.map(request => ({
            _id: request._id,
            userId: {
                _id: request.userId._id,
                fullName: request.userId.fullName,
                profilePhoto: request.userId.profilePhoto,
                email: request.userId.email,
                lastLogin: request.userId.lastLogin,
            },
            createdAt: request.createdAt,
            updatedAt: request.updatedAt
        }));

        res.status(200).json(formattedRequests);
    } catch (error) {
        console.error('Error retrieving friend requests:', error);
        res.status(500).send('Error retrieving friend requests');
    }
};


export const listNonFriends = async (req, res) => {
    const loggedInUserId = req.id;

    try {
        // Fetch friends (both userId and friendId) for the logged-in user
        const friends = await Friend.find({
            $or: [{ userId: loggedInUserId }, { friendId: loggedInUserId }]
        });

        // Extract friend IDs
        const friendIds = friends.reduce((acc, friend) => {
            acc.push(friend.userId.toString());
            acc.push(friend.friendId.toString());
            return acc;
        }, []);

        // Add the logged-in user's ID to the friendIds array to exclude self
        friendIds.push(loggedInUserId.toString());

        // Find users who are not friends with the logged-in user
        const nonFriends = await User.find({
            _id: { $nin: friendIds }
        });

        res.status(200).json(nonFriends);
    } catch (error) {
        res.status(500).send('Error retrieving non-friends');
    }
};

