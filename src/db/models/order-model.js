import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("order", OrderSchema);

export class OrderModel {
  async createOrder(orderinfo) {
    const createNewOrder = await Order.create(orderinfo);
    return createNewOrder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
