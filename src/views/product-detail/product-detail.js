import * as Api from "/api.js";

const title = document.querySelector("title");
const addCartBtn = document.querySelector(".add-cart-btn");
const buyNowBtn = document.querySelector(".buy-now-btn");

// 책 제목 받아와서 title 변경하기

function handleAddCart() {
  Swal.fire({
    icon: "success",
    title: "장바구니에 상품이 담겼습니다.",
  });
}

function handleBuyNow() {
  // 회원이 책을 구매하는 정보를 장바구니 페이지에 전달???
}

addCartBtn.addEventListener("click", handleAddCart);
addCartBtn.addEventListener("click", handleBuyNow);
