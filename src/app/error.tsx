"use client";

import { useEffect } from "react";

import styles from "./styles/error.module.scss";
import { Navbar } from "@/ui/components";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main>
        <div className={styles.home__error__container}>
          <h2>Algo deu errado!</h2>
          <button
            className={styles.home__error__button}
            onClick={
              () => reset()
            }
          >
            Tentar novamente
          </button>
        </div>
      </main>
    </>
  );
}
