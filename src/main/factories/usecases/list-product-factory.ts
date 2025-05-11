import { ListProduct } from "@/data/usecases/product/list-product";
import { makeApiUrl } from "../http/api-url-factory";
import { makeFetchHttpClient } from "../http/fetch-http-client-factory";
import { IListProduct } from "@/domain/usecases";

export const makeListProductUseCase = (
  searchByProduct: string,
  offset: number = 0,
): IListProduct => {
  const fetchHttpClient = makeFetchHttpClient();
  const apiUrl = makeApiUrl(
    `/products/search?site_id=MLB&status=active&q=${searchByProduct}&limit=${process.env.API_LIMIT}&offset=${offset}`,
  );
  return new ListProduct(apiUrl, fetchHttpClient);
};
