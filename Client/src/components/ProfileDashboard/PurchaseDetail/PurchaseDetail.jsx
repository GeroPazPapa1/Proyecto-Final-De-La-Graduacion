import React, { useState, useEffect } from "react";
import styles from "./PurchaseDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function PurchaseDetail() {
  const [cars, setCars] = useState([]);
  const { id } = useParams();

  const getCarsHandler = async (id) => {
    try {
      const endpoint = "http://localhost:3001/buy/detail/";
      const { data } = await axios.get(`${endpoint}${id}`);
      return setCars(data);
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = () => {
    return cars.reduce((total, product) => {
      const productPrice = Number(product.price); // Convert price to number
      return total + productPrice;
    }, 0);
  };
  useEffect(() => {
    getCarsHandler(id);
    console.log(cars);
  }, []);
  return (
    <>
      <div className={styles.cart}>
        <div>
          <h1 className={styles.cart_title}>Order ID: {id}</h1>
        </div>
        <div className={styles.products_detail}>
          <div className={styles.products}>
            <div className={styles.topics}>
              <h3 className={styles.topic_product}>Product</h3>
              <h3 className={styles.topic_price}>Price</h3>
            </div>
            {cars.map((product) => (
              <div className={styles.car_i} key={product.name}>
                <Link
                  className={styles.link_imgcar}
                  to={`/detail/${product.id}`}
                >
                  {product.image && product.image[0] && (
                    <img
                      className={styles.car_img}
                      src={product.image[0]}
                      alt="imagen"
                    />
                  )}
                </Link>
                <div className={styles.name_and_brand}>
                  <p>
                    {product.name} {product.model}
                    <br />
                    {product.brand}{" "}
                  </p>
                </div>
                <div className={styles.price}>
                  <h4 className={styles.car_price}>${Number(product.price)}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.detail_info}>
            <p className={styles.subtotal}>Subtotal: ${totalPrice()} USD</p>
          </div>
        </div>
      </div>
    </>
  );
}
