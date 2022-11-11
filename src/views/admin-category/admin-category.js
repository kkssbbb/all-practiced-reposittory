import * as Api from "../api.js";
import $ from "../utils/dom.js";

// 요소(element), input 혹은 상수
const titleInput = $("#titleInput");
const submitButton = $("#addCategoryButton");
const registerCategoryForm = $("#registerCategoryForm");

const nowCategoryInput = $("#nowCategoryInput");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들
function addAllElements() {
  addNowCategory();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener("click", handleSubmit);
}

// 카테고리 추가하기
async function handleSubmit(e) {
  e.preventDefault();

  const title = titleInput.value;

  // 입력 칸이 비어 있으면 진행 불가
  if (!title) {
    return alert("빈 칸이 없어야 합니다.");
  }

  try {
    const data = { category: title };
    await Api.post("/api/category", data);

    alert(`정상적으로 ${title} 카테고리가 등록되었습니다.`);

    // 폼 초기화
    registerCategoryForm.reset();
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 카테고리 가져오기
async function addNowCategory() {
  const categorys = await Api.get("/api/category");
  categorys.forEach((item) => {
    // 객체 destructuring
    const { _id, category } = item;

    nowCategoryInput.insertAdjacentHTML(
      "beforeend",
      `
        <div id="order-${_id}">
          <div>${category}</div>
        </div>
      `
    );
  });
}
