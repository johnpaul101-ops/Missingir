import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Rooms = mongoose.model("Rooms", roomsSchema);
export default Rooms;
