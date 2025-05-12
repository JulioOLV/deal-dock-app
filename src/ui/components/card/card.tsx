"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { ImageSlider } from "..";

import styles from "./styles/card.module.scss";

type CardProps = {
  id: string;
  brand: string;
  title: string;
  images: string[];
}

export const Card = ({ id, brand, title, images }: CardProps) => {
  const route = useRouter();

  const handleClick = (id: string) => {
    route.push(`/product/${id}`);
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <ImageSlider images={images} />
      </div>
      <div className={styles.card__details} onClick={() => handleClick(id)}>
        <span className={styles.card__brand}>{brand}</span>
        <h3 className={styles.card__title}>{title}</h3>
      </div>
    </div>
  )
}