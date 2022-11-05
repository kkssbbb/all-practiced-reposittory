import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("order", OrderSchema);

export class OrderModel {
  //생성
  async createOrder(orderinfo) {
    const createNewOrder = await Order.create(orderinfo);
    return createNewOrder;
  }

  //주문 전체조회
  async findAllOrder() {
    const orders = await Order.find({});
    return orders;
  }

  async updateOrder() {
    const filter = { orderName: orderName };
    const updateOrder = await Order.find;
  }

  //한인호코치님 : "_id를 사용하실거면 findByIdAndDelete()를 추천드립니다."
  async deleteById(orderId) {
    const deleteOrderId = await Order.findByIdAndDelete({ _id: orderId });
    return deleteOrderId;
  }

  async fatchById(orderId, toUpdate) {
    // const filter = { _id: orderId };
    const option = { new: true };

    const fatchOrderId = await Order.findByIdAndUpdate(
      orderId,
      toUpdate,
      option
    );
    return fatchOrderId;
  }
}

const orderModel = new OrderModel();

export { orderModel };
