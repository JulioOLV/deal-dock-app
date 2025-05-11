import { cache } from "react";

import styles from "./styles/page.module.scss";
import { ProductAPIResponse } from "@/domain/models";
import { makeListProductUseCase } from "@/main/factories/usecases/list-product-factory";
import { Navbar, Pagination, ProductList } from "@/ui/components";
import { makeRefreshTokenUseCase } from "@/main/factories/usecases/refresh-token-factory";

interface SearchPageProps {
  searchParams: { product?: string; offset?: number };
}

export default async function Home({ searchParams }: SearchPageProps) {
  const { product: searchByProduct, offset } = await searchParams;

  // Use expires_in to check if the token is expired
  const refreshTokenUseCase = makeRefreshTokenUseCase();
  const token = await refreshTokenUseCase.getToken();

  const listProductUseCase = makeListProductUseCase(
    searchByProduct || "smartphone",
    offset || 0,
    token.access_token
  );
  const getProducts = cache(async (): Promise<ProductAPIResponse> => {
    try {
      const httpResponse = await listProductUseCase.getProductList();

      return httpResponse;
    } catch (err: any) {
      throw err;
    }
  });

  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <ProductList products={products} />
      </main>
      <footer className={styles.footer}>
        <Pagination productsLength={products.results.length} />
      </footer>
    </>
  );
}
