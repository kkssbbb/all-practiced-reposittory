import { Schema } from "mongoose";

//결제정보 : 입력값이 상품명,개수,상품총액,배송비,총결제금액
//배송지정보 : 이름 연락처 주소

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user-schema",
      required: true,
    },
    titleList: [String],
    totalPrice: {
      type: Number,
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
    },
    userPhoneNumber: {
      type: Number,
      reqired: true,
    },
    status: {
      type: String,
      required: false,
      default: "상품 준비중",
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

export { OrderSchema };
