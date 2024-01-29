import express from "express";
import { login, signUp } from "../controllers/UserController.js";
import { validateToken } from "../middleware/validateToken.js";

export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", validateToken, login);
