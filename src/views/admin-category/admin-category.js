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
let categoryIdToDelete;
async function addNowCategory() {
  const categorys = await Api.get("/api/category");
  categorys.forEach((item) => {
    // 객체 destructuring
    const { _id, category } = item;

    nowCategoryInput.insertAdjacentHTML(
      "beforeend",
      `
        <div id="category-${_id}">
          <div>${category}</div>
        </div>
        <div class="column is-2">
          <button class="button" id="deleteButton-${_id}" >카테고리 삭제</button>
        </div>
      `
    );

    // 요소 선택
    const deleteButton = $(`#deleteButton-${_id}`);

    // 이벤트 - 삭제버튼 클릭 시 Modal 창 띄우고, 동시에, 전역변수에 해당 주문의 id 할당
    deleteButton.addEventListener("click", () => {
      categoryIdToDelete = _id;

      // openModal
      Swal.fire({
        title: "정말 삭제하시겠습니까?",
        text: "진짜로~~?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (res) => {
        if (res.isConfirmed) {
          // Yes, // db에서 카테고리 삭제
          try {
            await Api.delete("/api/category", categoryIdToDelete);

            // 삭제 성공
            alert("카테고리가 삭제되었습니다.");

            // 삭제한 아이템 화면에서 지우기
            const deletedItem = $(`#category-${categoryIdToDelete}`);
            deletedItem.remove();

            // 전역변수 초기화
            categoryIdToDelete = "";
          } catch (err) {
            alert(`주문정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
          }
        } else {
          // No
          categoryIdToDelete = "";
        }
      });
    });
  });
}
