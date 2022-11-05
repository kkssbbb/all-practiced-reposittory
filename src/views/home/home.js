// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "../api.js";
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
  const products = await Api.get("/api/products");
  // const products = [
  //   {
  //     _id: "1",
  //     title: "미움받을 용기",
  //     price: "15,000원",
  //     category: "인문",
  //     author: "기시미 이치로 , 고가 후미타케",
  //     publisher: "인플루엔셜",
  //     publicationDate: "2014년 11월 17일",
  //     pageNumber: "197pg",
  //     summary:
  //       "인간은 사회적인 존재다. 그렇기에 아들러는 “인간의 고민은 전부 인간관계에서 비롯된 고민”이라고 말한다. 어떤 종류의 고민이든 거기에는 반드시 타인과의 관계가 얽혀 있게 마련이고, 따라서 행복해지기 위해서는 인간관계로부터 자유로워져야 한다는 것이다. 모든 사람에게 좋은 사람이길 원하는 사람은 타인의 눈치를 볼 수밖에 없다. 이에 아들러는 타인에게 ‘미움받을 용기’를 가져야만 비로소 자유로워지고 행복해진다고 거듭 강조한다.",
  //   },
  //   {
  //     _id: "2",
  //     title: "미움받을 용기",
  //     price: "15,000원",
  //     category: "인문",
  //     author: "기시미 이치로 , 고가 후미타케",
  //     publisher: "인플루엔셜",
  //     publicationDate: "2014년 11월 17일",
  //     pageNumber: "197pg",
  //     summary:
  //       "인간은 사회적인 존재다. 그렇기에 아들러는 “인간의 고민은 전부 인간관계에서 비롯된 고민”이라고 말한다. 어떤 종류의 고민이든 거기에는 반드시 타인과의 관계가 얽혀 있게 마련이고, 따라서 행복해지기 위해서는 인간관계로부터 자유로워져야 한다는 것이다. 모든 사람에게 좋은 사람이길 원하는 사람은 타인의 눈치를 볼 수밖에 없다. 이에 아들러는 타인에게 ‘미움받을 용기’를 가져야만 비로소 자유로워지고 행복해진다고 거듭 강조한다.",
  //   },
  //   {
  //     _id: "3",
  //     title: "미움받을 용기",
  //     price: "15,000원",
  //     category: "인문",
  //     author: "기시미 이치로 , 고가 후미타케",
  //     publisher: "인플루엔셜",
  //     publicationDate: "2014년 11월 17일",
  //     pageNumber: "197pg",
  //     summary:
  //       "인간은 사회적인 존재다. 그렇기에 아들러는 “인간의 고민은 전부 인간관계에서 비롯된 고민”이라고 말한다. 어떤 종류의 고민이든 거기에는 반드시 타인과의 관계가 얽혀 있게 마련이고, 따라서 행복해지기 위해서는 인간관계로부터 자유로워져야 한다는 것이다. 모든 사람에게 좋은 사람이길 원하는 사람은 타인의 눈치를 볼 수밖에 없다. 이에 아들러는 타인에게 ‘미움받을 용기’를 가져야만 비로소 자유로워지고 행복해진다고 거듭 강조한다.",
  //   },
  //   {
  //     _id: "4",
  //     title: "미움받을 용기",
  //     price: "15,000원",
  //     category: "인문",
  //     author: "기시미 이치로 , 고가 후미타케",
  //     publisher: "인플루엔셜",
  //     publicationDate: "2014년 11월 17일",
  //     pageNumber: "197pg",
  //     summary:
  //       "인간은 사회적인 존재다. 그렇기에 아들러는 “인간의 고민은 전부 인간관계에서 비롯된 고민”이라고 말한다. 어떤 종류의 고민이든 거기에는 반드시 타인과의 관계가 얽혀 있게 마련이고, 따라서 행복해지기 위해서는 인간관계로부터 자유로워져야 한다는 것이다. 모든 사람에게 좋은 사람이길 원하는 사람은 타인의 눈치를 볼 수밖에 없다. 이에 아들러는 타인에게 ‘미움받을 용기’를 가져야만 비로소 자유로워지고 행복해진다고 거듭 강조한다.",
  //   },
  //   {
  //     _id: "5",
  //     title: "미움받을 용기",
  //     price: "15,000원",
  //     category: "인문",
  //     author: "기시미 이치로 , 고가 후미타케",
  //     publisher: "인플루엔셜",
  //     publicationDate: "2014년 11월 17일",
  //     pageNumber: "197pg",
  //     summary:
  //       "인간은 사회적인 존재다. 그렇기에 아들러는 “인간의 고민은 전부 인간관계에서 비롯된 고민”이라고 말한다. 어떤 종류의 고민이든 거기에는 반드시 타인과의 관계가 얽혀 있게 마련이고, 따라서 행복해지기 위해서는 인간관계로부터 자유로워져야 한다는 것이다. 모든 사람에게 좋은 사람이길 원하는 사람은 타인의 눈치를 볼 수밖에 없다. 이에 아들러는 타인에게 ‘미움받을 용기’를 가져야만 비로소 자유로워지고 행복해진다고 거듭 강조한다.",
  //   },
  //   {
  //     _id: "6",
  //     title: "미움받을 용기",
  //     price: "15,000원",
  //     category: "인문",
  //     author: "기시미 이치로 , 고가 후미타케",
  //     publisher: "인플루엔셜",
  //     publicationDate: "2014년 11월 17일",
  //     pageNumber: "197pg",
  //     summary:
  //       "인간은 사회적인 존재다. 그렇기에 아들러는 “인간의 고민은 전부 인간관계에서 비롯된 고민”이라고 말한다. 어떤 종류의 고민이든 거기에는 반드시 타인과의 관계가 얽혀 있게 마련이고, 따라서 행복해지기 위해서는 인간관계로부터 자유로워져야 한다는 것이다. 모든 사람에게 좋은 사람이길 원하는 사람은 타인의 눈치를 볼 수밖에 없다. 이에 아들러는 타인에게 ‘미움받을 용기’를 가져야만 비로소 자유로워지고 행복해진다고 거듭 강조한다.",
  //   },
  //   {
  //     _id: "7",
  //     title: "미움받을 용기",
  //     price: "15,000원",
  //     category: "인문",
  //     author: "기시미 이치로 , 고가 후미타케",
  //     publisher: "인플루엔셜",
  //     publicationDate: "2014년 11월 17일",
  //     pageNumber: "197pg",
  //     summary:
  //       "인간은 사회적인 존재다. 그렇기에 아들러는 “인간의 고민은 전부 인간관계에서 비롯된 고민”이라고 말한다. 어떤 종류의 고민이든 거기에는 반드시 타인과의 관계가 얽혀 있게 마련이고, 따라서 행복해지기 위해서는 인간관계로부터 자유로워져야 한다는 것이다. 모든 사람에게 좋은 사람이길 원하는 사람은 타인의 눈치를 볼 수밖에 없다. 이에 아들러는 타인에게 ‘미움받을 용기’를 가져야만 비로소 자유로워지고 행복해진다고 거듭 강조한다.",
  //   },
  // ];
  console.log(products);

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
    console.log(_id, title);
    const random = randomId();

    bookList.insertAdjacentHTML(
      "beforeend",
      `
          <div class="book-list-item" id="a${random}">
      <p>${title}</p>
      <img src="" alt="책 표지" />
    </div>
          `
    );

    // const productItem = document.querySelector(`#a${random}`);
    // productItem.addEventListener(
    //   "click",
    //   navigate(`/product/detail?id=${_id}`)
    // );
  });
}
