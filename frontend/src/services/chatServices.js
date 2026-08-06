import api from "./apiConfig.js";

export const getAllMessages = async (roomId) => {
  const response = await api.get(`/messages/${roomId}`);

  return response.data;
};
