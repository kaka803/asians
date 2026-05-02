import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  urgent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
