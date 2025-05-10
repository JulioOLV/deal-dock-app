import { Navbar, ProductList } from "./components";

import styles from "./page.module.scss";

interface SearchPageProps {
  searchParams: { product?: string }
}

export default async function Home({ searchParams }: SearchPageProps) {
  const product = searchParams.product || "";
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <ProductList product={product} />
      </main>
      <footer className={styles.footer}>
        <p>Doidera e doideria</p>
      </footer>
    </>
  );
}
