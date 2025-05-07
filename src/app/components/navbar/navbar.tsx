import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from "./styles/navbar.module.scss";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/deal_dock_logo.png"
            alt="DealDock Logo"
            width={120}
            height={120}
          />
        </div>
        <form className={styles.search}>
          <input id="search" name="search" type="text" placeholder="Buscar produtos..." />
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} width={14} height={14} />
          </button>
        </form>
      </div>
    </nav>
  );
}