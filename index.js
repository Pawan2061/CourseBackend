import "dotenv/config.js";
import express from "express";
import dbConnect from "./dbSchema/index.js";
import { userRouter } from "./routes/UserRoutes.js";

dbConnect();

const app = express();
app.use(express.json());

app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
