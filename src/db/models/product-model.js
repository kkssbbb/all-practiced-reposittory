import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
  //제품 조회
  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }
  //카테고리 상품 조회
  async findByCategory(categoryList) {
    const productList = await Product.find({ category: categoryList });
    return productList;
  }
  //전체 제품 조회
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  //상품 추가
  async createProduct(productInfo) {
    return await Product.create(productInfo);
  }
}

const productModel = new ProductModel();
export { productModel };
