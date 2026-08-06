import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UIContext from "../../contexts/UIContext";
import { useRoom } from "../../hooks/useRoom";
import { useAuth } from "../../hooks/useAuth";

const RoomsList = () => {
  const { roomId } = useParams();
  const { rooms } = useRoom();
  const { user } = useAuth();
  const { hasActiveConvo, setHasActiveConvo } = useContext(UIContext);

  const handleSaveInfo = (roomInfo) => {
    setHasActiveConvo(true);
    localStorage.setItem("active-room", JSON.stringify(roomInfo));
  };

  return (
    <aside
      className={`${hasActiveConvo ? "hidden" : "flex"} md:flex flex-col gap-10 w-full md:w-72 bg-surface-bg px-5 py-5 border-border-color border-r`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-3xl text-header-text-color font-text-font">
          Rooms
        </h3>
        <span className="bg-profile-bg px-5 py-3 rounded-full text-xl font-text-font uppercase">
          {user.userName[0]}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <h6 className="text-sm text-gray-400 uppercase font-text-font">
          My Rooms
        </h6>

        <ul className="flex flex-col gap-3">
          {rooms?.map(({ id, roomName }) => (
            <li
              className={`text-header-text-color ${roomId == id ? "bg-active-link-bg" : ""} p-3 rounded-md truncate`}
              key={id}
            >
              <Link
                onClick={() => handleSaveInfo({ id, roomName })}
                className="text-lg"
                to={`/rooms/${id}`}
              >
                {roomName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RoomsList;
