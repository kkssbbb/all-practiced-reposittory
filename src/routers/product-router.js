import { Router } from "express";
import { productService } from "../services";
const productRouter = Router();
import { upload } from "../middlewares";
import { productRequired } from "../middlewares";

// productRouter.post("/profile", upload.single("image"), async (req, res) => {
//   console.log(req.file);
//   res.send("ok");
// });

//상품 등록
productRouter.post(
  "/products",
  upload.single("imgUrl"),
  productRequired,
  async (req, res, next) => {
    try {
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

      const imgUrl = req.file.path.split("src/views")[1];
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
      res.status(201).json(content);
    } catch (error) {
      next(error);
    }
  }
);

//랜덤 상품 조회
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    const max = products.length;
    const random = Math.floor(Math.random() * max);
    res.status(201).json(products[random]);
  } catch (error) {
    next(error);
  }
});

//상품 조회
productRouter.get("/products/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProduct(productId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

//상품 전체 조회 및 카테고리 별 조회
productRouter.get("/products", async (req, res, next) => {
  try {
    const { category } = req.query;
    if (category !== undefined) {
      const product = await productService.getProductsByCategory(category);
      res.json({ error: null, data: product });
    }
    const products = await productService.getProducts();
    res.status(201).json(products);
  } catch (error) {
    next(error);
  }
});

//상품 업데이트
productRouter.patch("/products/:id", async (req, res, next) => {
  try {
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
    res.json(updatedProductInfo);
  } catch (error) {
    next(error);
  }
});

//상품 삭제
productRouter.delete("/products/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productsDelete = await productService.deleteProduct(productId);

    res.json(productsDelete);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
