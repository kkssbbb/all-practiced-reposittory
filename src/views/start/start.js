import $ from "../utils/dom.js";
import { navigate } from "../useful-functions.js";

const startBookImg = $(".start-book-img");

const startYesBtn = $(".start-yes");
const startNoBtn = $(".start-no");

window.addEventListener("load", showStart());

async function showStart() {
  //책 표지 랜덤으로 불러오기 (id,imgUrl)
  // const datas = await Api.get("");
  const { _id, imgUrl } = {
    _id: "63667adfc5ddb2cf448a45d8",
    imgUrl: "./미움받을용기.jpg", // imgUrl 어케 들고옴?
  };
  startBookImg.src = imgUrl;

  function moveDetail() {
    startYesBtn.href = `/products/userId?id=${_id}`;
    // const datas = Api.get(`/api/products/${_id}`);
    // console.log(datas);
  }

  startYesBtn.addEventListener("click", moveDetail);
}
