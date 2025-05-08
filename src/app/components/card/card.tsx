import { ImageSlider } from "..";

import styles from "./styles/card.module.scss";

export const Card = () => {
  return (
    <div className={styles.card}>
      <ImageSlider images={["/deal_dock_logo.png", "/deal_dock_logo.png", "/deal_dock_logo.png"]} />
      <div className={styles.card__details}>
        <span className={styles.card__brand}>MOTOROLA</span>
        <h3 className={styles.card__title}>Smartphone Moto G75 5g 256gb Vegan Leather Cor Cinza Motorola</h3>
      </div>
    </div>
  )
}