import * as Api from "../api.js";
import $ from "../utils/dom.js";

const startBookImg = $(".start-book-img");

const startYesBtn = $(".start-yes");
const startNoBtn = $(".start-no");

showStart();

async function showStart() {
  startNoBtn.href = "/home";

  const datas = await Api.get("/api");
  const { _id, imgUrl } = datas;
  startBookImg.src = imgUrl;

  startYesBtn.href = `/products/${_id}`;
}
