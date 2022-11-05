import { Router } from "express";
import { productService } from "../services";
import { imageUpload } from "../middlewares";
const productRouter = Router();

//상품 등록
productRouter.post(
  "/products",
  imageUpload.single("image"),
  async (req, res) => {
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

    const imgUrl = `views/home/img/home-book/${req.file.filename}`;

    const content = await productService.addProduct({
      imgUrl,
      title,
      price,
      category,
      author,
      publisher,
      publicationDate,
      pageNumber,
      summary,
    });
    res.json(content);
  }
);

//상품 조회
productRouter.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await productService.getProduct(productId);
  res.status(201).json(product);
});
//상품 전체 조회
productRouter.get("/products", async (req, res) => {
  const products = await productService.getProducts();
  res.status(201).json(products);
});
//상품 카테고리별 조회
productRouter.get("/products/category/:id", async (req, res) => {
  const productsCategory = req.params.id;
  const productsCategoryInfo = await productService.getProductsCategory(
    productsCategory
  );

  res.status(201).json(productsCategoryInfo);
});

//상품 업데이트
productRouter.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;

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

  const toUpdate = {
    ...(title && { title }),
    ...(price && { price }),
    ...(category && { category }),
    ...(author && { author }),
    ...(publisher && { publisher }),
    ...(publicationDate && { publicationDate }),
    ...(pageNumber && { pageNumber }),
    ...(summary && { summary }),
  };

  const updatedProductInfo = await productService.updateProduct(
    productId,
    toUpdate
  );
  res.status(200).json(updatedProductInfo);
});

//상품 삭제
productRouter.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productsDelete = await productService.deleteProduct(productId);

  res.status(201).json(productsDelete);
});

export { productRouter };
