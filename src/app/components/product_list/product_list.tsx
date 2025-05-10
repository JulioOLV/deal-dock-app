import { cache } from "react";

import { Card } from "../card/card";

import styles from "./styles/product_list.module.scss";

type ProductAttribute = {
  id: string;
  name: string;
  value_id?: string;
  value_name: string;
};

type ProductPicture = {
  id: string;
  url: string;
};

type ProductSettings = {
  listing_strategy: string;
  exclusive: boolean;
};

type ProductResultItem = {
  id: string;
  date_created: string;
  catalog_product_id: string;
  pdp_types: string[];
  status: string;
  domain_id: string;
  settings: ProductSettings;
  name: string;
  main_features: string[];
  attributes: ProductAttribute[];
  pictures: ProductPicture[];
  parent_id?: string;
  children_ids: string[];
  quality_type: string;
  priority: string;
  type: string;
  site_id: string;
  variations: string[];
  keywords: string;
  description: string;
};

type Paging = {
  total: number;
  limit: number;
  offset: number;
};

type UsedAttribute = {
  id: string;
  name: string;
  value_id?: string;
  value_name: string;
};

export type ProductAPIResponse = {
  keywords: string;
  domain_id: string;
  paging: Paging;
  results: ProductResultItem[];
  used_attributes: UsedAttribute[];
  query_type: string;
};

const getProducts = cache(
  async (product: string = "smartphone"): Promise<ProductAPIResponse> => {
    const res = await fetch(
      `https://api.mercadolibre.com/products/search?site_id=MLB&status=active&q=${
        product || "smartphone"
      }&limit=12&offset=0`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer APP_USR-4177817543971930-051010-7486b9231402c2f2f090d369e297a877-171802850`,
        },
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
);

export const ProductList = async ({
  product,
}: {
  product: string | undefined;
}) => {
  const products = await getProducts(product);

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
};
