import { productModel } from "../db";

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  //상품조회
  async getProducts() {
    return await productModel.findAll();
  }

  //상품등록
  async addProduct(productInfo) {
    // db에 저장
    return await productModel.createProduct(productInfo);
  }

  //카테고리 별로 상품 조회
}
const productService = new ProductService(productModel);

export { productService };
