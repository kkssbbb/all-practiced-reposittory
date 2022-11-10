import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("order", OrderSchema);

export class OrderModel {
  //생성
  async createOrder(orderinfo) {
    console.log(orderinfo);
    const createNewOrder = await Order.create(orderinfo);
    return createNewOrder;
  }

  //주문 전체조회
  async findAllOrder() {
    const orders = await Order.find({});
    return orders;
  }

  //사용자 본인주문 조회
  async findOrder(userid) {
    const findedOrderInfo = await Order.find({ userId: userid });
    // console.log(findedOrderInfo);
    return findedOrderInfo;
  }

  //어드민 주문 상태 변경
  async updateOrderState(orderId, reqUpdateState) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };
    console.log(orderId, reqUpdateState);
    const updatedState = await Order.findByIdAndUpdate(
      filter,
      { status: reqUpdateState },
      { new: true }
    );

    console.log(updatedState);

    return updatedState;
  }

  async updateOrder() {
    const filter = { orderName: orderName };
    const updateOrder = await Order.find;
  }
  //사용자 주문변경
  async updateOrder({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findByIdAndUpdate(filter, update, option);
    return updatedOrder;
  }

  async deleteById(orderId) {
    const deleteOrderId = await Order.findByIdAndDelete({ _id: orderId });
    return deleteOrderId;
  }

  async getStatus(orderId) {
    const orderStatus = await Order.find({ _id: orderId });

    return orderStatus;
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
