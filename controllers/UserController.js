import jwt from "jsonwebtoken";
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

  console.log(user);

  if (user) {
    res.status(403).send("Such user already exists");
    return;
  }
  try {
    const User = await UserModel.create({
      username: username,
      password: password,
      email: email,
      isAdmin: isAdmin,
    });
    const payload = { id: User._id, isAdmin: User.isAdmin };
    const token = createToken(payload);
    return res.status(200).json({ username: username, userToken: token });

    res.status(200).json(User);
  } catch (error) {
    res.status(400).json({ Errors: error });
  }
};


export const login=async(req,res)=>{

  jwt.verify(req.token,process.env.JWT_SECRET,(err,authorizedData)=>{
    
  })

  





}