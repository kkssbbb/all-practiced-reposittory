import { Schema } from "mongoose";
//아이디
//주문날짜
//총가격
//주문정보 상품제목 개수
//스테터스
//
//오더네임
//주소
//핸드폰번호

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
