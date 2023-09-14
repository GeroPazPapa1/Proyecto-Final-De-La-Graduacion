import React, { useEffect } from 'react';
import Cards from "./Cards/Cards.jsx";
import Filters from "./Filters/Filters.jsx";
import Search from "./Search/Search.jsx";
import styles from "./Home.module.css";
import { MercadoPagoFail, MercadoPagoSuccess } from '../NotiStack.jsx';

export default function Home() {
  useEffect(() => {
    const transactionStatus = localStorage.getItem('transactionStatus');
    // Comprueba el estado de la compra y muestra la notificación adecuada
    if (transactionStatus === "success") {
      MercadoPagoSuccess();
    } else if (transactionStatus === "fail") {
      MercadoPagoFail();
    }
    localStorage.removeItem('transactionStatus');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.coverImage}></div>
      <nav>
        {/* Código para la barra de navegación */}
      </nav>
      <Search />
      <div className={styles.container2}>
        <Filters />
        <Cards />
      </div>
    </div>
  );
}