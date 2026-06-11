import type { ObjectId } from "mongodb";

export interface Book {
  name: string;
  description: string;
  publicationDate: Date;
  writerID: ObjectId;
  pages: number;
}
