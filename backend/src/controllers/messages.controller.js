import Message from "../model/messages.model.js";

export const getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const allMessages = await Message.find({ roomId }).sort({
      createdAt: 1,
    });

    if (!allMessages) {
      return res.status(404).json({
        message: "Messages from this room is not found",
        success: false,
      });
    }

    res.status(200).json({
      allMessages,
      message: "Successfully get all messages from this room",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.error(error);
  }
};
