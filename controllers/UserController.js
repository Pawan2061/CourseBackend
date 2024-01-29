import bcrypt from "bcrypt";
import { UserModel } from "../dbSchema/Schema/Users.js";

import { createToken } from "../middleware/createToken.js";
import { userZodSchema } from "../zodSchema/user-zod-schema.js";

export const signUp = async (req, res) => {
  const result = userZodSchema.safeParse(req.body);
  if (!result.success) {
    return res.json({ error: result.error.issues[0].message });
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;

  const user = await UserModel.findOne({ username: username });

  if (user) {
    res.status(403).send("Such user already exists");
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await UserModel.create({
      username: username,
      password: hashedPassword,
      email: email,
      isAdmin: isAdmin,
    });
    const payload = { id: User._id, isAdmin: User.isAdmin };
    const token = createToken(payload);
    return res.status(200).json({ username: username, userToken: token });
  } catch (error) {
    res.status(400).json({ Errors: error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "authentication failed" });
    }

    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).send("authentication failed");
    }
    console.log(user);

    res
      .status(200)
      .json({ message: `user ${user.username} logged in successfully ` });
  } catch (error) {}
};
