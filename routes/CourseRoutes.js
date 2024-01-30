import express from "express";
import { addCourse, getCourses } from "../controllers/CourseController.js";
import { validateAdmin } from "../middleware/validateAdmin.js";

export const courseRouter = express.Router();

courseRouter.get("/getCourses", getCourses);
courseRouter.post("/addCourse", validateAdmin, addCourse);
