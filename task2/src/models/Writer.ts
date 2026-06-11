import { model, Schema } from "mongoose";
import { Writer } from "../interfaces/writer";

const writerSchema = new Schema<Writer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: String, required: true },
});

const writerModel = model<Writer>("Writer", writerSchema);

export default writerModel;
