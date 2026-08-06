import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createRooms,
  getRoomsList,
  joinRoom,
} from "../controllers/rooms.controller.js";

const roomsRouter = Router();

roomsRouter.post("/create-room", authMiddleware, createRooms);
roomsRouter.get("/", authMiddleware, getRoomsList);
roomsRouter.patch("/join-room/:roomId", authMiddleware, joinRoom);
export default roomsRouter;
