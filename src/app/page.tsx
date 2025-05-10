import { Navbar, ProductList } from "./components";

import styles from "./page.module.scss";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <ProductList />
      </main>
      <footer className={styles.footer}>
        <p>Doidera e doideria</p>
      </footer>
    </>
  );
}
