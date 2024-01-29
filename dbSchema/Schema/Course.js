import mongoose from "mongoose";
import { z } from "zod";

const courseSchema = new mongoose.Schema({
  name: z.string(),
  price: z.number(),
});
export const CourseModel = mongoose.model("Course", courseSchema);
