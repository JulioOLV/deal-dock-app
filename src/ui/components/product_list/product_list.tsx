import React from "react";

import { Card } from "../card/card";

import styles from "./styles/product_list.module.scss";
import { ProductAPIResponse } from "@/domain/models";

interface ProductListProps {
  products: ProductAPIResponse;
}

export async function ProductList({ products }: ProductListProps) {
  return (
    <div className={styles.product_list}>
      {products.results.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          title={product.name}
          images={product.pictures.map((picture) => picture.url)}
          brand={
            product.attributes.find((attr) => attr.id === "BRAND")
              ?.value_name || "Desconhecido"
          }
        />
      ))}
    </div>
  );
}
