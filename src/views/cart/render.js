import $ from "../../utils/dom.js";
import { addCommas } from "../../useful-functions.js";

export const renderProduct = (prodcutList) => {
  const { imgUrl, title, price, _id } = prodcutList;
  return $(".product-list").insertAdjacentHTML(
    "beforeend",
    `
      <li id="${_id}"> 
        <label class="checkbox" id="checkbox-${_id}">
          <input id="checkbox-${_id}" type="checkbox" /> 
        <label>
        <img src="${imgUrl}" width="5%"/>
        ${title}
        ${addCommas(price)}원
      </li>
      `
  );
};

/*
 <div class="quantity-wrapper">
          <p id ="quantity">1</p>
          <button id="plus"type="button"> + </button>
          <button id="minus"type="button"> - </button>
        </div>
 */

// input에 id 값으로 book 을 넣어 해당 상품 개수 확인

//<div class="calculation">
{
  /* <p id="unitPrice-${_id}">${addCommas(price)}원</p>
<p>
  <span class="icon">
    <i class="fas fa-thin fa-xmark"></i>
  </span>
</p>
<p id="quantity-${_id}">${quantity}</p>
<p>
  <span class="icon">
    <i class="fas fa-thin fa-equals"></i>
  </span>
</p>
<p id="total-${_id}">${addCommas(quantity * price)}원</p>
</div> */
}
