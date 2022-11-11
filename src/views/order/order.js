/* 
- 공통

- 상품상세에서 결제하기 버튼 누를 시
-[] 해당 상품의 정보를 서버에서 받아옴
-[] 해당 상품의 정보를 랜더링시켜주고 보내주기만 하면됨



- [x] 장바구니에서 결제하기 버튼 누를 시 
  오더페이지에서 두 가지 기능을 하기위해 로컬스토리지에 데이터있을시 로직 실행


// get
// - 페이지 시작 시
// name
// address
// phoneNumber



- 결제 완료 모달 띄우기
- [] 결제하기 버튼 클릭 시 모달 띄우고
- [] 모달에서 홈으로 이동하기 띄워주기

*/

import * as Api from "../../api.js";
import $ from "../../utils/dom.js";
import store from "../../utils/store.js";

const getProductInfo = async () => {
  const productList = store.getLocalStorage()?.map((book) => book.id);
  const bookList = await Promise.all(
    productList.map((productId) => {
      return Api.get(`/api/products/${productId}`);
    })
  );
  return bookList;
};

const renderOrder = async () => {
  const orderProdcut = await getProductInfo();
  const orderProdcuttitleList = [];
  for (const book of orderProdcut) {
    $(".order-product").innerText += book.title;
  }
  $(".order-total-price").innerText = localStorage.getItem("totalPrice");
};

const postUserInfo = async () => {
  const userName = $("#input-name").value;
  const userPhoneNumber = Number($("#input-number").value);
  const userAddress = $("#input-address").value;

  if (!userName || !userPhoneNumber || !userAddress) {
    return alert("배송지 정보를 모두 입력해 주세요.");
  }

  const bookList = await getProductInfo();
  const titleList = [];

  for (const book of bookList) {
    titleList.push(book.title);
  }
  const totalPrice = localStorage.getItem("totalPrice");

  const orderData = {
    titleList,
    totalPrice,
    userName,
    userPhoneNumber,
    userAddress,
  };
  console.log(orderData);
  await Api.post("/api/orders", orderData);

  alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
  window.location.href = "/home";
};

renderOrder();

$("#order").addEventListener("click", postUserInfo);
