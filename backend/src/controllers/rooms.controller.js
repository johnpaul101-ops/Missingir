import Rooms from "../model/rooms.model.js";
import User from "../model/user.model.js";

export const createRooms = async (req, res) => {
  const { roomName } = req.body;
  const id = req.user._id;

  try {
    const newRoom = await Rooms.create({
      roomName: roomName,
      creatorId: id,
    });

    const roomData = {
      id: newRoom._id,
      roomName: newRoom.roomName,
      creatorId: newRoom.creatorId,
    };

    const updateUser = await User.findByIdAndUpdate(id, {
      $addToSet: {
        rooms: roomData,
      },
    });

    res.status(201).json({
      data: roomData,
      message: "Successfully Created Room",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.error(error);
  }
};

export const joinRoom = async (req, res) => {
  const { roomId } = req.params;
  const id = req.user._id;
  try {
    const findRoom = await Rooms.findOne({ _id: roomId });

    if (!findRoom) {
      return res
        .status(404)
        .json({ message: "Room with this id is not existing", success: false });
    }

    const user = await User.findById(id);

    if (user.rooms.some((room) => room.id == roomId)) {
      return res
        .status(409)
        .json({ message: "You already joined this room", success: false });
    }

    const roomData = {
      id: findRoom._id,
      roomName: findRoom.roomName,
      creatorName: findRoom.creatorId,
    };

    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        $addToSet: {
          rooms: roomData,
        },
      },
    );

    res.status(200).json({
      newRoom: roomData,
      message: "Successfully Joined Room",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.error(error);
  }
};

export const getRoomsList = async (req, res) => {
  const id = req.user._id;
  try {
    const roomsList = await User.findOne({ _id: id });

    if (!roomsList.rooms || roomsList.rooms.length <= 0) {
      return res
        .status(200)
        .json({ message: "Your Rooms List is Empty", success: false });
    }

    res.status(200).json({
      rooms: roomsList.rooms,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.error(error);
  }
};
