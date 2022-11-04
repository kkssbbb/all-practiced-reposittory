/*요소, input 혹은 상수*/
const ordersCount = document.querySelector("#ordersCount");
const prepareCount = document.querySelector("#prepareCount");
const deliveryCount = document.querySelector("#deliveryCount");
const completeCount = document.querySelector("#completeCount");

const orderListMenu = document.querySelector("#orderListMenu");

const modal = document.querySelector(".modal-overlay");

/*페이지 로드 시 실행, 삭제할 주문 id를 전역변수로 관리함*/
async function insertOrders() {
  const summary = {
    ordersCount: 0,
    prepareCount: 0,
    deliveryCount: 0,
    completeCount: 0,
  };

  for (const order of orders) {
    const { _id, totalPrice, createdAt, summaryTitle, status } = order;

    summary.ordersCount += 1;

    if (status === "상품 준비중") {
      summary.prepareCount += 1;
    } else if (status === "상품 배송중") {
      summary.deliveryCount += 1;
    } else if (status === "배송완료") {
      summary.completeCount += 1;
    }

    /*주문내역 추가*/
    ordersContainer.insertAdjacentHTML(
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

    /*상태관리 요소 선택*/
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
      await Api.patch("/api/orders", _id, data);
    });

    /*이벤트 - 주문취소 버튼 클릭시 모달창, 전역변수에 해당 주문의 id 할당*/
    deleteButton.addEventListener("click", () => {
      orderIdToDelete = _id;
      openModal();
    });

    // 총 요약 값 삽입
    ordersCount.innerText = addCommas(summary.ordersCount);
    prepareCount.innerText = addCommas(summary.prepareCount);
    deliveryCount.innerText = addCommas(summary.deliveryCount);
    completeCount.innerText = addCommas(summary.completeCount);
  }
}

/**/

const orderDeleteBtn = document.querySelector(".order-delete-btn");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const modalYesBtn = document.querySelector(".modal-yes-btn");
const modalNoBtn = document.querySelector(".modal-no-btn");

orderDeleteBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modalYesBtn.addEventListener("click", () => alert("주문 취소"));
modalNoBtn.addEventListener("click", () => alert("창닫기"));

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
