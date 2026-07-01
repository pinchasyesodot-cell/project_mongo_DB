import { ObjectId } from "mongodb";
import {
  createBooks,
  createWriters,
  getAllBooksByWriter,
  getBooksByNameOrByDescription,
  getBooksByPagesRange,
} from "./DAL/mongoDAL.js";
import { closeDB } from "./db/db.js";
const main = async (): Promise<void> => {
  try {
    const writerResult = await createWriters({
      firstName: "Omri",
      lastName: "Rajuan",
      birthDate: new Date("2002-01-23"),
    });
    
    await createBooks({
      name: "book1",
      description: "this is book 1",
      publicationDate: new Date("2020-01-01"),
      writerID: new ObjectId(writerResult.insertedId),
      pages: 10,
    });
    await getAllBooksByWriter(writerResult.insertedId.toString());
    await getBooksByNameOrByDescription("1");
    await getBooksByPagesRange();
  } catch (error) {
    console.error("The script failed during execution:", error);
  } finally {
    await closeDB();
  }
};
main();
