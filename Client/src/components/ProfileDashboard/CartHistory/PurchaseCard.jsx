import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./PurchaseCard.module.css";

export default function Card(props) {
  const { id, date, description, price } = props;

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className={styles.mainContainer}>
      <Link to={`/purchaseDetail/${id}`}>
        <div className={styles.infoContainer}>
          <div className={styles.h2Container}>
            <h2>Order id: {id} </h2>
          </div>
          <div className={styles.flexContainer}>
            <div className={styles.descriptionContainer}>{description}</div>
            <div className={styles.priceContainer}>
              $ {formatPrice(price)} USD{" "}
            </div>
            <div className={styles.dateContainer}>{date}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
