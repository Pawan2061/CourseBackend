import express from "express";
import { signUp } from "../controllers/UserController.js";

export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("login", verifyToken, login);
