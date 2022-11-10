// 문자열+숫자로 이루어진 랜덤 5글자 반환
export const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

// 해당 주소로 이동하는 콜백함수를 반환함.
// 이벤트 핸들 함수로 쓰면 유용함
export const navigate = (pathname) => {
  return function () {
    window.location.href = pathname;
  };
};
export const navigate2 = (pathname) => {
  return function () {
    window.location.search = pathname;
  };
};

export const checkUrlParams = (key) => {
  const params = getUrlParams();

  if (!params) {
    window.location.replace("/page-not-found");
  }
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const addDate = (date) => {
  date = date.toString();
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6);
  return `${year}년 ${month}월 ${day}일`;
};

// 13,000원, 2개 등의 문자열에서 쉼표, 글자 등 제외 후 숫자만 뺴냄
// 예시: 13,000원 -> 13000, 20,000개 -> 20000
export const convertToNumber = (string) => {
  return parseInt(string.replace(/(,|개|원)/g, ""));
};

// ms만큼 기다리게 함.
export const wait = (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

// 주소창의 url로부터 params를 얻어 객체로 만듦
export const getUrlParams = () => {
  const params = window.location.pathname.split("/")[2];
  return params; //{ id : 12341235 }
};

// export const getUrlParams = () => {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);

//   const result = {};

//   for (const [key, value] of urlParams) {
//     result[key] = value;
//   }

//   return result; //{ id : 12341235 }
// };

export const checkLogin = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    // 현재 페이지의 url 주소 추출하기
    const pathname = window.location.pathname;
    const search = window.location.search;

    // 로그인 후 다시 지금 페이지로 자동으로 돌아가도록 하기 위한 준비작업임.
    window.location.replace(`/login?previouspage=${pathname + search}`);
  }
};

// export { createNavbar } from "./navbar.js";
