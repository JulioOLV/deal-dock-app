import styles from "./page.module.scss";
import { Navbar } from "./components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <p>Próximos conteúdos aqui...</p>
      </main>
      <footer className={styles.footer}>
        <p>Doidera e doideria</p>
      </footer>
    </>
  );
}
