import * as Api from "../api.js";
import $ from "../utils/dom.js";

const titleInput = $("#titleInput");
const categorySelectBox = $("#categorySelectBox");
const authorInput = $("#authorInput");
const summaryInput = $("#summaryInput");
const publisherInput = $("#publisherInput");
const publicationDateInput = $("#publicationDateInput");

const imgUrlInput = $("#imgUrlInput");
const pageNumberInput = $("#pageNumberInput");
const priceInput = $("#priceInput");

const submitButton = $("#submitButton");
const registerProductForm = $("#registerProductForm");

const nowProductInput = $("#nowProductInput");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들
function addAllElements() {
  addOptionsToSelectBox();
  addNowProducts();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener("click", handleSubmit);
}

// 제품 정보를 db에 저장
async function handleSubmit(e) {
  e.preventDefault();

  const title = titleInput.value;
  // const categoryId = categorySelectBox.options[target.selectedIndex].text;
  const category = categorySelectBox.value;
  const author = authorInput.value;
  const summary = summaryInput.value;
  const publisher = publisherInput.value;
  const publicationDate = publicationDateInput.value;
  const pageNumber = parseInt(pageNumberInput.value);
  const price = parseInt(priceInput.value);
  const imgUrl = imgUrlInput.files?.[0] ?? undefined;

  // 입력 칸이 비어 있으면 진행 불가
  if (
    !title ||
    !category ||
    !author ||
    !summary ||
    !publisher ||
    !publicationDate ||
    !pageNumber ||
    !price ||
    !imgUrl
  ) {
    return alert("빈 칸 및 0이 없어야 합니다.");
  }

  const formData = new FormData();

  formData.append("title", title);
  formData.append("category", category);
  formData.append("author", author);
  formData.append("summary", summary);
  formData.append("publisher", publisher);
  formData.append("publicationDate", publicationDate);
  formData.append("pageNumber", pageNumber);
  formData.append("price", price);
  formData.append("imgUrl", imgUrl);

  try {
    await Api.postFormData("/api/products", formData);
    alert(`정상적으로 ${title} 제품이 등록되었습니다.`);

    // 폼 초기화
    registerProductForm.reset();
  } catch (err) {
    console.log(err.stack);

    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 카테고리 옵션 삽입
async function addOptionsToSelectBox() {
  const categorys = await Api.get("/api/category");
  categorys.forEach((item) => {
    // 객체 destructuring
    const { _id, category } = item;

    categorySelectBox.insertAdjacentHTML(
      "beforeend",
      `
      <option value=${_id}>${category}</option>`
    );
  });
}

// 상품 가져오기
let productIdToDelete;
async function addNowProducts() {
  const products = await Api.get("/api/products");
  products.forEach((item) => {
    // 객체 destructuring
    const { _id, title } = item;

    nowProductInput.insertAdjacentHTML(
      "beforeend",
      `
        <div id="products-${_id}">
          <div>${title}</div>
        </div>
        <div class="column is-2">
          <button class="button" id="deleteButton-${_id}" >상품 삭제</button>
        </div>
      `
    );

    // 요소 선택
    const deleteButton = $(`#deleteButton-${_id}`);

    // 이벤트 - 삭제버튼 클릭 시 Modal 창 띄우고, 동시에, 전역변수에 해당 주문의 id 할당
    deleteButton.addEventListener("click", () => {
      productIdToDelete = _id;

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
            await Api.delete("/api/products", productIdToDelete);

            // 삭제 성공
            alert("상품이 삭제되었습니다.");

            // 삭제한 아이템 화면에서 지우기
            const deletedItem = $(`#products-${productIdToDelete}`);
            deletedItem.remove();

            // 전역변수 초기화
            productIdToDelete = "";
          } catch (err) {
            alert(`상품 삭제 과정에서 오류가 발생하였습니다: ${err}`);
          }
        } else {
          // No
          productIdToDelete = "";
        }
      });
    });
  });
}