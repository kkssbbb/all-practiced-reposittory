import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    orderInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order-schema",
    },
    role: {
      type: String,
      required: false,
      default: "basic-user",
    },
    orderInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order-Schema",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { UserSchema };
