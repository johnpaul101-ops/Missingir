import { Router } from "express";
import {
  createUser,
  loginUser,
  refreshToken,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", createUser);
authRouter.post("/sign-in", loginUser);
authRouter.post("/refresh", refreshToken);
export default authRouter;
