import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./src/config/mongodb.js";
import { createServer } from "http";
import { Server } from "socket.io";
import roomsRouter from "./src/routes/rooms.route.js";
import authRouter from "./src/routes/auth.route.js";
import { chatSocket } from "./src/sockets/chatSocket.js";
import messagesRouter from "./src/routes/messages.route.js";
import { socketMiddleware } from "./src/middlewares/socket.middleware.js";

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT;
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 15 * 1000,
    skipMiddlewares: true,
  },
  pingInterval: 10000,
  pingTimeout: 5000,
});

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());

socketMiddleware(io);
chatSocket(io);

app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/messages", messagesRouter);
app.use("/api/v1/auth", authRouter);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDb();
});
