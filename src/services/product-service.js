import { productModel } from "../db";

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }
  //제품 조회
  async getProduct(productId) {
    return await productModel.findById(productId);
  }

  //전체 상품조회
  async getProducts() {
    return await productModel.findAll();
  }

  //상품등록
  async addProduct(productInfo) {
    return await productModel.create(productInfo);
  }

  //카테고리 별로 상품 조회
  async getProductsByCategory(category) {
    return await productModel.findByCategory(category);
  }

  //상품 수정
  async updateProduct(productId, toUpdate) {
    let product = await productModel.findById(productId);
    if (!product) {
      throw new Error("존재하지 않는 상품입니다.");
    }
    return await productModel.update(productId, toUpdate);
  }

  //상품 삭제
  async deleteProduct(productId) {
    return await productModel.delete(productId);
  }
}
const productService = new ProductService(productModel);

export { productService };
