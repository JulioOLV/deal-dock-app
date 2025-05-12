import React, { cache } from "react";

import { ProductAPIResponse } from "@/domain/models";
import { Navbar, ProductList, Pagination } from "@/ui/components";
import { IListProduct } from "@/domain/usecases";

import styles from "./styles/catalog.module.scss";

interface SearchPageProps {
  listProductUseCase: IListProduct;
}

export async function Catalog({ listProductUseCase }: SearchPageProps) {

  const getProducts = cache(async (): Promise<ProductAPIResponse> => {
    try {
      const httpResponse = await listProductUseCase.getProductList();

      return httpResponse;
    } catch (err) {
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