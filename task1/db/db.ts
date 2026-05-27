import { MongoClient, Db } from "mongodb";
import { config } from "dotenv";
config();

const mongoUri = new MongoClient(process.env.MONGO_URI as string);

let db: Db | null = null;

export const connectDB = async (): Promise<Db> => {
  try {
    if (!db) {
      await mongoUri.connect();
      db = mongoUri.db("library");
      console.log("Connected to MongoDB");
    }
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
