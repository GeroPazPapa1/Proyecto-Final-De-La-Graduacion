import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CartHistory.module.css";
import PurchaseCard from "./PurchaseCard";

export default function CartHistory() {
  const [purchases, setPurchases] = useState([]);
  const userId = localStorage.getItem("userId");

  const getPurchasesHandler = async (userId) => {
    try {
      const endpoint = "http://localhost:3001/buy/getByuser/";
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

  return (
    <div className={styles.carthistory}>
      <h2>Shopping history</h2>
      <select name="" id="">
        <option hidden={true}>Date...</option>
        <option>Last week</option>
        <option>Last month</option>
        <option>Last year</option>
      </select>
      <div className={styles.titleContainer}>
        <div className={styles.emptyContainer}></div>
        <div className={styles.h6Container}>
          <h6>Price</h6>
        </div>
        <div className={styles.h6Container}>
          <h6>Date</h6>
        </div>
      </div>
      <div className={styles.container}>
        {purchases.map((purchase) => (
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
