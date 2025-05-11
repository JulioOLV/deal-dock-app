import { GetProductDetail } from "@/data/usecases/product/get-product-detail";
import { makeApiUrl } from "../http/api-url-factory";
import { makeFetchHttpClient } from "../http/fetch-http-client-factory";

export const makeGetProductDetailUseCase = (productId: string, accessToken: string) => {
  const fetchHttpClient = makeFetchHttpClient(accessToken);
  const apiUrl = makeApiUrl(`/products/${productId}`);
  return new GetProductDetail(apiUrl, fetchHttpClient);
};
