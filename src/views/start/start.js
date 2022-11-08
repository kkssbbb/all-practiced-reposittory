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
    _id: "13",
    imgUrl: "./미움받을용기.jpg", // imgUrl 어케 들고옴?
  };
  startBookImg.src = imgUrl;

  function moveDetail() {
    alert("go product-detail");
    startYesBtn.href = "/products";
    // const datas = Api.get(`/api/products/${_id}`);
    // console.log(datas);
  }

  function moveHome() {
    alert("go main");
    startNoBtn.href = "/home";
  }

  startYesBtn.addEventListener("click", moveDetail);
  startNoBtn.addEventListener("click", moveHome);
}
