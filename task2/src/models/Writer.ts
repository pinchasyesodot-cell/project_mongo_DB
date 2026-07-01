import { model, Schema } from "mongoose";
import { type Writer } from "../interfaces/writer.js";

const writerSchema = new Schema<Writer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: String, required: true },
});

const writerModel = model<Writer>("Writer", writerSchema);

export default writerModel;
