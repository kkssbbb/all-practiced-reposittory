import { orderModel } from "../db";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async addOrder(orderInfo) {
    const { orderName, address, phoneNumber } = orderInfo;

    //db 저장
    const newOrderInfo = { orderName, address, phoneNumber };
    const createNewOrder = await this.orderModel.createOrder(newOrderInfo);
    return createNewOrder;
  }

  //db 조회
  async getOrders() {
    const orderLisrt = await this.orderModel.findAllOrder();
    return orderLisrt;
  }

  // db 업데이트 사용자가 주문내역 조회할 수 있음
  async setOrder() {}

  //db 삭제
  async deleteOrder(orderId) {
    const deleteOrder = await this.orderModel.deleteById(orderId);
    return deleteOrder;
  }

  async patchOrder(orderId, toUpdate) {
    console.log(orderId);

    console.log(toUpdate);

    const fatchOrder = await this.orderModel.fatchById(orderId, toUpdate);

    return fatchOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
