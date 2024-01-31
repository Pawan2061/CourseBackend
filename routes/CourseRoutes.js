import express from "express";
import {
  addCourse,
  getCourseById,
  getCourses,
  purchaseCourse,
} from "../controllers/CourseController.js";
import { validateAdmin } from "../middleware/validateAdmin.js";
import { validateToken } from "../middleware/validateToken.js";

export const courseRouter = express.Router();

courseRouter.get("/getCourses", getCourses);
courseRouter.get("/getCourse/:id", getCourseById);
courseRouter.post("/addCourse", validateToken, validateAdmin, addCourse);
courseRouter.post("/purchaseCourse/:id", validateToken, purchaseCourse);
