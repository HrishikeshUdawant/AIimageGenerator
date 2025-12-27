import mongoose from "mongoose";

const connectDB = async (url) => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
