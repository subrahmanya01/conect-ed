import mongoose from "mongoose";
const { Schema, model } = mongoose;

const answerSchema  = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    tags: [String],


    timezone: {
      type: Number,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Answer = model("Answer", answerSchema );
export default Answer;
