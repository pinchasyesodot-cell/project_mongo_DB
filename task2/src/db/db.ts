import { connect } from "mongoose";
import { config } from "dotenv";

config();
const mongoUri = process.env.MONGO_URI as string;

export const connectDB = async () => {
  try {
    await connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
