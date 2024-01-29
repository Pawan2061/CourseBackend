import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);

    console.log(`Connected to MongoDB ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
