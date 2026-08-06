import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;

  try {
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
