/*

1. 상품 상세정보에서 장바구니 버튼 클릭 => 서버에서 데이터 받아옴 (이 부분을 지금은 프론트에서 구현)
2. 장바구니 페이지로 이동되며 데이터가 로컬스토리지에 저장됨
3. 장바구니페이지에서 로컬스토리지에 저장된 데이터를 통하여 랜더링
  - 장바구니에 담긴 상품에는 제한된 제고만큼 수량이 수정 가능 (로컬스토리지도 수정)
  - 장바구니에 담긴 상품 삭제 가능 (로컬스토리지도 수정)

  - 장바구니 관련 기능
    - [x] 장바구니 관련 데이터는 백엔드 데이터베이스가 아닌, 프론트단(localStorage, sessionStorage, indexedDB 등)에서 관리된다.
    - [x] 프론트 단에, 장바구니에 속한 상품 관련 데이터가 저장되어서, 페이지를 새로고침해도 장바구니에 상품들이 그대로 남아 있다.
    - [x] 장바구니 추가 - 사용자는 상품을 장바구니에 추가할 수 있다.
      -[x] 장바구니 추가 버튼을 이미 눌렀으면 '이미 담겨있는 상품입니다.'라는 alert를 띄운다
    - [x] 장바구니 수정 - 사용자는 장바구니에 속한 상품의 수량을 수정할 수 있다.
    - [x] 장바구니 전체 삭제 - 사용자는 장바구니에서, 버튼 1번의 클릭으로, 장바구니 상의 전체 상품을 제거할 수 있다.
    - [x] 장바구니 부분 삭제 - 사용자는 장바구니에서, 일부 상품을 골라서 제거할 수 있다.
    - [x] 장바구니 조회 - 사용자는 장바구니에 담긴 상품 목록을 확인할 수 있다.
    - [] 장바구니 가격 조회 - 사용자는 장바구니에 담긴 상품들의 총 가격을 확인할 수 있다.


  장바구니 담기 버튼 클릭시 받아야 할 데이터
  - 제목
  - 가격

  - 상세페이지에서 장바구니 버튼 클릭 시 id 값만 배열형태로 로컬스토리지 저장
  - 장바구니페이지에서 1번에서의 같은 api를 다시 요청하여 id 값과 매치시켜서 제목 이미지 가격 받아오기
  
  - 로컬스토리지에 저장되는 형태는 배열안에 객체여야함

  해당 상품의 id 값 가져오는방법
  홈에서 해당 이미지 클릭시 이미지 url 을 통하여 
  해당 이미지 url 이 포함된 책 한 권의 데이터를 가져온다
  

*/
import store from "../utils/store.js";
import $ from "../utils/dom.js";

// 로컬스토리지 값 불러오기 value가 비었다면 배열로 초기화
const cart = store.getLocalStorage() || [];

const getProductDetailApi = () => {
  const url = "http://localhost:3000/api/products";
  return fetch(url).then((response) => {
    return response.json();
  });
};

const isDuplicate = (id) => {
  if (store.getLocalStorage())
    return store.getLocalStorage().some((data) => data.id === id);
  return false;
};

$("#one").addEventListener("click", async (e) => {
  const data = await getProductDetailApi();
  console.log(data);
  console.log(data[0]._id);
  if (isDuplicate(data[0]._id)) return alert("이미 장바구니에 있습니다❗️");
  cart.push({ id: data[0]._id });
  store.setLocalStorage(cart);
});

$("#two").addEventListener("click", async (e) => {
  const data = await getProductDetailApi();
  // if (IsDuplicate(data)) return alert("이미있는값");
  cart.push({ id: data[0]._id + "1" });
  store.setLocalStorage(cart);
});
