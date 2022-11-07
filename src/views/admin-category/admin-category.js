const categoryAdd = document.querySelector(".category-add");
const categoryUpdate = document.querySelectorAll(".category-update");
const categoryDelete = document.querySelectorAll(".category-delete");

console.log(categoryUpdate);

categoryAdd.addEventListener("click", () => alert("카테고리 추가"));
categoryUpdate.addEventListener("click", () => alert("카테고리 수정"));
categoryDelete.addEventListener("click", () => alert("카테고리 삭제"));
