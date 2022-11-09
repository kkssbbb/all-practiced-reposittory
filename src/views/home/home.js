// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "../../api.js";
import $ from "../../utils/dom.js";
import { navigate } from "../../useful-functions.js";

// const categoryFilter = document.querySelectorAll('input[type="checkBox"]');
const categoryFilters = document.getElementsByName("category[]");
const non_checked = "non-checked";

const selectAllBtn = document.queryCommandValue("#select-all-btn");
const deselectAllBtn = document.queryCommandValue("#deselect-all-btn");

showProductItemsToContainer();
selectFilter();

async function showProductItemsToContainer() {
  const products = await Api.get("/api/products");

  categoryFilters.forEach(async (categoryFilter) => {
    categoryFilter.checked = true;
  });

  products.forEach(async (product) => {
    const { _id, imgUrl, category } = product;

    $(".book-list").insertAdjacentHTML(
      "beforeend",
      `
      <div class="book-list-item ${category}" id="a${_id}">
      <img src="${imgUrl}" alt="책 표지" />
    </div>
      `
    );

    const productItem = document.querySelector(`#a${_id}`);
    productItem.addEventListener("click", navigate(`/products/${_id}`));
  });
}

function selectFilter() {
  for (let i = 0; i < categoryFilters.length; i++) {
    categoryFilters[i].addEventListener("click", (e) => {
      const isChecked = e.target.checked;
      const kinds = document.getElementsByClassName(e.target.id);
      console.log(kinds);
      for (let i = 0; i < kinds.length; i++) {
        kinds[i].classList.toggle(non_checked);
        console.log(kinds[i]);
      }
      // if (isChecked) {
      // const { category } = { category: e.target.id };
      // window.location.search = `?category=${category}`;
      // const filterDatas = Api.get(`/api/products/${category}`);
      // e.target.checked = true;
      //
      // } else {
      //
      // }
    });
  }
}
