import { useContext, useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import UIContext from "../../contexts/UIContext";
import { useParams } from "react-router-dom";
import { useChat } from "../../hooks/useChat";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { HiDotsHorizontal } from "react-icons/hi";
const Chat = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const { sendMessage, messages } = useChat(roomId);
  const { rooms } = useRoom();
  const { hasActiveConvo, setHasActiveConvo } = useContext(UIContext);
  const [message, setMessage] = useState("");
  const [openClipboard, setOpenClipboard] = useState(false);

  const roomInfo = rooms.find((room) => (room._id || room.id) === roomId) || {
    roomName: "Loading room...",
  };

  const textareaRef = useRef(null);
  const scrollRef = useRef(null);

  const handleTextInput = () => {
    const textarea = textareaRef.current;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message || message.trim() == "") return;

    const messageData = {
      roomId: roomInfo.id,
      senderName: user.userName,
      text: message,
    };

    sendMessage(messageData);
    setMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      className={`${hasActiveConvo ? "block" : "hidden"} md:flex flex-col w-full bg-surface-bg border-border-color border rounded-md m-2 md:m-5 h-[88.7vh] relative overflow-hidden flex flex-1`}
    >
      <div className="flex items-center justify-between px-4 h-14 w-full bg-surface-bg shadow-md shadow-black/25 rounded-t-md z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setHasActiveConvo(false)}
            className="text-xl text-header-text-color block md:hidden cursor-pointer"
          >
            <IoArrowBack />
          </button>
          <h3 className="text-xl text-header-text-color truncate">
            {roomInfo.roomName}
          </h3>
        </div>

        <div className="relative">
          <button
            className="text-xl text-header-text-color bg-active-link-bg p-3 rounded-full cursor-pointer"
            onClick={() => setOpenClipboard((prev) => !prev)}
          >
            <HiDotsHorizontal />
          </button>

          <div
            className={`${openClipboard ? "block" : "hidden"} absolute -left-24 bg-surface-bg rounded-md shadow-md shadow-black/45 w-fit px-2 py-1 z-10 cursor-pointer hover:bg-active-link-bg transition duration-200 ease-in-out`}
            onClick={() => {
              setOpenClipboard(false);
              navigator.clipboard.writeText(roomId);
            }}
          >
            <span className="text-body-text-color">Copy Room Id</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-5 p-5">
        {messages?.map(({ _id, senderName, text }) => (
          <div className="flex items-start gap-3" key={_id}>
            <span className="bg-profile-bg px-4 py-2.5 rounded-full text-sm font-text-font uppercase font-bold shrink-0">
              {senderName[0]}
            </span>

            <div className="flex flex-col gap-2">
              <span className="font-text-font text-body-text-color text-sm">
                {senderName}
              </span>

              <div className="bg-active-link-bg p-2 rounded-md max-w-44 sm:max-w-md w-fit break-words">
                <span className="text-sm text-header-text-color">{text}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex items-center px-4 py-3 gap-4 h-auto w-full bg-surface-bg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.25)] rounded-b-md z-10 shrink-0"
      >
        <div className="flex-1 bg-textarea-bg rounded-2xl px-4 py-2 focus-within:ring-1 focus-within:ring-border-color">
          <textarea
            ref={textareaRef}
            rows="1"
            placeholder="Aa"
            value={message}
            onInput={handleTextInput}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            className="w-full bg-transparent resize-none focus:outline-none text-sm text-body-text-color placeholder-gray-500 max-h-32"
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-2xl text-purple-300 p-2 rounded-full cursor-pointer hover:bg-active-link-bg transition ease-in-out duration-100"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default Chat;
