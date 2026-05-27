import { connectDB } from "./db/db";
import { getFilteredBooks } from "./services/bookService";
await connectDB();
getFilteredBooks();
