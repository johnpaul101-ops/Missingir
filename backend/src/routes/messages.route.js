import { Router } from "express";
import { getMessages } from "../controllers/messages.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const messagesRouter = Router();

messagesRouter.get("/:roomId", authMiddleware, getMessages);

export default messagesRouter;
