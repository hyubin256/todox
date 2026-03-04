import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // exit: 1 là thoát với trạng thái thất bại
    // exit: 0 là thoát với trạng thái thành công
    process.exit(1);
  }
};

export default connectDB;