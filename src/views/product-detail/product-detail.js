import * as Api from "../../api.js";
import $ from "../../utils/dom.js";
import store from "../../utils/store.js";
import {
  navigate,
  getUrlParams,
  addCommas,
  addDate,
} from "../../useful-functions.js";

const cart = store.getLocalStorage() || [];

// const webTitle = $("title");
// const bookImg = $("#book-img");
// const bookCategory = $(".book-category");
// const bookTitle = $(".book-title");
// const bookAuthor = $(".book-author");
// const bookPublisher = $(".book-publisher");
// const bookPublicationDate = $(".book-publicationDate");
// const bookPage = $(".book-page");
// const bookPrice = $(".book-price");
// const bookSummary = $(".book-summary");

// checkUrlParams("id");

getUrlParams();
showAllElements();

function showAllElements() {
  //헤더 추가
  productData();
}

const isDuplicate = (id) => {
  if (store.getLocalStorage())
    return store.getLocalStorage().some((data) => data.id === id);
  return false;
};

async function productData() {
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

  $("title").innerText = title;
  $("#book-img").src = imgUrl;
  $(".book-category").innerText = category;
  $(".book-title").innerText = title;
  $(".book-author").innerText = author;
  $(".book-publisher").innerText = publisher;
  $(".book-publicationDate").innerText = `${addDate(publicationDate)}`;
  $(".book-page").innerText = `${pageNumber} pg`;
  $(".book-summary").innerText = summary;
  $(".book-price").innerText = `${addCommas(price)} 원`;

  $(".add-cart-btn").addEventListener("click", navigate(`/cart`));
  $(".add-cart-btn").addEventListener("click", () => {
    if (isDuplicate(id)) return alert("이미 장바구니에 있습니다❗️");
    cart.push({ id: id });
    store.setLocalStorage(cart);
  });
}

$(".buy-now-btn").addEventListener("click", () => {});
