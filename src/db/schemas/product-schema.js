import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  imgUrl: {
    type: String,
    required: true,
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
    type: [{ type: mongoose.Schema.Types.ObjectID, ref: "Category" }],
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
});

export { ProductSchema };
