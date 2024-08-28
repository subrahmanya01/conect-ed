import mongoose from "mongoose";
const { Schema, model } = mongoose;

const friendsSchema  = new Schema(
  {
    followedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    followingTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isActive:{
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

const Friend = model("Friend", friendsSchema );
export default Friend;
