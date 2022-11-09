// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "../../api.js";
import $ from "../../utils/dom.js";
import { navigate } from "../../useful-functions.js";

const categoryFilters = document.getElementsByName("category[]");
const non_checked = "non-checked";

showAllProductItems();

async function showAllProductItems() {
  const products = await Api.get("/api/products");
  const categoryList = await Api.get("/api/category");

  products.forEach((product) => {
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

  categoryList.forEach((categoryListItem) => {
    const { category } = categoryListItem;
    $(".category-filter-form").insertAdjacentHTML(
      "beforeend",
      `
      <label>
              <input
                id="${category}"
                type="checkbox"
                name="category[]"
                value="${category}"
              />
              ${category}
            </label>
      `
    );
  });

  categoryFilters.forEach((categoryFilter) => {
    categoryFilter.checked = true;
  });

  for (let i = 0; i < categoryFilters.length; i++) {
    categoryFilters[i].addEventListener("click", (e) => {
      const selectedCategory = document.getElementsByClassName(e.target.id);
      for (let i = 0; i < selectedCategory.length; i++) {
        selectedCategory[i].classList.toggle(non_checked);
      }
    });
  }
}
