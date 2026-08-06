import React, { useContext } from "react";
import { IoHome } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import UIContext from "../contexts/UIContext";
import { ImExit } from "react-icons/im";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const { logout } = useAuth();
  const { openSidebar, setOpenSidebar } = useContext(UIContext);
  const links = [
    {
      path: "/",
      icon: <IoHome />,
    },
    {
      path: "/rooms",
      icon: <HiUserGroup />,
    },
  ];

  return (
    <>
      <div
        className={`${openSidebar ? "block" : "hidden"} md:hidden w-full h-screen bg-black/75 absolute left-0 top-0`}
        onClick={() => setOpenSidebar(false)}
      ></div>
      <aside
        className={`fixed h-[calc(100vh-4rem)] -left-96 ${openSidebar ? "left-0" : ""} transition-all ease-in-out duration-200 md:static flex flex-col items-center gap-5 bg-surface-bg border-border-color border-r w-24 py-5 px-2 z-40`}
      >
        <div className="flex flex-1 flex-col gap-5">
          {links.map(({ path, icon }) => (
            <NavLink
              to={path}
              key={path}
              onClick={() => setOpenSidebar(false)}
              className={({ isActive }) =>
                `text-3xl text-header-text-color p-5 rounded-md hover:text-purple-200 transition ease-in-out duration-200 ${isActive ? "bg-active-link-bg text-purple-200" : ""}`
              }
            >
              {icon}
            </NavLink>
          ))}
        </div>
        <button
          className={`text-3xl text-red-400 hover:text-red-500 transition ease-in-out duration-200 cursor-pointer`}
          onClick={() => logout()}
        >
          <ImExit />
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
