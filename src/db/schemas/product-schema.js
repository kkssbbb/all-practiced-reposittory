import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    imgUrl: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Number,
      required: true,
    },
    pageNumber: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "product",
  }
);
export { ProductSchema };
