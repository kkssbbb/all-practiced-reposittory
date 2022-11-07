import $ from "../../utils/dom.js";
// import store from "./js/store.js";

const renderProduct = (producttList) => {
  return producttList.map((book) => {
    $(".product-list").insertAdjacentHTML(
      "beforeend",
      `<li> <input id="prodcut" type="checkbox" /> ${book}</li>`
    );
  });
};

export default renderProduct;
