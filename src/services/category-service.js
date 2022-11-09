import { categoryModel } from "../db";

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  //전체 카테고리 조회
  async getCategory() {
    return await categoryModel.findAll();
  }

  //카테고리 추가
  async addCategory(categoryInfo) {
    return await categoryModel.create(categoryInfo);
  }

  //카테고리 수정
  async updateCategory(categoryId, toUpdate) {
    let category = await categoryModel.findById(categoryId);
    if (!category) {
      throw new Error("존재하지 않는 카테고리 입니다.");
    }
    return await categoryModel.update(categoryId, toUpdate);
  }

  //카테고리 삭제
  async deleteCategory(categoryId) {
    return await categoryModel.delete(categoryId);
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
