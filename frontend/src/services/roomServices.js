import api from "./apiConfig.js";

export const createNewRoom = async (roomName) => {
  const response = await api.post("/rooms/create-room", { roomName: roomName });

  return response.data;
};

export const joinNewRoom = async (roomId) => {
  const response = await api.patch(`/rooms/join-room/${roomId}`);

  return response.data;
};

export const roomsList = async () => {
  const response = await api.get(`/rooms/`);

  return response.data;
};
