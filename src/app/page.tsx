import { cache } from "react";

import styles from "./styles/page.module.scss";
import { ProductAPIResponse } from "@/domain/models";
import { makeListProductUseCase } from "@/main/factories/usecases/list-product-factory";
import { Navbar, ProductList } from "@/ui/components";

interface SearchPageProps {
  searchParams: { product?: string };
}

export default async function Home({ searchParams }: SearchPageProps) {
  const { product: searchByProduct } = await searchParams;

  const listProductUseCase = makeListProductUseCase(searchByProduct || "smartphone");

  const getProducts = cache(
    async (): Promise<ProductAPIResponse> => {
      try {
        const httpResponse = await listProductUseCase.getProductList();
  
        return httpResponse;
      } catch (err: any) {
        throw err;
      }
    }
  );

  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <ProductList products={products} />
      </main>
      <footer className={styles.footer}>
        <p>Footer</p>
      </footer>
    </>
  );
}
