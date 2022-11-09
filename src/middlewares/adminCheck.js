import jwt from "jsonwebtoken";

function adminCheck(req, res, next) {
  //헤더에 토큰을 받는다.
  const checkToken = req.headers["authorization"]?.split(" ")[1];

  //옵셔널체이닝으로 null, undiefined 확인?
  //어드민미들웨어 맹들고
  //본인이 주문한 주문 확인

  //일단 로그인 먼저 체크
  if (!checkToken || checkToken === "null") {
    res.status(401).json({
      messege: "로그인 먼져 해주세요^^",
    });
    return;
  }

  try {
    //토큰 채크를 해봅시다
    //jwt디코딩
    const secretKey = process.env.JWT_SEC_KEY || "secret-key";
    const jwtDecoded = jwt.verify(checkToken, secretKey);

    const role = jwtDecoded.role;

    if (role !== "admin") {
      res.status(403).json({
        messege: "관리자만 허용됩니다.^^",
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
    return;
  }
}

export { adminCheck };
