import { Router } from "express";
import is from "@sindresorhus/is";

import { loginRequired } from "../middlewares";
import { orderService } from "../services";
import { orderHendler } from "../middlewares";

const orderRouter = Router();

//주문 생성
orderRouter.post("/orders", loginRequired, async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.body.userId;
    const orderName = req.body.orderName;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;

    const newOrder = await orderService.addOrder({
      userId,
      orderName,
      address,
      phoneNumber,
    });

    res.status(201).json({ error: null, data: newOrder });
  } catch (error) {
    next(error);
  }
});

//본인 주문 조회
orderRouter.get("/orders", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    console.log(userId);
    const orderInfo = await orderService.getOrders(userId);
    // console.log(orderInfo);

    res.status(200).json({ error: null, data: orderInfo });
  } catch (error) {
    next(error);
  }
});

//주문 전체조회(관리자만)
orderRouter.get("/auth/orders", async function (req, res, next) {
  try {
    const orderList = await orderService.getOrdersList();
    res.status(200).json({ error: null, data: orderList });
  } catch (error) {
    next(error);
  }
});

//전체 주문조회(관리자)
orderRouter.get("/orders-list", async function (req, res, next) {
  console.log("호출확인");

  const orderList = await orderService.getOrders();
  res.status(200).json(orderList);
});

//주문 삭제
orderRouter.delete("/orders/:orderId", async function (req, res, next) {
  const orderId = req.params.orderId;

  console.log(`파람 값확인: ${orderId}`);

  const deleteOrderInfo = await orderService.deleteOrder(orderId);

  return res.status(201).json(deleteOrderInfo);
});

// orderRouter.patch("/orders/:orderId", async function (req, res, next) {
//   try {
//     const userId = req.currentUserId;
//     const orderInfo = await orderService.getOrders(userId);
//     //console.log(orderInfo);

//     res.status(200).json({ error: null, data: orderInfo });
//   } catch (error) {
//     next(error);
//   }
// });

//주문 전체조회(관리자만)
orderRouter.get("/auth/orders", async function (req, res, next) {
  try {
    const orderList = await orderService.getOrdersList();
    res.status(200).json({ error: null, data: orderList });
  } catch (error) {
    next(error);
  }
});

//주문 삭제
orderRouter.delete("/orders/:id", async function (req, res, next) {
  try {
    const orderId = req.params.id;

    console.log(`파람 값확인: ${orderId}`);

    const deleteOrderInfo = await orderService.deleteOrder(orderId);

    return res.status(200).json({ error: null, data: deleteOrderInfo });
  } catch (error) {
    next(error);
  }
});

//주문 수정
// 주문 수정할때 주문상태가 배손전이 아니면 주문 수정 불가 맨들기
orderRouter.patch("/orders/:id", async function (req, res, next) {
  try {
    const orderId = req.params.id;
    const orderName = req.body.orderName;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;

    const toUpdate = {
      ...(orderName && { orderName }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
    };

    const patchOrderInfo = await orderService.patchOrder(orderId, toUpdate);

    return res.status(201).json({ error: null, data: patchOrderInfo });
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
