import Message from "../model/messages.model.js";

const users = new Map();
const disconnectTimers = new Map();

export const chatSocket = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.user.id;
    if (disconnectTimers.has(userId)) {
      clearTimeout(disconnectTimers.get(userId));
      disconnectTimers.delete(userId);
    }

    users.set(userId, socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
    });

    socket.on("send-message", async (messageData) => {
      try {
        const newMessage = await new Message({
          roomId: messageData.roomId,
          senderId: userId,
          senderName: messageData.senderName,
          text: messageData.text,
        });

        await newMessage.save();

        io.to(messageData.roomId).emit("receive-message", newMessage);
      } catch (error) {
        console.log("Failed sending message", error);
      }
    });

    socket.on("disconnect", () => {
      disconnectTimers.set(
        userId,
        setTimeout(() => {
          if (users.get(userId) === socket.id) {
            users.delete(userId);
          }

          disconnectTimers.delete(userId);
        }, 5000),
      );
    });
  });
};
