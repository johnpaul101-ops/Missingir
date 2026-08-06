import { useState } from "react";
import { createAccount, loginUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../lib/socket";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (credentials) => {
    setIsLoading(true);
    try {
      const data = await createAccount(credentials);

      navigate("/login");
      return data;
    } catch (error) {
      throw error.response?.data || "Failed Creating Account";
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const data = await loginUser(credentials);

      setUser(data.data.user);
      setToken(data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("accessToken", data.data.accessToken);
      connectSocket();
      navigate("/");
      return data;
    } catch (error) {
      throw error.response?.data || "Failed To Login";
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("active-room");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return {
    user,
    token,
    signup,
    login,
    logout,
    isLoading,
  };
};
