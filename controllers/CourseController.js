import { courseModel } from "../dbSchema/Schema/Course.js";

export const getCourses = async (req, res) => {
  const name = req.body.name;

  try {
    const courses = await courseModel.find();
    if (!courses) {
      return res.status(400).json({ message: "No coursses are there" });
    }
    return res.status(200).json({ courses: courses });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
