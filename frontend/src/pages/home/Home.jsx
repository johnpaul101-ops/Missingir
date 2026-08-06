import React, { useState } from "react";
import Logo from "../../assets/chat.png";
import { FaCirclePlus } from "react-icons/fa6";
import { IoLogIn } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth.jsx";
import CreateRoomModal from "./CreateRoomModal.jsx";
import JoinRoomModal from "./JoinRoomModal.jsx";
const Home = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  return (
    <div className="flex items-center justify-center w-full bg-surface-bg m-2 md:m-5 p-2 rounded-md border-border-color border">
      <CreateRoomModal
        showCreateRoomModal={showCreateModal}
        setShowCreateRoomModal={setShowCreateModal}
      />
      <JoinRoomModal
        showJoinRoomModal={joinModal}
        setShowJoinRoomModal={setJoinModal}
      />
      <div className="flex flex-col items-center gap-10 md:gap-15">
        <img src={Logo} alt="Chat Bubbles" className="w-20 md:w-32" />
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-2xl md:text-5xl text-header-text-color font-text-font">
            Welcome, {user.userName}
          </h1>
          <h3 className="text-lg md:text-2xl text-header-text-color font-text-font">
            Join a room or create a new one to start chatting.
          </h3>
        </div>
        <div className="flex flex-col gap-5">
          <button
            className="flex items-center gap-4 bg-primary-btn-bg rounded-md px-5 py-2 text-lg cursor-pointer font-text-font hover:shadow-2xl hover:shadow-purple-200 transition ease-in-out duration-200"
            onClick={() => setShowCreateModal(true)}
          >
            <FaCirclePlus />
            Create Room
          </button>
          <button
            className="flex items-center gap-4 bg-transparent border-border-color border rounded-md px-5 py-2 text-lg text-header-text-color cursor-pointer font-text-font hover:shadow-2xl md:shadow-cyan-200 transition ease-in-out duration-200"
            onClick={() => setJoinModal(true)}
          >
            <IoLogIn size={25} />
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
