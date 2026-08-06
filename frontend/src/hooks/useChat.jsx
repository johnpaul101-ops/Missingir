import { useEffect, useState } from "react";
import {
  joinRoomSocket,
  leaveRoomSocket,
  offReceiveMessageListener,
  receiveMessageSocket,
  sendMessageSocket,
} from "../lib/socket";
import { getAllMessages } from "../services/chatServices";

export const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!roomId) return;

    joinRoomSocket(roomId);
    receiveMessageSocket((newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      offReceiveMessageListener();
      leaveRoomSocket(roomId);
    };
  }, [roomId]);

  const sendMessage = (messageData) => {
    sendMessageSocket(messageData);
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await getAllMessages(roomId);

        setMessages(data.allMessages);
      } catch (error) {
        console.log(error);
      }
    };
    if (roomId) {
      getMessages();
    }
  }, [roomId]);

  return { messages, sendMessage };
};
