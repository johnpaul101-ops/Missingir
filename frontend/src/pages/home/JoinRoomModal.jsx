import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useRoom } from "../../hooks/useRoom.jsx";
const JoinRoomModal = ({ showJoinRoomModal, setShowJoinRoomModal }) => {
  const { joinRoom, isLoading } = useRoom();
  const [roomId, setRoomId] = useState("");
  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!roomId || roomId.trim() == "") return;

    const data = joinRoom(roomId);

    setRoomId("");
    setShowJoinRoomModal(false);
    toast.promise(data, {
      pending: "Creating Room...",
      success: {
        render({ data }) {
          return data.message || "You Have Successfully Create New Room";
        },
      },
      error: {
        render({ data }) {
          return data.message || "Failed To Create New Room";
        },
      },
    });
  };
  return (
    <>
      <div
        className={`${showJoinRoomModal ? "block" : "hidden"} w-full h-screen bg-black/75 absolute left-0 top-0 z-40`}
        onClick={() => setShowJoinRoomModal(false)}
      ></div>
      <div
        className={`${showJoinRoomModal ? "block" : "hidden"} absolute z-50 top-96`}
      >
        <form
          className="flex flex-col gap-3 bg-surface-bg max-w-80 w-full px-3 py-4 rounded-md border-border-color border relative"
          onSubmit={handleJoinRoom}
        >
          <button
            className="absolute top-2 right-3 text-xl text-header-text-color cursor-pointer"
            onClick={() => setShowJoinRoomModal(false)}
          >
            <RxCross2 />
          </button>
          <h1 className="text-xl text-header-text-color font-text-font text-center">
            Join Room
          </h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="roomName" className="text-gray-400 text-sm">
              Room Id
            </label>
            <input
              type="text"
              placeholder="Enter room id"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="bg-active-link-bg px-2 py-3 text-body-text-color font-text-font placeholder:text-body-text-color rounded-md focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-2 py-3 bg-primary-btn-bg rounded-md font-text-font cursor-pointer hover:bg-purple-300 transition duration-200 ease-in-out"
          >
            Join Room
          </button>
        </form>
      </div>
    </>
  );
};

export default JoinRoomModal;
