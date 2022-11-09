import $ from "../../utils/dom.js";
import { addCommas } from "../../useful-functions.js";

const renderProduct = (prodcutList) => {
  const { imgUrl, title, price, _id } = prodcutList;
  return $(".product-list").insertAdjacentHTML(
    "beforeend",
    `
      <li id="product-${_id}"> 
        <label class="checkbox" id="${_id}">
          <input id="checkbox-${_id}" type="checkbox" /> 
        <label>
        ${imgUrl}
        ${title}
        ${addCommas(price)}
        <input id = "quantity-${_id}" type = "number" value = "1" min = "1"/>
      </li>
      `
  );
};
// input에 id 값으로 book 을 넣어 해당 상품 개수 확인
export default renderProduct;
