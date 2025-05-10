import { ImageSlider } from "..";

import styles from "./styles/card.module.scss";

type CardProps = {
  id: string;
  brand: string;
  title: string;
  images: string[];
}

export const Card = ({ id, brand, title, images }: CardProps) => {
  return (
    <div className={styles.card}>
      <ImageSlider images={images} />
      <div className={styles.card__details}>
        <span className={styles.card__brand}>{brand}</span>
        <h3 className={styles.card__title}>{title}</h3>
      </div>
    </div>
  )
}