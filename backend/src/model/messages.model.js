import mongoose from "mongoose";
import { type } from "os";

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  senderName: {
    type: String,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.index({ roomId: 1, createdAt: 1 });

const Message = mongoose.model("Messages", messageSchema);

export default Message;
