import { ProductAPIDetailResponse } from "../models/product-detail-model";

export interface IGetProductDetail {
  getProductDetail: (productId: string) => Promise<ProductAPIDetailResponse>;
}