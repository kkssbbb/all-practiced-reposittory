/* 
- 공통

- 상품상세에서 결제하기 버튼 누를 시
- [] 해당 상품의 정보를 서버에서 받아옴

- 장바구니에서 결제하기 버튼 누를 시
- [] 로컬스토리지에서 정보를 받아옴 ??

// get
// - 페이지 시작 시
// name
// address
// phoneNumber

// 결제 버튼 클릭 시

// post
// 1. 상품정보
// title
// totalPrice

// 2. 사용자정보
// name
// address
// phoneNumber

- 1. 
- []  
- [] 
- [] 

- 결제 완료 모달 띄우기
- [] 결제하기 버튼 클릭 시 모달 띄우고
- [] 모달에서 홈으로 이동하기 띄워주기

*/

import * as Api from "../../api.js";
import $ from "../../utils/dom.js";
import store from "../../utils/store.js";
import { navigate, getUrlParams } from "../../useful-functions.js";

<<<<<<< HEAD
// const order = () => async{
//     const data = await Api.post('', data)
// }


=======
>>>>>>> 2d02a4fa46469ffd1322685223f8b90330ace6a0
const getProductInfo = async () => {
  const productList = store.getLocalStorage()?.map((book) => book.id); // 로컬스토리지에서 받아온 데이터를
  console.log("local = " + store.getLocalStorage());
  console.log("productlist = " + productList);
  const bookList = await Promise.all(
    productList.map((productId) => {
      return Api.get(`/api/products/${productId}`);
    })
  );
  return bookList;
};

const postUserInfo = async () => {
  const userName = $("#input-name").value;
  const userPhoneNumber = $("#input-number").value;
  const userAddress = $("#input-address").value;

  if (!userName || !userPhoneNumber || !userAddress) {
    return alert("배송지 정보를 모두 입력해 주세요.");
  }

  const bookList = await getProductInfo();
  const titleList = [];

  for (const book of bookList) {
    titleList.push(book.title);
  }

  console.log("titleList= " + titleList);

  const totalPrice = localStorage.getItem("totalPrice");
  console.log(totalPrice);

  const Data = {
    titleList,
    totalPrice,
    userName,
    userPhoneNumber,
    userAddress,
  };
  console.log(Data);
  await Api.post("/api/orders", Data);

  alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
  window.location.href = "/";
};

$("#order").addEventListener("click", postUserInfo);
