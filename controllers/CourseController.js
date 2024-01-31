import { courseModel } from "../dbSchema/Schema/Course.js";
import { UserModel } from "../dbSchema/Schema/Users.js";
import { courseZodSchema } from "../zodSchema/course-zod-schema.js";

export const addCourse = async (req, res) => {
  // TODO: Validate with zod

  const result = courseZodSchema.safeParse(req.body);
  if (!result.success) {
    return res.json({ error: result.error.issues[0].message });
  }

  const { name, price } = req.body;

  // TODO: Find if course with same name exists
  const course = await courseModel.findOne({ name: name });
  if (course) {
    return res.status(400).json({ message: "Such course already exists" });
  }

  try {
    const newCourse = await courseModel.create({
      name: name,
      price: price,
    });

    await newCourse.save();

    return res.status(200).json({
      message: `course ${newCourse.name} with $${newCourse.price} is added`,
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    if (!courses) {
      return res.status(400).json({ message: "No courses are there" });
    }
    return res.status(200).json({ courses: courses });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(400).json({ message: "No such course is available" });
    }

    return res.status(200).json({
      message: `Course ${course.name} is available at price ${course.price}`,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// export const purchaseCourse = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const course = await courseModel.findById(id);
//     const username = req.user.username;
//     const user = await UserModel.findOne(username);

//     user.purchasedCourses.push(course);
//     await user.save();

//     return res.status(200).json({ purchasedCourse: user.purchasedCourse });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

export const purchaseCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await courseModel.findById(courseId);

    const user = req.user;
    const userFromDb = await UserModel.findById(user.id).populate(
      "purchasedCourses"
    );

    if (!course) {
      return res.status(400).json({ message: "no such user or course found" });
    }

    userFromDb.purchasedCourses.push(courseId);
    await userFromDb.save();

    console.log(userFromDb.purchasedCourses);

    return res
      .status(200)
      .json({ purchasedCourse: userFromDb.purchasedCourses });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
