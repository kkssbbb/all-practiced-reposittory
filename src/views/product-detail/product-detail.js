import * as Api from "../../api.js";

import {
  getUrlParams,
  addCommas,
  checkUrlParams,
} from "../../useful-functions.js";
console.log("test");

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
const bookImg = document.querySelector("#bookimg");

checkUrlParams("id");
getUrlParams();
showAllElements();

function showAllElements() {
  console.log("testssss");

  //헤더 추가
  productData();
}

async function productData() {
  console.log("test");

  // const { id } = getUrlParams();

  //  const { id } = { id: "1" };

  // const product = await Api.get(`/api/products/${id}`);
  const id = getUrlParams();
  const product = await Api.get(`/api/products/${id}`);
  const {
    title,
    imgUrl,
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
  bookImg.src = imgUrl;

  document.title("load", () => {
    title.innerText = title;
  });
  addCartBtn.addEventListener("click", async () => {});
  buyNowBtn.addEventListener("click", async () => {});
}
