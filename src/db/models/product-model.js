import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
  //제품 조회
  async findByProductId(productId) {
    return await Product.findOne({ _id: productId });
  }
  //카테고리 상품 조회
  async findByCategory(category) {
    return await Product.find({ category: category });
  }
  //전체 제품 조회
  async findAll() {
    return await Product.find({});
  }

  //상품 추가
  async createProduct(productInfo) {
    return await Product.create(productInfo);
  }

  //상품정보 수정
  async updateProduct(productId, productInfo) {
    const option = { new: true };
    return await Product.findByIdAndUpdate(productId, productInfo, option);
  }

  //상품 삭제
  async deleteProduct(productId) {
    return await Product.findOneAndDelete({ _id: productId });
  }
}

const productModel = new ProductModel();
export { productModel };
