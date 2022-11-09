/*
  - 장바구니 관련 기능
    - [x] 장바구니 관련 데이터는 백엔드 데이터베이스가 아닌, 프론트단(localStorage, sessionStorage, indexedDB 등)에서 관리된다.
    - [x] 프론트 단에, 장바구니에 속한 상품 관련 데이터가 저장되어서, 페이지를 새로고침해도 장바구니에 상품들이 그대로 남아 있다.
    - [x] 장바구니 추가 - 사용자는 상품을 장바구니에 추가할 수 있다.
      -[x] 장바구니 추가 버튼을 이미 눌렀으면 '이미 담겨있는 상품입니다.'라는 alert를 띄운다
    - [x] 장바구니 수정 - 사용자는 장바구니에 속한 상품의 수량을 수정할 수 있다.
    - [x] 장바구니 전체 삭제 - 사용자는 장바구니에서, 버튼 1번의 클릭으로, 장바구니 상의 전체 상품을 제거할 수 있다.
    - [] 장바구니 부분 삭제 - 사용자는 장바구니에서, 일부 상품을 골라서 제거할 수 있다.
                        - 부분삭제 시 로컬스토리지에서도 같이 삭제되야한다.
    - [x] 장바구니 조회 - 사용자는 장바구니에 담긴 상품 목록을 확인할 수 있다.
    - [] 장바구니 가격 조회 - 사용자는 장바구니에 담긴 상품들의 총 가격을 확인할 수 있다.

  - 상세페이지에서 장바구니 버튼 클릭 시 id 값만 배열형태로 로컬스토리지 저장
  - 장바구니페이지에서 1번에서의 같은 api를 다시 요청하여 id 값과 매치시켜서 제목 이미지 가격 받아오기
  - 로컬스토리지에 저장되는 형태는 배열안에 객체여야함

*/
import * as Api from "../../api.js";
import $ from "../../utils/dom.js";
import store from "../../utils/store.js";
import {
  navigate,
  getUrlParams,
  addCommas,
  addDate,
} from "../../useful-functions.js";
import { renderProduct, renderProductInfo } from "./render.js";

const productList = store.getLocalStorage()?.map((book) => book.id);

let totalPrice = 0;

const sumPrice = (price) => {
  totalPrice += Number(price);
  renderProductInfo(totalPrice);
};

//   productList.forEach(async (id) => {
//     const book = await Api.get(`/api/products/${id}`);
//     renderProduct(book);
//     $("quantity-${id}").value; //input value 로 개수가져와서 각 가격에 곱해서 전달
//     sumPrice(book.price);
//   });
// };

const initCart = async () => {
  console.log(productList);
  console.log(store.getLocalStorage());
  //[1,2,3] -> [new Promise(1), ...] -> [{title: 1, ...}, {title: 2, ...}, ...]
  // 병렬적으로 데이터를 받지 않는다면 순서가 랜덤하게 들어오기 때문에 병렬화
  const bookList = await Promise.all(
    productList.map((productId) => {
      return Api.get(`/api/products/${productId}`);
    })
  );
  renderBooks(bookList);
};

const renderBooks = (bookList) => {
  bookList.forEach((book) => {
    renderProduct(book);
    renderProductInfo(book);
  });
};

// const removeLocalStorageValue = (targetId) => {
//   return producttList.filter((id) => id !== targetId);
// };

const deleteAllProduct = () => {
  localStorage.clear();
  const productList = $(".product-list");
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild);
  }
};

const deleteSelectProduct = () => {
  for (let i = 0; i < $(".product-list").children.length; i++) {
    const product = $(".product-list").children[i];
    const isChecked = product?.children[0]?.children[0]?.checked;
    console.log(product);
    console.dir(isChecked);
    if (isChecked) {
      console.log(productList.filter((id) => id !== product.id));
      // const deleteProductArr = [];
      // deleteProductArr.push(product.id);
      // console.log(deleteAllProduct);
      // deleteAllProduct[i].forEach((element) => {
      //   element.remove();
      // });
      // product.remove();
    }
  }
};

initCart();
$(".allDeletebox").addEventListener("click", deleteAllProduct);
$(".partDeletebox").addEventListener("click", deleteSelectProduct);
$("#purchaseButton").addEventListener("click", navigate("/order"));
