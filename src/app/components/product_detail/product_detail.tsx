import styles from "./styles/product_detail.module.scss";
import { ImageSlider } from "../image_slider/image_slider";
import { ProductAPIDetailResponse } from "@/domain/models/product-detail-model";

interface ProductDetailProps {
  product: ProductAPIDetailResponse;
}

export async function ProductDetail({ product }: ProductDetailProps) {
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

            {product.pickers && product.pickers.length > 0 && (
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
            )}

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
