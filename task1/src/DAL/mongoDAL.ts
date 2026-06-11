import { ObjectId, type Document, type InsertOneResult } from "mongodb";
import { connectDB } from "../db/db.js";
import { type Book } from "../interfaces/book.js";
import { type Writer } from "../interfaces/writer.js";

type PagesQuery = {
  pages?: {
    $gte?: number;
    $lte?: number;
  };
};

const booksCollection = "BOOKS_COLLECTION";
const writersCollection = "WRITERS_COLLECTION";

export const createWriters = async (
  document: Writer,
): Promise<InsertOneResult<Document>> => {
  try {
    const db = await connectDB();
    const existingWriter = await db.collection(writersCollection).findOne({
      firstName: document.firstName,
      lastName: document.lastName,
    });
    if (existingWriter) {
      throw new Error("Writer with the specified name already exists.");
    }
    return await db.collection(writersCollection).insertOne(document);
  } catch (error) {
    throw error;
  }
};

export const createBooks = async (
  document: Book,
): Promise<InsertOneResult<Document>> => {
  try {
    const db = await connectDB();
    const { pages, writerID } = document;
    if (pages < 0) {
      throw new Error(
        "Invalid number of pages. Please enter a positive number.",
      );
    }
    const writerExists = await db
      .collection(writersCollection)
      .findOne({ _id: writerID });
    if (!writerExists) {
      throw new Error("Writer with the specified ID does not exist.");
    }
    return await db.collection(booksCollection).insertOne(document);
  } catch (error) {
    throw error;
  }
};

export const getAllBooksByWriter = async (writerID: string): Promise<void> => {
  try {
    const db = await connectDB();
    const books = await db
      .collection(booksCollection)
      .find({ writerID: new ObjectId(writerID) })
      .toArray();
      const formattedBooks = books.map((book) => {
      return {
        ...book,
        publicationDate: book.publicationDate.toISOString().split("T")[0],
      };
    });
    console.log("Books by writer:", formattedBooks);
  } catch (error) {
    throw error;
  }
};

export const getBooksByNameOrByDescription = async (
  searchTerm: string,
): Promise<void> => {
  try {
    const db = await connectDB();
    const books = await db
      .collection(booksCollection)
      .find({
        $text: { $search: searchTerm },
      })
      .toArray();
    const formattedBooks = books.map((book) => {
      return {
        ...book,
        publicationDate: book.publicationDate.toISOString().split("T")[0],
      };
    });
    console.log("Books found by text search:", formattedBooks);
  } catch (error) {
    throw error;
  }
};

export const getBooksByPagesRange = async (
  minPages?: number,
  maxPages?: number,
): Promise<void> => {
  try {
    const db = await connectDB();
    const query: PagesQuery = {};
    if (minPages || maxPages) {
      query.pages = {};
      const pagesFilter: { $gte?: number; $lte?: number } = {};
      if (minPages !== undefined) pagesFilter.$gte = minPages;
      if (maxPages !== undefined) pagesFilter.$lte = maxPages;
      query.pages = pagesFilter;
    }
    const books = await db.collection(booksCollection).find(query).toArray();
    const formattedBooks = books.map((book) => {
      return {
        ...book,
        publicationDate: book.publicationDate.toISOString().split("T")[0],
      };
    });
    console.log("Books found by pages range:", formattedBooks);
  } catch (error) {
    throw error;
  }
};
