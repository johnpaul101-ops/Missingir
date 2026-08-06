import React from "react";
import RoomsList from "./RoomsList";
import { Outlet } from "react-router-dom";

const Rooms = () => {
  return (
    <div className="flex w-full">
      <RoomsList />
      <Outlet />
    </div>
  );
};

export default Rooms;
