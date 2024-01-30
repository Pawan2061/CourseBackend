import { courseModel } from "../dbSchema/Schema/Course.js";

export const addCourse = async (req, res) => {
  const { name, price } = req.body;
  if (name) {
    return res.status(403).json({ message: "such course already exists" });
  }
  try {
    const newCourse = await courseModel.create({
      name: name,
      price: price,
    });

    await newCourse.save();

    return res
      .status(200)
      .json({ message: `course ${newCourse.name} is added` });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

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
