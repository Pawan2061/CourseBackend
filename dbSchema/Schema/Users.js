import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  purchasedCourses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  ],
});

export const UserModel = mongoose.model("Users", userSchema);
