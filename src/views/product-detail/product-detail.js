import * as Api from "../../api.js";
import $ from "../../utils/dom.js";
import { getUrlParams, addCommas } from "../../useful-functions.js";

const webTitle = $("title");
const addCartBtn = $(".add-cart-btn");
const buyNowBtn = $(".buy-now-btn");

const bookCategory = $(".book-category");
const bookTitle = $(".book-title");
const bookAuthor = $(".book-author");
const bookPublisher = $(".book-publisher");
const bookPublicationDate = $(".book-publicationDate");
const bookPage = $(".book-page");
const bookPrice = $(".book-price");
const bookSummary = $(".book-summary");

// checkUrlParams("id");
getUrlParams();
showAllElements();

function showAllElements() {
  //헤더 추가
  productData();
}

async function productData() {
  const { id } = getUrlParams();

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

  window.addEventListener("load", async () => {
    webTitle.innerText = title;
  });
  addCartBtn.addEventListener("click", async () => {});
  buyNowBtn.addEventListener("click", async () => {});
}
