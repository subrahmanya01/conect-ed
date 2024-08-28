import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String, required: true, select: false
  },
  firstName: {
    type: String, required: true
  },
  lastName: {
    type: String, required: true
  },

  type: {
    type: String,
    enum: ['admin', 'user', 'reader', 'creator'],
    default: 'user',
  },
  tags: [String],
  language: {
    type: String,
    enum: ['tr', 'en'],
    default: 'en',
  },

  isPremium: {
    type: Boolean, default: false
  },

  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },

  countryCode: {
    type: String,
  },

  timezone: {
    type: Number
  },

  birthDate: {
    type: Date
  },

  photoUrl: {
    type: String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
  },
  isActivated: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: true
    // required: true
  },

  deletedAt: {
    type: Date
  },
  lastLogin:{
    type: String
  }

},
  {
    timestamps: true
  });

const User = model('User', userSchema)
export default User

