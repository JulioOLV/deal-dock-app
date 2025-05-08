import { Navbar, Card } from "./components";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Card />
      </main>
      <footer className={styles.footer}>
        <p>Doidera e doideria</p>
      </footer>
    </>
  );
}
