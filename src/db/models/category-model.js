import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("category", CategorySchema);

export class CategoryModel {
  //카테고리 조회
  async findByCategory(categoryId) {
    return await Category.findOne({ _id: categoryId });
  }

  //카테고리 전체 조회
  async findAll() {
    return await Category.find();
  }

  //카테고리 추가
  async create(categoryInfo) {
    return await Category.create(categoryInfo);
  }

  //카테고리 수정
  async update(categoryId, categoryInfo) {
    const option = { new: true };
    return await Category.findByIdAndUpdate(categoryId, categoryInfo, option);
  }

  //카테고리 삭제
  async delete(categoryId) {
    return await Category.findOneAndDelete({ _id: categoryId });
  }
}

const categoryModel = new CategoryModel();
export { categoryModel };
