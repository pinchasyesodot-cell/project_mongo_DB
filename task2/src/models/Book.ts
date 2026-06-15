import { model, Schema } from "mongoose";
import { type Book } from "../interfaces/book.js";

const bookSchema = new Schema<Book>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  publicationDate: { type: String, required: true },
  writerID: { type: String, required: true },
  pages: { type: Number, required: true },
});

const bookModel = model<Book>("Book", bookSchema);

export default bookModel;
