import { orderModel } from "../db";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async addOrder(orderInfo) {
    const { userId, orderName, address, phoneNumber } = orderInfo;

    //db 저장
    const newOrderInfo = { userId, orderName, address, phoneNumber };
    const createNewOrder = await this.orderModel.createOrder(newOrderInfo);
    return createNewOrder;
  }

  //db 전체조회
  async getOrdersList() {
    const orderLisrt = await this.orderModel.findAllOrder();
    return orderLisrt;
  }

  // db 사용자 본인 주문 조회
  async getOrders(userid) {
    const orderInfo = await this.orderModel.findOrder(userid);
    // console.log(orderInfo);

    return orderInfo;
  }

  //db 삭제
  async deleteOrder(orderId) {
    const deleteOrder = await this.orderModel.deleteById(orderId);
    return deleteOrder;
  }

  //주문 수정 (배송상태 배송전이면 수정 안됨)
  async patchOrder(orderId, toUpdate) {
    // console.log(orderId);

    //console.log(toUpdate);
    const orderStateInfo = this.getOrders(userId);
    console.log(orderStateInfo);

    const fatchOrder = await this.orderModel.fatchById(orderId, toUpdate);

    return fatchOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
