import { MongoClient, Db } from "mongodb";
import { config } from "dotenv";
config();

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in the environment variables.");
  process.exit(1);
}

const mongoClient = new MongoClient(process.env.MONGO_URI as string);

let database: Db | null = null;

export const connectDB = async (): Promise<Db> => {
  try {
    if (!database) {
      await mongoClient.connect();
      database = mongoClient.db();
      console.log("Connected to MongoDB");
      await database.collection("BOOKS_COLLECTION").createIndex({ pages: 1 });
      await database
        .collection("BOOKS_COLLECTION")
        .createIndex({ name: "text", description: "text" });
        console.log("Indexes created successfully.");
    }
    return database;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const closeDB = async (): Promise<void> => {
  try {
    await mongoClient.close();
    database = null;
    console.log("Database connection closed cleanly.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};
