import React from 'react'
import Cards from "./Cards/Cards.jsx";
import Filters from "./Filters/Filters.jsx";
import Search from "./Search/Search.jsx";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.container2}>
        <Filters />
        <Cards />
      </div>
    </div>
  );
}