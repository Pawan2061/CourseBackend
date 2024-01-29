import express from "express";
import { getCourses } from "../controllers/CourseController.js";

export const courseRouter = express.Router();

courseRouter.get("/getCourses", getCourses);
