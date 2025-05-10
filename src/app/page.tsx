import { Navbar, ProductList } from "./components";

import styles from "./page.module.scss";

interface SearchPageProps {
  searchParams: { product?: string }
}

export default async function Home({ searchParams }: SearchPageProps) {
  const { product: searchByProduct } = await searchParams;
  
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <ProductList product={searchByProduct} />
      </main>
      <footer className={styles.footer}>
        <p>Footer</p>
      </footer>
    </>
  );
}
