import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Rooms from "./pages/room/Rooms.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Login from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import Chat from "./pages/room/Chat.jsx";
import { useEffect } from "react";
import { connectSocket } from "./lib/socket.js";

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      connectSocket();
    }

    const handlePageShow = (event) => {
      if (event.persisted) {
        connectSocket();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />}>
              <Route path=":roomId" element={<Chat />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
