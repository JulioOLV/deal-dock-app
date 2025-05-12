"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import styles from "./styles/pagination.module.scss";
import { emitter } from "@/infra/event/mitt/event-bus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  productsLength: number;
}

export function Pagination({ productsLength }: PaginationProps) {
  const router = useRouter();

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    emitter.on("product-search-editted", () => {
      setOffset(0);
    });

    return () => {
      emitter.off("product-search-editted", () => {
        setOffset(0);
      });
    };
  });

  const handleOffset = (offset: number) => {
    const queryParams = window.location.search.split("?")[1];
    const searchByProduct =
      queryParams &&
      queryParams
        .split("&")
        .find((queryParams) => queryParams.startsWith("product"));

    setOffset(offset);

    if (
      searchByProduct !== undefined &&
      searchByProduct !== null &&
      searchByProduct !== "undefined"
    ) {
      router.push(`/?${searchByProduct}&offset=${offset}`);
    } else {
      router.push(`/?offset=${offset}`);
    }
  };

  return (
    <div className={styles.pagination__container}>
      <button
        className={styles.pagination__button}
        onClick={() => handleOffset(offset - 1)}
        disabled={offset === 0}
      >
        <FontAwesomeIcon icon={faCircleLeft} />
      </button>
      <button
        className={styles.pagination__button}
        onClick={() => handleOffset(offset + 1)}
        disabled={productsLength < 12}
      >
        <FontAwesomeIcon icon={faCircleRight} />
      </button>
    </div>
  );
}
