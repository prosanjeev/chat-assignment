import mongoose from 'mongoose'

const friendModel = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    friendId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: 'pending',
        required: true,
    }
},{timestamps:true});

export const Friend = mongoose.model("Friend", friendModel);