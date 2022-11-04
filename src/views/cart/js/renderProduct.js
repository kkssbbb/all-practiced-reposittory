import $ from "./utils/dom.js";

const renderProduct = (book) => {
  $(".product-list").insertAdjacentHTML("beforeend", book);
};

export default renderProduct;
