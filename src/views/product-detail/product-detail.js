import * as Api from "../api.js";
import $ from "../utils/dom.js";
import { getUrlParams, addCommas } from "../useful-functions.js";

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

getUrlParams();
showAllElements();

function showAllElements() {
  //헤더 추가
  alert("ehlsk?");
  productData();
}

async function productData() {
  const { id } = getUrlParams();
  // const { id } = { id: "1" };
  console.log(id);
  // const product = await Api.get(`/products/${id}`);
  const product = {
    title: "미움받을 용기이이이이이이이이이이",
    price: "15000",
    category: "인문",
    author: "기시미 이치로 , 고가 후미타케",
    publisher: "인플루엔셜",
    publicationDate: "2014년 11월 17일",
    pageNumber: "197pg",
    summary:
      "인간은 사회적인 존재다. 그렇기에 아들러는 “인간의 고민은 전부 인간관계에서 비롯된 고민”이라고 말한다. 어떤 종류의 고민이든 거기에는 반드시 타인과의 관계가 얽혀 있게 마련이고,",
  };

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
    webTitle.innerText = title;
  });
  addCartBtn.addEventListener("click", async () => {});
  buyNowBtn.addEventListener("click", async () => {});
}
