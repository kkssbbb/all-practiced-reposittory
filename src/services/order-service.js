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
}

const orderService = new OrderService(orderModel);

export { orderService };
