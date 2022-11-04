import $ from "./utils.js/dom.js";

$(".book-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("product")) console.log(e.target.src);
});

console.log("connect");
