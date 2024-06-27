import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: "Please enter a valid email address",
        },
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: ''
    }
   
}, { timestamps: true });

export const User = mongoose.model("User", userModel)