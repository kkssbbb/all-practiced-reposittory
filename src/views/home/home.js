// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "../api.js";
import $ from "./js/utils.js/dom.js";
import { navigate } from "../useful-functions.js";

showProductItemsToContainer();

// function showProductDetail(id) {
//   navigate(`api/products/${id}`);
//   // window.location.href = `api/products/${id}`;
// }

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
  // ];

  products.forEach(async (product) => {
    const {
      _id,
      imgUrl,
      title,
      price,
      category,
      author,
      publisher,
      publicationDate,
      pageNumber,
      summary,
    } = product;

    $(".book-list").insertAdjacentHTML(
      "beforeend",
      `
          <div class="book-list-item" id="a${_id}">
      <p>${title}</p>
      <img src="" alt="책 표지" />
    </div>
          `
    );

    // navigate(`api/products/${_id}`);
    // productItem.addEventListener("click", showProductDetail(_id));
    const productItem = document.querySelector(`#a${_id}`);
    productItem.addEventListener("click", navigate(`products/${_id}`));
  });
}
