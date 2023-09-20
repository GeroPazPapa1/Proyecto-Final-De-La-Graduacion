import React, { useEffect, useState } from "react";
import Cards from "./Cards/Cards.jsx";
import Filters from "./Filters/Filters.jsx";
import Search from "./Search/Search.jsx";
import styles from "./Home.module.css";
import { MercadoPagoFail, MercadoPagoSuccess } from "../NotiStack.jsx";
import axios from "axios";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const transactionStatus = localStorage.getItem("transactionStatus");
    // Comprueba el estado de la compra y muestra la notificación adecuada
    if (transactionStatus === "success") {
      MercadoPagoSuccess();
      const subPrice = localStorage.getItem("subPrice");
      const purshasedCars = localStorage.getItem("purshasedCars");
      const userId = localStorage.getItem("userId");
      const purchasedProductsName = localStorage.getItem(
        "purchasedProductsName"
      );
      try {
        const response = axios.post("/buy/create", {
          userId: userId,
          carsId: purshasedCars,
          price: subPrice,
          description: purchasedProductsName,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (transactionStatus === "fail") {
      MercadoPagoFail();
    }
    localStorage.removeItem("transactionStatus");
    localStorage.removeItem("subPrice");
    localStorage.removeItem("purshasedCars");
    localStorage.removeItem("cart");
  }, []);

  const handleModeChange = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode");
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ""}`}>
      <div className={styles.coverImage}></div>
      <nav>
        {/* Código para la barra de navegación */}
        <label className={`${styles.switch} ${styles.switchRight}`}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleModeChange}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </nav>
      <Search />
      <div className={styles.container2}>
        <Filters />
        <Cards />
      </div>
    </div>
  );
}
