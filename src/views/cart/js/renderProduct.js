import $ from "./utils/dom.js";
import store from "./js/store.js";

const renderProduct = (book) => {
  $(".product-list").insertAdjacentHTML("beforeend", `<div>${book}</div>`);
};

export default renderProduct;
