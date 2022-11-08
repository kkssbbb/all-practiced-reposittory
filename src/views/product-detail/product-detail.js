// import * as Api from "../api.js";
// import $ from "../utils/dom.js";
// import { getUrlParams, addCommas } from "../useful-functions.js";

const getUrlParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const result = {};

  for (const [key, value] of urlParams) {
    result[key] = value;
  }

  return result; //{ category : novel }
};

const addCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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

getUrlParams();
showAllElements();

function showAllElements() {
  //헤더 추가
  productData();
}

async function productData() {
  // const { id } = getUrlParams();
  const { id } = { id: "1" };
  // const product = await Api.get(`/products/${id}`);
  const product = {
    title: "미움받을 용기",
    price: "15,000원",
    category: "인문",
    author: "기시미 이치로 , 고가 후미타케",
    publisher: "인플루엔셜",
    publicationDate: "2014년 11월 17일",
    pageNumber: "197pg",
    summary:
      "인간은 사회적인 존재다. 그렇기에 아들러는 “인간의 고민은 전부 인간관계에서 비롯된 고민”이라고 말한다. 어떤 종류의 고민이든 거기에는 반드시 타인과의 관계가 얽혀 있게 마련이고, 따라서 행복해지기 위해서는 인간관계로부터 자유로워져야 한다는 것이다. 모든 사람에게 좋은 사람이길 원하는 사람은 타인의 눈치를 볼 수밖에 없다. 이에 아들러는 타인에게 ‘미움받을 용기’를 가져야만 비로소 자유로워지고 행복해진다고 거듭 강조한다.",
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

  window.titleChange("load", async () => {
    title.innerText = title;
  });
  addCartBtn.addEventListener("click", async () => {});
  buyNowBtn.addEventListener("click", async () => {});
}
