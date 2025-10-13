import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1); //exit with failure
  }
};