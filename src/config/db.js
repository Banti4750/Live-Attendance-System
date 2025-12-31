
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


// Database connection will be configured here
export const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGODB_URI);
     console.log("✅ connected to mongoDB")
  } catch (error) {
     console.log("❌ error while connetion to mongoDB")
  }
}
