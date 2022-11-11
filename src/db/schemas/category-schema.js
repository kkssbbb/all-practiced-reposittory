import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "category",
  }
);

export { CategorySchema };
