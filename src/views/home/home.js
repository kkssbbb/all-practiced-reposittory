// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

// import * as Api from "..api";
// import { randomId } from "/useful-functions.js";

const $ = (selector) => document.querySelector(selector);

const bookContainer = document.querySelector("book-container");
const bookList = document.querySelector(".book-list");

const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

const getUrlParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const result = {};

  for (const [key, value] of urlParams) {
    result[key] = value;
  }

  return result; //{ category : novel }
};

const navigate = (pathname) => {
  return function () {
    window.location.href = pathname;
  };
};

showProductItemsToContainer();

// 홈 화면에 제품들을 보여줌
async function showProductItemsToContainer() {
  // const products = await Api.get("/products");
  const products = [
    {
      _id: "a1",
      title: "제목이다",
      price: "가격이다",
      category: "카테고리다",
      author: "작가다",
      publisher: "출판사다",
      publicationDate: "발행일이다",
      pageNumber: "쪽수다",
      summary: "줄거리다",
    },
    {
      _id: "a2",
      title: "제목이다",
      price: "가격이다",
      category: "카테고리다",
      author: "작가다",
      publisher: "출판사다",
      publicationDate: "발행일이다",
      pageNumber: "쪽수다",
      summary: "줄거리다",
    },
    {
      _id: "a3",
      title: "제목이다",
      price: "가격이다",
      category: "카테고리다",
      author: "작가다",
      publisher: "출판사다",
      publicationDate: "발행일이다",
      pageNumber: "쪽수다",
      summary: "줄거리다",
    },
    {
      _id: "a4",
      title: "제목이다",
      price: "가격이다",
      category: "카테고리다",
      author: "작가다",
      publisher: "출판사다",
      publicationDate: "발행일이다",
      pageNumber: "쪽수다",
      summary: "줄거리다",
    },
    {
      _id: "a5",
      title: "제목이다",
      price: "가격이다",
      category: "카테고리다",
      author: "작가다",
      publisher: "출판사다",
      publicationDate: "발행일이다",
      pageNumber: "쪽수다",
      summary: "줄거리다",
    },
    {
      _id: "a6",
      title: "제목이다",
      price: "가격이다",
      category: "카테고리다",
      author: "작가다",
      publisher: "출판사다",
      publicationDate: "발행일이다",
      pageNumber: "쪽수다",
      summary: "줄거리다",
    },
    {
      _id: "a7",
      title: "제목이다",
      price: "가격이다",
      category: "카테고리다",
      author: "작가다",
      publisher: "출판사다",
      publicationDate: "발행일이다",
      pageNumber: "쪽수다",
      summary: "줄거리다",
    },
    {
      _id: "a8",
      title: "제목이다",
      price: "가격이다",
      category: "카테고리다",
      author: "작가다",
      publisher: "출판사다",
      publicationDate: "발행일이다",
      pageNumber: "쪽수다",
      summary: "줄거리다",
    },
    {
      _id: "a9",
      title: "제목이다",
      price: "가격이다",
      category: "카테고리다",
      author: "작가다",
      publisher: "출판사다",
      publicationDate: "발행일이다",
      pageNumber: "쪽수다",
      summary: "줄거리다",
    },
    {
      _id: "a10",
      title: "제목이다",
      price: "가격이다",
      category: "카테고리다",
      author: "작가다",
      publisher: "출판사다",
      publicationDate: "발행일이다",
      pageNumber: "쪽수다",
      summary: "줄거리다",
    },
  ];

  products.forEach(async (product) => {
    // 객체 destructuring
    const {
      _id,
      title,
      price,
      category,
      author,
      publisher,
      publicationDate,
      pageNumber,
      summary,
    } = product;
    // const imageUrl = await getImageUrl(imageKey);
    // const random = randomId();

    bookList.insertAdjacentHTML(
      "beforeend",
      `
      <div class="book-list-item" id="a${_id}">
  <p>${title}</p>
  <img src="" alt="책 표지" />
</div>
      `
    );

    const productItem = document.querySelector(`#a${_id}`);
    productItem.addEventListener("click", navigate(`/product/:id=${_id}`));
  });
}
