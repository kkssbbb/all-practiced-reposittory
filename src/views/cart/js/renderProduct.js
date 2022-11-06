import $ from "../../utils/dom.js";
// import store from "./js/store.js";

const renderProduct = (producttList) => {
  return producttList.forEach((book) => {
    $(".product-list").insertAdjacentHTML(
      "beforeend",
      `
      <li id="product-${book}"> 
        <label class="checkbox" id="${book}">
          <input id="checkbox-${book}" type="checkbox" /> 
        <label>
        ${book}
        <input id = "quantity-${book}" type = "number" value = "1" min = "1"/>
        <span> ${book}} </span>
      </li>
      `
    );
  });
};
// input에 id 값으로 book 을 넣어 해당 상품 개수 확인
export default renderProduct;
