import { connect, disconnect } from "mongoose";
import { config } from "dotenv";
config();

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in the environment variables.");
  process.exit(1);
}

const mongoUri = process.env.MONGO_URI as string;

export const connectDB = async (): Promise<void> => {
  try {
    await connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export const closeDB = async (): Promise<void> => {
  try {
    await disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    process.exit(1);
  }
};