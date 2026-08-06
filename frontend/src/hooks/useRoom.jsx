import { useEffect, useState } from "react";
import {
  createNewRoom,
  joinNewRoom,
  roomsList,
} from "../services/roomServices";

export const useRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const createRoom = async (roomName) => {
    setIsLoading(true);
    try {
      const data = await createNewRoom(roomName);
      setRooms((prev) => [...prev, data.data]);

      return data;
    } catch (error) {
      throw error.response?.data || "Failed To Create New Room";
    } finally {
      setIsLoading(false);
    }
  };

  const joinRoom = async (roomId) => {
    setIsLoading(true);
    try {
      const data = await joinNewRoom(roomId);
      setRooms((prev) => [...prev, data.newRoom]);
      window.location.href = `/rooms/${roomId}`;

      return data;
    } catch (error) {
      throw error.response?.data || "Failed To Create New Room";
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getRoomsList = async () => {
      const data = await roomsList();
      setRooms(data.rooms);
    };

    getRoomsList();
  }, []);

  return { rooms, createRoom, joinRoom, isLoading };
};
