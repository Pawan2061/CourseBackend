import express from "express";
import {
  getUserCourses,
  getUsers,
  login,
  signUp,
} from "../controllers/UserController.js";
import { validateToken } from "../middleware/validateToken.js";

export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.get("/getUsers", getUsers);
userRouter.get("/courses", validateToken, getUserCourses);
