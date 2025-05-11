"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles/navbar.module.scss";
import { emitter } from "@/infra/event/mitt/event-bus";

export const Navbar = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/?product=${search}&offset=0`);
    emitter.emit("product-search-editted", search);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/deal_dock_logo.png"
            alt="DealDock Logo"
            width={120}
            height={120}
            priority
          />
        </div>
        <form className={styles.search} onSubmit={handleSearch}>
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} width={14} height={14} />
          </button>
        </form>
      </div>
    </nav>
  );
};
