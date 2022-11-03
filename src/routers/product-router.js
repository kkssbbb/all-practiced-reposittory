import { Router } from "express";
import { productService } from "../services";

const productRouter = Router();

productRouter.post("/productCreate", async (req, res) => {
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

  const content = await productService.addProduct({
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
});

productRouter.get("/getProductsList", async (req, res) => {
  const products = await productService.getProducts();
  res.status(201).json(products);
});

productRouter.get("/getProductsList/:category", async (req, res) => {
  const productsCategory = req.params.category;
  const productsCategoryInfo = await productService.getProductsCategory(
    productsCategory
  );

  res.status(201).json(productsCategoryInfo);
});

export { productRouter };
