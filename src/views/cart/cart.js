import $ from "../utils/dom.js";
import store from "./js/store.js";
import renderProduct from "./js/renderProduct.js";

const producttList = store.getLocalStorage()?.map((book) => book.id);

// - 장바구니페이지에서 1번에서의 같은 api를 다시 요청하여 id 값과 매치시켜서 제목 이미지 가격 받아오기
// producttList.forEach((id) => {
//   return fetch(`/product/${id}`).then((res) => {
//     res.json();
//   });
// });
const removeLocalStorageValue = (targetId) => {
  return console.log(producttList.filter((id) => id !== targetId));
};

const deleteAllProduct = () => {
  localStorage.clear();
  const productList = $(".product-list");
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild);
  }
};

const deleteSelectProduct = (e) => {
  // 1. checkbox element를 찾습니다.
  const checkbox = $(".checkbox");
  const isChecked = $(".checkbox").children[0].checked;

  if (isChecked) {
    //   해당 상품이 삭제되고, localstorage에서도 삭제된다.
    console.log(checkbox.id);
    checkbox.parentNode.remove();
    removeLocalStorageValue(checkbox.id);
  }
};

$(".allDeletebox").addEventListener("click", deleteAllProduct);
$(".partDeletebox").addEventListener("click", deleteSelectProduct);

renderProduct(producttList);
