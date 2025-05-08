// components/ImageSlider.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./styles/image_slider.module.scss";

type Props = {
  images: string[];
};

export const ImageSlider = ({ images }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);

  }, [emblaApi, scrollNext, onSelect]);

  return (
    <div className={styles.slider}>
      <div className={styles.slider__viewport} ref={emblaRef}>
        <div className={styles.slider__container}>
          {images.map((src, index) => (
            <div className={styles.slider__slide} key={index}>
              <img
                src={src}
                alt={`Slide ${index}`}
                className={styles.slider__image}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${styles.slider__button} ${styles.slider__buttonPrev}`}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        ‹
      </button>
      <button
        className={`${styles.slider__button} ${styles.slider__buttonNext}`}
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        ›
      </button>
    </div>
  );
};
