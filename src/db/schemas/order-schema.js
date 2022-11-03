import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    orderName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number, //프론트 단에서 번호 입력예시 01012345555
      required: true,
    },
    state: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export { OrderSchema };
