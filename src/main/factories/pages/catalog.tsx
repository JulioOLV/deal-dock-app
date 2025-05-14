import { Catalog } from "@/ui/pages/catalog/catalog";
import { makeListProductUseCase } from "../usecases/list-product-factory";
import { authProvider } from "@/infra/store/auth-provider";

interface SearchPageProps {
  searchParams: Promise<any>;
}

export const makeCatalogPage = async (context: SearchPageProps) => {
  const { product: searchByProduct, offset } = await context.searchParams;
  const token = await authProvider();

  const listProductUseCase = makeListProductUseCase(
    searchByProduct || "smartphone",
    offset || 0,
    token,
  );

  return (
    <Catalog
      listProductUseCase={listProductUseCase}
    />
  );
};
