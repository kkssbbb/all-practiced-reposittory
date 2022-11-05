import mongoose, { Schema } from "mongoose";
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
      default: "배송전", //추가
    },
    owner: {
      //주문자 오브젝트아이디 저장,
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User", //populate
    },
  },
  {
    timestamps: true,
  }
);

export { OrderSchema };
