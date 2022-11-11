function productRequired(req, res, next) {
  const {
    title,
    price,
    category,
    author,
    publisher,
    publicationDate,
    pageNumber,
    summary,
  } = req.body;
  const imgUrl = req.file.path;
  if (imgUrl === undefined) {
    const error = new Error(`이미지 파일을 업로드 하세요.`);
    error.statusCode = 400;
    throw error;
  }
  if (title === undefined) {
    const error = new Error(`제목을 입력하세요.`);
    error.statusCode = 400;
    throw error;
  }
  if (price === undefined) {
    const error = new Error(`가격을 입력하세요.`);
    error.statusCode = 400;
    throw error;
  }
  // if (category === undefined) {
  //   const error = new Error(`카테고리를 입력하세요.`);
  //   error.statusCode = 400;
  //   throw error;
  // }
  if (author === undefined) {
    const error = new Error(`작가를 입력하세요.`);
    error.statusCode = 400;
    throw error;
  }
  if (publisher === undefined) {
    const error = new Error(`출판사를 입력하세요.`);
    error.statusCode = 400;
    throw error;
  }
  if (publicationDate === undefined) {
    const error = new Error(`출판일를 입력하세요.`);
    error.statusCode = 400;
    throw error;
  }
  if (pageNumber === undefined) {
    const error = new Error(`책의 총 페이지 값을 입력하세요.`);
    error.statusCode = 400;
    throw error;
  }
  if (summary === undefined) {
    const error = new Error(`줄거리를 입력하세요.`);
    error.statusCode = 400;
    throw error;
  }
  next();
}
export { productRequired };
