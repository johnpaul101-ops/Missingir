import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Logo from "../assets/chat.png";
import { useContext } from "react";
import UIContext from "../contexts/UIContext.jsx";
const Navbar = () => {
  const { openSidebar, setOpenSidebar } = useContext(UIContext);
  return (
    <header className="w-full flex items-center px-5 bg-surface-bg border-border-color border-b h-16">
      <nav className="flex items-center justify-between gap-10 w-full">
        {openSidebar ? (
          <button
            className="block md:hidden text-3xl text-header-text-color cursor-pointer"
            onClick={() => setOpenSidebar(false)}
          >
            <RxCross2 />
          </button>
        ) : (
          <button
            className="block md:hidden text-3xl text-header-text-color cursor-pointer"
            onClick={() => setOpenSidebar(true)}
          >
            <IoMenu />
          </button>
        )}

        <img src={Logo} alt="Chat Bubbles" width={35} />
      </nav>
    </header>
  );
};

export default Navbar;
