import api from "./apiConfig.js";

export const createAccount = async ({ userName, email, password }) => {
  const response = await api.post("/auth/sign-up", {
    userName,
    email,
    password,
  });

  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await api.post("/auth/sign-in", {
    email,
    password,
  });

  return response.data;
};
