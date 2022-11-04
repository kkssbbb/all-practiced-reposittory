const orderDeleteBtn = document.querySelector(".order-delete-btn");
const modal = document.querySelector(".modal-overlay");
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
