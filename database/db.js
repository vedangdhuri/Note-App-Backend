import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/note-app`);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDb Connection Error:", error);
  }
};

export default connectDB;
