import {Friend} from '../models/friendModel.js';

// Send a friend request
export const sendFriendRequest = async (req, res) => {
    const { userId, friendId } = req.body;

    if (!userId || !friendId) {
        return res.status(400).send('userId and friendId are required');
    }

    try {
        const newFriendRequest = new Friend({ userId, friendId });
        await newFriendRequest.save();
        res.status(201).send('Friend request sent successfully');
    } catch (error) {
        res.status(500).send('Error sending friend request');
    }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
    const { requestId } = req.params;

    try {
        const friendRequest = await Friend.findById(requestId);

        if (!friendRequest) {
            return res.status(404).send('Friend request not found');
        }

        friendRequest.status = 'accepted';
        await friendRequest.save();

        res.status(200).send('Friend request accepted');
    } catch (error) {
        res.status(500).send('Error accepting friend request');
    }
};

// Reject a friend request
export const rejectFriendRequest = async (req, res) => {
    const { requestId } = req.params;

    try {
        const friendRequest = await Friend.findById(requestId);

        if (!friendRequest) {
            return res.status(404).send('Friend request not found');
        }

        friendRequest.status = 'rejected';
        await friendRequest.save();

        res.status(200).send('Friend request rejected');
    } catch (error) {
        res.status(500).send('Error rejecting friend request');
    }
};

// List all friend requests for a user
export const listFriendRequests = async (req, res) => {
    const { userId } = req.params;

    try {
        const friendRequests = await Friend.find({ friendId: userId }).populate('userId', 'name email'); // Assuming User model has name and email fields
        res.status(200).json(friendRequests);
    } catch (error) {
        res.status(500).send('Error retrieving friend requests');
    }
};


// Fetch friends for the logged-in user
export const listFriends = async (req, res) => {
    const loggedInUserId = req.id;

    try {
        // Fetch friend relationships where the logged-in user is either userId or friendId
        const friends = await Friend.find({
            $or: [{ userId: loggedInUserId }, { friendId: loggedInUserId }]
        }).populate('userId', 'name email').populate('friendId', 'name email'); // Assuming User model has name and email fields

        res.status(200).json(friends);
    } catch (error) {
        res.status(500).send('Error retrieving friends');
    }
};