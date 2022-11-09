import * as Api from "../api.js";
import $ from "../utils/dom.js";

const titleInput = $("#titleInput");
const category = $("#category");

// html에 요소를 추가하는 함수들
function addAllElements() {
  addOptionsToSelectBox();
}

// 카테고리 옵션 삽입
async function addOptionsToSelectBox() {
  const categorys = await Api.get("/api/category");
  categorys.forEach((category) => {
    // 객체 destructuring
    const { _id, title, themeClass } = category;

    categorySelectBox.insertAdjacentHTML(
      "beforeend",
      `
      <option value=${_id} class="notification ${themeClass}"> ${title} </option>`
    );
  });
}
