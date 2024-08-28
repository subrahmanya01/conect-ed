import mongoose from "mongoose";
const { Schema, model } = mongoose;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
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

const Question = model("Question", questionSchema);
export default Question;
