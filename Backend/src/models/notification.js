import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  link:{
    type:String,
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
    default: new Date()
  }
},
  {
    timestamps: true
  });

const Notification = model('Notification', notificationSchema)
export default Notification

