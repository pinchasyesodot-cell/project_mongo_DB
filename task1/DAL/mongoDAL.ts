import { InsertOneResult } from "mongodb";
import { connectDB } from "../db/db";
import { Book } from "../interfaces/book";
import { Writer } from "../interfaces/writer";
const db = await connectDB();

const booksCollection = "books";
const writersCollection = "writers";

export const createDocument = async (
  document: Book | Writer,
): Promise<InsertOneResult<Document> | void> => {
  try {
    if ("pages" in document) {
      await db.collection(booksCollection).createIndex({ pages: 1 });
      await db
        .collection(booksCollection)
        .createIndex({ name: "text", description: "text" });
      return await db.collection(booksCollection).insertOne(document);
    } else {
      return await db.collection(writersCollection).insertOne(document);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllBooksByWriter = async (writerID: string): Promise<void> => {
  try {
    const books = await db
      .collection(booksCollection)
      .find({ writerID: writerID })
      .toArray();
    console.log("Books by writer:", books);
  } catch (error) {
    console.error(error);
  }
};

export const getBookByNameOrByDescription = async (
  searchTerm: string,
): Promise<void> => {
  try {
    const book = await db.collection(booksCollection).findOne({
      $text: { $search: searchTerm },
    });
    console.log("Book found:", book);
  } catch (error) {
    console.error(error);
  }
};

export const getBooksByPagesRange = async (): Promise<void> => {
  try {
    const books = await db
      .collection(booksCollection)
      .find({ pages: { $gte: 250 } })
      .toArray();
    console.log("Books with 250 or more pages:", books);
  } catch (error) {
    console.error(error);
  }
};
