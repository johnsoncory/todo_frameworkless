import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TodoSchema = new Schema({
  item: {
    type: String,
    required: true,
    trim: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});
