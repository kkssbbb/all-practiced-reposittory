import { Router } from "express";
import { categoryService } from "../services";
const categoryRouter = Router();

//카테고리 등록
categoryRouter.post("/category", async (req, res) => {
  try {
    const categoryInfo = req.body;
    const content = await categoryService.addCategory(categoryInfo);
    res.status(201).json(content);
  } catch (error) {
    next(error);
  }
});

//카테고리 전체 조회
categoryRouter.get("/category", async (req, res) => {
  try {
    const category = await categoryService.getCategory();
    res.json(category);
  } catch (error) {
    next(error);
  }
});

//카테고리 수정
categoryRouter.patch("/category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = req.body.category;
    const toUpdate = { ...(category && { category }) };

    const categoryUpdate = await categoryService.updateCategory(
      categoryId,
      toUpdate
    );
    res.json(categoryUpdate);
  } catch (error) {
    next(error);
  }
});

//카테고리 삭제
categoryRouter.delete("/category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryService.deleteCategory(categoryId);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
