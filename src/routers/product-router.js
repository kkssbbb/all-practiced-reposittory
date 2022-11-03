import { Router } from "express";
import { productService } from "../services";

const productRouter = Router();

productRouter.post("/productCreate", async (req, res) => {
  const {
    title,
    // price,
    // category,
    // author,
    // publisher,
    // publicationDate,
    // pageNumber,
    // summary,
  } = req.body;

  const content = await productService.addProduct({
    title,
    // price,
    // category,
    // author,
    // publisher,
    // publicationDate,
    // pageNumber,
    // summary,
  });
  res.json(content);
});

export { productRouter };
