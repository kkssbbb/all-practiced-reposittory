import $ from "../utils/dom.js";
import store from "./js/store.js";
import renderProduct from "./js/renderProduct.js";

const producttList = store.getLocalStorage().map((book) => book.id);

// - 장바구니페이지에서 1번에서의 같은 api를 다시 요청하여 id 값과 매치시켜서 제목 이미지 가격 받아오기

const deleteAllProduct = () => {
  localStorage.clear();
};

const deleteSelectProduct = () => {
  // 1. checkbox element를 찾습니다.
  const checkbox = $(".product-list").appendChild();

  // 2. checked 속성을 체크합니다.
  const is_checked = checkbox.checked;

  // 3. 결과를 출력합니다.
  document.getElementById("result").innerText = is_checked;
};

$(".allDeletebox").addEventListener("click", deleteAllProduct);
$(".partDeletebox").addEventListener("click", deleteSelectProduct);
renderProduct(producttList);
