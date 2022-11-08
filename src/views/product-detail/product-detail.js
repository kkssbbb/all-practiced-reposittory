import * as Api from "../../api.js";
// import $ from "../../utils/dom.js";
import { getUrlParams, addCommas } from "../../useful-functions.js";

console.log("minid");

const title = document.querySelector("title");
const addCartBtn = document.querySelector(".add-cart-btn");
const buyNowBtn = document.querySelector(".buy-now-btn");

const bookCategory = document.querySelector(".book-category");
const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPublisher = document.querySelector(".book-publisher");
const bookPublicationDate = document.querySelector(".book-publicationDate");
const bookPage = document.querySelector(".book-page");
const bookPrice = document.querySelector(".book-price");
const bookSummary = document.querySelector(".book-summary");

// checkUrlParams("id");
getUrlParams();
showAllElements();

function showAllElements() {
  //헤더 추가
  productData();
}

async function productData() {
  const { id } = getUrlParams();
  console.log("mini");
  const product = await Api.get(`/api/products/${id}`);
  console.log(product);

  const {
    title,
    price,
    category,
    author,
    publisher,
    publicationDate,
    pageNumber,
    summary,
  } = product;

  bookCategory.innerText = category;
  bookTitle.innerText = title;
  bookAuthor.innerText = author;
  bookPublisher.innerText = publisher;
  bookPublicationDate.innerText = publicationDate;
  bookPage.innerText = pageNumber;
  bookSummary.innerText = summary;
  bookPrice.innerText = `${addCommas(price)}원`;

  window.addEventListener("load", async () => {
    title.innerText = title;
  });
  addCartBtn.addEventListener("click", async () => {});
  buyNowBtn.addEventListener("click", async () => {});
}
