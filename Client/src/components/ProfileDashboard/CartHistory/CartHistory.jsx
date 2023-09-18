import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CartHistory.module.css";
import PurchaseCard from "./PurchaseCard";

export default function CartHistory() {
  const [purchases, setPurchases] = useState([]);
  const userId = localStorage.getItem("userId");

  const getPurchasesHandler = async (userId) => {
    try {
      const endpoint = "/buy/getByuser/";
      const { data } = await axios.get(`${endpoint}${userId}`);
      setPurchases(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      getPurchasesHandler(userId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //-----------------------------------------------------
  const [selectedOption, setSelectedOption] = useState("Date...");
  const filterPurchasesByLastWeek = () => {
    const currentDate = new Date();
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);

    const filteredPurchases = purchases.filter((purchase) => {
      const purchaseDate = new Date(purchase.createdAt);
      return purchaseDate >= lastWeekDate && purchaseDate <= currentDate;
    });

    return filteredPurchases;
  };
  const filterPurchasesByLastMonth = () => {
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

    const filteredPurchases = purchases.filter((purchase) => {
      const purchaseDate = new Date(purchase.createdAt);
      return purchaseDate >= lastMonthDate && purchaseDate <= currentDate;
    });

    return filteredPurchases;
  };
  const filterPurchasesByLastYear = () => {
    const currentDate = new Date();
    const lastYearDate = new Date();
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

    const filteredPurchases = purchases.filter((purchase) => {
      const purchaseDate = new Date(purchase.createdAt);
      return purchaseDate >= lastYearDate && purchaseDate <= currentDate;
    });

    return filteredPurchases;
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let filteredPurchases = purchases;

  if (selectedOption === "Last week") {
    filteredPurchases = filterPurchasesByLastWeek();
  } else if (selectedOption === "Last month") {
    filteredPurchases = filterPurchasesByLastMonth();
  } else if (selectedOption === "Last year") {
    filteredPurchases = filterPurchasesByLastYear();
  }

  return (
    <div className={styles.carthistory}>
      <h2 className={styles.title}>Purchases</h2>
      <select
        name=""
        id=""
        onChange={handleSelectChange}
        className={styles.select}
      >
        <option hidden={true}>Date...</option>
        <option>Last week</option>
        <option>Last month</option>
        <option>Last year</option>
      </select>
      <div className={styles.container}>
        {filteredPurchases.map((purchase) => (
          <PurchaseCard
            key={purchase.id}
            id={purchase.id}
            date={purchase.createdAt}
            price={purchase.price}
            description={purchase.description}
          />
        ))}
      </div>
    </div>
  );
}
