import { io } from "socket.io-client";
import api from "../services/apiConfig";

let socket = null;

export const connectSocket = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("No token provided");
    return null;
  }

  if (socket?.connected) {
    return socket;
  }

  if (socket) {
    socket.disconnect();
  }

  socket = io(import.meta.env.VITE_API_BASE_URL, {
    auth: {
      token,
    },
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  socket.on("connect_error", async (err) => {
    console.log("Socket Error:", err.message);

    if (err.message === "jwt expired") {
      try {
        const { data } = await api.post("/auth/refresh");

        const newToken = data.accessToken;

        localStorage.setItem("accessToken", newToken);

        socket.auth.token = newToken;

        console.log("Access token refreshed.");

        socket.connect();
      } catch (error) {
        console.error("Refresh failed:", error);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("users");

        window.location.href = "/login";
      }
    }
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

export const joinRoomSocket = (roomId) => {
  if (!socket) return;
  socket.emit("join-room", roomId);
};

export const leaveRoomSocket = (roomId) => {
  if (!socket) return;
  socket.emit("leave-room", roomId);
};

export const sendMessageSocket = (messageData) => {
  if (!socket) return;
  socket.emit("send-message", messageData);
};

export const receiveMessageSocket = (callback) => {
  if (!socket) return;

  socket.off("receive-message");

  socket.on("receive-message", (message) => {
    callback(message);
  });
};

export const offReceiveMessageListener = () => {
  if (!socket) return;
  socket.off("receive-message");
};
