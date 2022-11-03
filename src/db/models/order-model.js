import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("order", OrderSchema);

export class OrderModel {
  //생성
  async createOrder(orderinfo) {
    const createNewOrder = await Order.create(orderinfo);
    return createNewOrder;
  }

  //조회
  async findAllOrder() {
    const orders = await Order.find({});
    return orders;
  }
}

const orderModel = new OrderModel();

export { orderModel };
