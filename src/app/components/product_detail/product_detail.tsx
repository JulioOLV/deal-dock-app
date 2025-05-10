import { cache } from "react";

import styles from "./styles/product_detail.module.scss";
import { ImageSlider } from "../image_slider/image_slider";

interface ProductDetailProps {
  productId: string;
}

type Shipping = {
  mode: string;
  tags: string[];
  free_shipping: boolean;
  logistic_type: string;
  store_pick_up: boolean;
};

type SaleTermValueStruct = {
  number: number;
  unit: string;
};

type SaleTerm = {
  id: string;
  name: string;
  value_id: string | null;
  value_name: string;
  value_struct: SaleTermValueStruct | null;
};

type SellerAddress = {
  city: {
    id: string;
    name: string;
  };
  state: {
    id: string;
    name: string;
  };
};

type BuyBoxWinner = {
  item_id: string;
  category_id: string;
  seller_id: number;
  original_price?: number;
  price: number;
  currency_id: string;
  shipping: Shipping;
  warranty: string;
  condition: string;
  sale_terms: SaleTerm[];
  seller_address?: SellerAddress;
};

type ProductPickerProduct = {
  product_id: string;
  picker_label: string;
  picture_id: string;
  thumbnail: string;
  tags: string[];
  permalink: string;
  product_name: string;
  auto_completed: boolean;
};

type ProductPickerAttribute = {
  attribute_id: string;
  template: string;
};

type ProductPicker = {
  picker_id: string;
  picker_name: string;
  products: ProductPickerProduct[];
  tags: string[];
  attributes: ProductPickerAttribute[];
  value_name_delimiter: string;
};

type ProductPicture = {
  id: string;
  url: string;
  suggested_for_picker: string | null;
  max_width: number;
  max_height: number;
  source_metadata: unknown | null;
  tags: string[];
};

type ProductMainFeature = {
  text: string;
  type: string;
  metadata: Record<string, unknown>;
};

type ProductAttributeValue = {
  id: string;
  name: string;
  meta?: {
    value: boolean | string | number;
  };
};

type ProductAttribute = {
  id: string;
  name: string;
  value_id: string;
  value_name: string;
  values: ProductAttributeValue[];
  meta?: {
    value: boolean | string | number;
  };
};

type ProductShortDescription = {
  type: string;
  content: string;
};

type ProductSettings = {
  content: unknown | null;
  listing_strategy: string;
  with_enhanced_pictures: boolean;
  base_site_product_id: string | null;
  exclusive: boolean;
};

export type ProductAPIDetailResponse = {
  id: string;
  catalog_product_id: string;
  status: string;
  pdp_types: string[];
  domain_id: string;
  permalink: string;
  name: string;
  family_name: string;
  type: string;
  buy_box_winner: BuyBoxWinner | null;
  pickers: ProductPicker[];
  pictures: ProductPicture[];
  description_pictures: unknown[];
  main_features: ProductMainFeature[];
  disclaimers: unknown[];
  attributes: ProductAttribute[];
  short_description: ProductShortDescription;
  parent_id: string | null;
  user_product: unknown | null;
  children_ids: string[];
  settings: ProductSettings;
  quality_type: string;
  release_info: unknown | null;
  presale_info: unknown | null;
  enhanced_content: unknown | null;
  tags: string[];
  date_created: string;
  authorized_stores: unknown | null;
  last_updated: string;
  grouper_id: string | null;
  experiments: Record<string, unknown>;
};

const getProductDetail = cache(
  async (productId: string): Promise<ProductAPIDetailResponse> => {
    const response = await fetch(
      `https://api.mercadolibre.com/products/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer APP_USR-4177817543971930-051016-a679aa3622afb3b90ed48ae0beef3696-171802850`,
        },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    return response.json();
  }
);

export async function ProductDetail({ productId }: ProductDetailProps) {
  const product = await getProductDetail(productId);

  return (
    <>
      <div className={styles.product__detail}>
        <div className={styles.product__detail__container}>
          <div className={styles.product__image}>
            <ImageSlider
              images={product.pictures.map((picture) => picture.url)}
            />
          </div>
          
          <div className={styles.product__info}>
            <div>
              {product.buy_box_winner && (
                <span className={styles.product__info__condition}>
                  {product.buy_box_winner?.condition === "new"
                    ? "Novo"
                    : product.buy_box_winner?.condition === "used"
                    ? "Usado"
                    : "Desconhecido"}
                </span>
              )}

              <h1 className={styles.product__info__title}>
                {product.family_name}
              </h1>
            </div>

            {product.buy_box_winner && (
              <>
                {product.buy_box_winner?.shipping.free_shipping && (
                  <span className={styles.product__info__shipping}>
                    {product.buy_box_winner?.shipping.free_shipping
                      ? "Frete grátis"
                      : "Frete pago"}
                  </span>
                )}

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {product.buy_box_winner?.original_price && (
                    <span className={styles.product__info__oldprice}>
                      {product.buy_box_winner?.original_price.toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </span>
                  )}

                  {product.buy_box_winner?.price && (
                    <span className={styles.product__info__price}>
                      {product.buy_box_winner?.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {product.buy_box_winner?.sale_terms && (
                    <span>
                      Tempo de garantia:{" "}
                      <b>
                        {product.buy_box_winner?.sale_terms.find(
                          (x) => x.id === "WARRANTY_TIME"
                        )?.value_name || "Desconhecido"}
                      </b>
                    </span>
                  )}

                  {product.buy_box_winner?.seller_address && (
                    <span>
                      Localização:{" "}
                      <b>
                        {product.buy_box_winner?.seller_address.city.name ||
                          "Desconhecido"}
                      </b>
                    </span>
                  )}
                </div>
              </>
            )}

            <span>
              Cor escolhida:{" "}
              <b>
                {product.attributes.find((attr) => attr.id === "COLOR")
                  ?.value_name || "Desconhecido"}
              </b>
            </span>

            <span>
              {product.pickers.map((pattr) => (
                <span
                  key={pattr.picker_id}
                  className={styles.product__detail__picker}
                >
                  {pattr.picker_name}:
                  {pattr.products.map((x) => (
                    <span
                      key={x.product_id}
                      className={`${styles.product__detail__picker__item} ${
                        product.attributes.find(
                          (attr) => attr.id === pattr.picker_id
                        )?.value_name === x.picker_label
                          ? styles.product__detail__picker__item__selected
                          : ""
                      }`}
                    >
                      {x.picker_label}
                    </span>
                  ))}
                </span>
              ))}
            </span>

            <a
              href={product.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.product__detail__link}
            >
              <button className={styles.product__detail__button}>
                Comprar na loja
              </button>
            </a>
          </div>
        </div>

        <hr />

        <div className={styles.product__detail__description__container}>
          <h2 className={styles.product__detail__description__title}>
            Descrição do produto
          </h2>
          <div
            className={styles.product__detail__description}
            dangerouslySetInnerHTML={{
              __html: product.short_description.content,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
