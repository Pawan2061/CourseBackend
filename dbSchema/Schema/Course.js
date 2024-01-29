import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

export const courseModel = mongoose.model("Course", courseSchema);
