import { ProductAPIResponse } from "../models";

export interface IListProduct {
  getProductList(): Promise<ProductAPIResponse>;
}