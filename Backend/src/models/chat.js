import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const chatSchema = new Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt:{
    type: Date,
    Date: new Date()
  }
},
  {
    timestamps: true
  });

const Chat = model('Chat', chatSchema)
export default Chat

