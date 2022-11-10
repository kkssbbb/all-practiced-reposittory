import * as Api from "../api.js";
import $ from "../utils/dom.js";
import { addCommas } from "../useful-functions.js";

/*요소, input 혹은 상수*/
const ordersCount = $("#ordersCount");
const prepareCount = $("#prepareCount");
const deliveryCount = $("#deliveryCount");
const completeCount = $("#completeCount");

const orderListMenu = $("#orderListMenu");

const modal = $("#modal");
const modalBackground = $("#modalBackground");
const modalCloseButton = $("#modalCloseButton");
const deleteCompleteButton = $("#deleteCompleteButton");
const deleteCancelButton = $("#deleteCancelButton");

addAllElements();
addAllEvents();

// 요소 삽입 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  insertOrders();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  modalBackground.addEventListener("click", closeModal);
  modalCloseButton.addEventListener("click", closeModal);
  deleteCompleteButton.addEventListener("click", deleteOrderData);
  deleteCancelButton.addEventListener("click", cancelDelete);
}

/*페이지 로드 시 실행, 삭제할 주문 id를 전역변수로 관리함*/
async function insertOrders() {
  const orders = await Api.get("/api/auth/orders");

  const summary = {
    ordersCount: 0,
    prepareCount: 0,
    deliveryCount: 0,
    completeCount: 0,
  };
<<<<<<< HEAD
  // 날짜 0 , 토탈프라이스x, summaryTitle status , 상품가격을 가져와함
  for (const order of orders.data) {
    const { _id, totalPrice, createdAt, summaryTitle, status } = order;
  //  console.log(_id, totalPrice, createdAt, summaryTitle, status);
=======

  for (const order of orders.data) {
    const { _id, totalPrice, createdAt, summaryTitle, status } = order;
>>>>>>> 1cebf7f63f6996cb64f87e01ec9fcebd2dafcc1f

    const date = createdAt.split("T")[0];

    summary.ordersCount += 1;

    if (status === "상품 준비중") {
      summary.prepareCount += 1;
    } else if (status === "상품 배송중") {
      summary.deliveryCount += 1;
    } else if (status === "배송완료") {
      summary.completeCount += 1;
    }

    orderListMenu.insertAdjacentHTML(
      "beforeend",
      `
      <div class="columns orders-item" id="order-${_id}">
        <div class="column is-2">${date}</div>
        <div class="column is-4 order-summary">${summaryTitle}</div>
        <div class="column is-2">${addCommas(totalPrice)}</div>
        <div class="column is-2">
          <div class="select" >
            <select id="statusSelectBox-${_id}">
              <option 
                class="has-background-danger-light has-text-danger"
                ${status === "상품 준비중" ? "selected" : ""} 
                value="상품 준비중">
                상품 준비중
              </option>
              <option 
                class="has-background-primary-light has-text-primary"
                ${status === "상품 배송중" ? "selected" : ""} 
                value="상품 배송중">
                상품 배송중
              </option>
              <option 
                class="has-background-grey-light"
                ${status === "배송완료" ? "selected" : ""} 
                value="배송완료">
                배송완료
              </option>
            </select>
          </div>
        </div>
        <div class="column is-2">
          <button class="button" id="deleteButton-${_id}" >주문 취소</button>
        </div>
      </div>
    `
    );

    // 요소 선택
    const statusSelectBox = document.querySelector(`#statusSelectBox-${_id}`);
    const deleteButton = document.querySelector(`#deleteButton-${_id}`);

    // 상태관리 박스에, 선택되어 있는 옵션의 배경색 반영
    const index = statusSelectBox.selectedIndex;
    statusSelectBox.className = statusSelectBox[index].className;

    // 이벤트 - 상태관리 박스 수정 시 바로 db 반영
    statusSelectBox.addEventListener("change", async () => {
      const newStatus = statusSelectBox.value;
      const data = { status: newStatus };

      // 선택한 옵션의 배경색 반영
      const index = statusSelectBox.selectedIndex;
      statusSelectBox.className = statusSelectBox[index].className;

      // api 요청
      await Api.patch("/api/auth/orders", _id, data);
    });

    // 이벤트 - 삭제버튼 클릭 시 Modal 창 띄우고, 동시에, 전역변수에 해당 주문의 id 할당
    deleteButton.addEventListener("click", () => {
      orderIdToDelete = _id;
      openModal();
    });
  }

  // 총 요약 값 삽입
  ordersCount.innerText = addCommas(summary.ordersCount);
  prepareCount.innerText = addCommas(summary.prepareCount);
  deliveryCount.innerText = addCommas(summary.deliveryCount);
  completeCount.innerText = addCommas(summary.completeCount);
}

// db에서 주문정보 삭제
async function deleteOrderData(e) {
  e.preventDefault();

  try {
    await Api.delete("/api/orders", orderIdToDelete);

    // 삭제 성공
    alert("주문 정보가 삭제되었습니다.");

    // 삭제한 아이템 화면에서 지우기
    const deletedItem = document.querySelector(`#order-${orderIdToDelete}`);
    deletedItem.remove();

    // 전역변수 초기화
    orderIdToDelete = "";

    closeModal();
  } catch (err) {
    alert(`주문정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
  }
}

/*모달창*/
// Modal 창에서 아니오 클릭할 시, 전역 변수를 다시 초기화함.
function cancelDelete() {
  orderIdToDelete = "";
  closeModal();
}

// Modal 창 열기
function openModal() {
  modal.classList.add("is-active");
}

// Modal 창 닫기
function closeModal() {
  modal.classList.remove("is-active");
}

// const orderDeleteBtn = document.querySelector(".order-delete-btn");
// const modalCloseBtn = document.querySelector(".modal-close-btn");
// const modalYesBtn = document.querySelector(".modal-yes-btn");
// const modalNoBtn = document.querySelector(".modal-no-btn");

// orderDeleteBtn.addEventListener("click", () => {
//   modal.style.display = "flex";
// });

// modalCloseBtn.addEventListener("click", () => {
//   modal.style.display = "none";
// });

// modalYesBtn.addEventListener("click", () => alert("주문 취소"));
// modalNoBtn.addEventListener("click", () => alert("창닫기"));

// 모달창 바깥 영역 클릭시 모달창 닫기
// modal.addEventListener("click", () => {
//   const target = e.target;
//   if (target.classList.contatins("modal-overlay")) {
//     modal.style.display = "none";
//   }
// });

// swal사용
// Swal.fire({
//   title: "Are you sure?",
//   text: "주문 삭제 시 복구할 수 없습니다. 정말로 취소 하시겠습니까?",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "예",
// }).then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire("아니요", "Your file has been deleted.", "success");
//   }
// });
