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

// const order = () => async{
//     const data = await Api.post('', data)
// }


const getProductInfo = async () => {
  const productList = store.getLocalStorage()?.map((book) => book.id);
  //[1,2,3] -> [new Promise(1), ...] -> [{title: 1, ...}, {title: 2, ...}, ...]
  // 병렬적으로 데이터를 받지 않는다면 순서가 랜덤하게 들어오기 때문에 병렬화
  const bookList = await Promise.all(
    productList.map((productId) => {
      return Api.get(`/api/products/${productId}`);
    })
  );
  console.log(bookList);
  postUserInfo(bookList);
};

// 책 제목 배열과 배송비를 포함한 총액 받기

const postUserInfo = async (bookList) => {
  const name = $("#input-name").value;
  const phonNumber = $("#input-number").value;
  const address = $("#input-address").value;

  if (!name || !phonNumber || !address) {
    return alert("배송지 정보를 모두 입력해 주세요.");
  }
  console.log(bookList);
  //   const titleList = bookList.map((book) => {
  // book.title;
  //   });
  //   console.log(titleList);
  //   });

  const totalPrice = localStorage.getItem("totalPrice");
  console.log(totalPrice);

  const Data = {
    title, //배열
    totalPrice,
    name,
    phonNumber,
    address,
  };
  await Api.post("/api/orders", Data);

  alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
  window.location.href = "/";
};

$("#order").addEventListener("click", getProductInfo);
