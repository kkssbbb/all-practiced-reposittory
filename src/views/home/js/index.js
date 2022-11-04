/* 

- nav바 링크 클릭 시 해당페이지로 이동
- 책 카테고리 클릭 시 받아온 api로 해당 카테고리 책 랜더링  
- 책 이미지 클릭 시 상세정보 페이지로 이동

*/

import $ from "./utils.js/dom.js";

$(".book-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("product")) console.log(e.target.src);
});

console.log("connect");

$("");
