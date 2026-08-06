import jwt from "jsonwebtoken";

export const socketMiddleware = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication Error: No Token Provided"));
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      socket.user = decoded;
      next();
    } catch (error) {
      next(new Error("Authentication Error: Invalid or no token provided"));
    }
  });
};
