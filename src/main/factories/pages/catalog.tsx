import { Catalog } from "@/ui/pages/catalog/catalog";
import { makeRefreshTokenUseCase } from "../usecases/refresh-token-factory";
import { makeListProductUseCase } from "../usecases/list-product-factory";

interface SearchPageProps {
  searchParams: Promise<any>;
}

export const makeCatalogPage = async (context: SearchPageProps) => {
  const { product: searchByProduct, offset } = await context.searchParams;

  // Use expires_in to check if the token is expired
  const refreshTokenUseCase = makeRefreshTokenUseCase();
  const token = await refreshTokenUseCase.getToken();

  const listProductUseCase = makeListProductUseCase(
    searchByProduct || "smartphone",
    offset || 0,
    token.access_token
  );

  return (
    <Catalog
      listProductUseCase={listProductUseCase}
    />
  );
};
