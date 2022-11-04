import $ from "./js/utils/dom.js";
import store from "./js/store.js";
import renderProduct from "./js/renderProduct.js";

console.log(store.getLocalStorage());
const producttList = store.getLocalStorage().map((book) => book.id);

// - 장바구니페이지에서 1번에서의 같은 api를 다시 요청하여 id 값과 매치시켜서 제목 이미지 가격 받아오기

renderProduct(producttList);
