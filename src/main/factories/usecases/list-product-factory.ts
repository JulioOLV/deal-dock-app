import { ListProduct } from "@/data/usecases/product/list-product";
import { makeApiUrl } from "../http/api-url-factory";
import { makeFetchHttpClient } from "../http/fetch-http-client-factory";
import { IListProduct } from "@/domain/usecases";

export const makeListProductUseCase = (
  searchByProduct: string
): IListProduct => {
  const fetchHttpClient = makeFetchHttpClient();
  const apiUrl = makeApiUrl(
    `/products/search?site_id=MLB&status=active&q=${searchByProduct}&limit=12&offset=0`
  );
  return new ListProduct(apiUrl, fetchHttpClient);
};
