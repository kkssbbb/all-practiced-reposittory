import * as Api from "../api.js";
import $ from "../utils/dom.js";
import { addCommas } from "../useful-functions.js";

/*요소, input 혹은 상수*/
const ordersCount = $("#ordersCount");
const prepareCount = $("#prepareCount");
const deliveryCount = $("#deliveryCount");
const completeCount = $("#completeCount");

const orderListMenu = $("#orderListMenu");

addAllElements();

// 요소 삽입 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  insertOrders();
}

/*페이지 로드 시 실행, 삭제할 주문 id를 전역변수로 관리함*/
let orderIdToDelete;
async function insertOrders() {
  const orders = await Api.get("/api/auth/orders");

  const summary = {
    ordersCount: 0,
    prepareCount: 0,
    deliveryCount: 0,
    completeCount: 0,
  };

  // 날짜 0 , 토탈프라이스x, summaryTitle status , 상품가격을 가져와함
  for (const order of orders.data) {
    const { _id, totalPrice, createdAt, titleList, status } = order;
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
          <div class="column is-4 order-summary">${titleList}</div>
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
    const statusSelectBox = $(`#statusSelectBox-${_id}`);
    const deleteButton = $(`#deleteButton-${_id}`);

    // 이벤트 - 상태관리 박스 수정 시 바로 db 반영
    statusSelectBox.addEventListener("change", async () => {
      const newStatus = statusSelectBox.value;
      const data = { status: newStatus };

      // api 요청
      await Api.patch("/api/auth/orders", _id, data);
    });

    // 이벤트 - 삭제버튼 클릭 시 Modal 창 띄우고, 동시에, 전역변수에 해당 주문의 id 할당
    deleteButton.addEventListener("click", () => {
      orderIdToDelete = _id;

      // openModal
      Swal.fire({
        title: "정말 취소하시겠습니까?",
        text: "진짜로~~?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (res) => {
        if (res.isConfirmed) {
          // Yes, // db에서 주문정보 삭제
          try {
            await Api.delete("/api/orders", orderIdToDelete);

            // 삭제 성공
            alert("주문 정보가 삭제되었습니다.");

            // 삭제한 아이템 화면에서 지우기
            const deletedItem = $(`#order-${orderIdToDelete}`);
            deletedItem.remove();

            // 전역변수 초기화
            orderIdToDelete = "";
          } catch (err) {
            alert(`주문정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
          }
        } else {
          // No
          orderIdToDelete = "";
        }
      });
    });
  }

  // 총 요약 값 삽입
  ordersCount.innerText = addCommas(summary.ordersCount);
  prepareCount.innerText = addCommas(summary.prepareCount);
  deliveryCount.innerText = addCommas(summary.deliveryCount);
  completeCount.innerText = addCommas(summary.completeCount);
}
