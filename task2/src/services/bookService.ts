import bookModel from "../models/Book.js";

interface FilteredBook {
  nameBook: string;
  firstName: string;
  lastName: string;
}
export const getFilteredBooks = async (): Promise<void> => {
  try {
    const books: FilteredBook[] = await bookModel.aggregate([
      {
        $match: {
          pages: { $gt: 250 },
          publicationDate: { $gt: "2015-01-01", $lt: "2020-01-01" },
        },
      },
      {
        $lookup: {
          from: "writers",
          let: { writer_string_id: "$writerID" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$writer_string_id" }] },
              },
            },
          ],
          as: "writer",
        },
      },
      { $unwind: { path: "$writer", preserveNullAndEmptyArrays: true } },
      {
        $match: {
          "writer.firstName": { $regex: /^P/i },
        },
      },
      {
        $sort: { "writer.firstName": 1, pages: 1 },
      },
      {
        $project: {
          _id: 0,
          nameBook: "$name",
          firstName: "$writer.firstName",
          lastName: "$writer.lastName",
        },
      },
    ]);
    console.log("Filtered Books:", books);
  } catch (error) {
    console.error("Error fetching filtered books:", error);
    throw error;
  }
};
