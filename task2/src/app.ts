import { closeDB, connectDB } from "./db/db.js";
import { getFilteredBooks } from "./services/bookService.js";
await connectDB();
await getFilteredBooks();
await closeDB();
