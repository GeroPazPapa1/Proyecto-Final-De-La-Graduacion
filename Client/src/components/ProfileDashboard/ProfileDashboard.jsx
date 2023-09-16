import React, { useState } from "react";
import styles from "./ProfileDashboard.module.css";
import Posts from "./Posts/Posts";
import Reviews from "./Reviews/Reviews";
import CartHistory from "./CartHistory/CartHistory";
import Modification from "../Modification/Modification";

export default function ProfileDashboard() {
  const [selectedTopic, setSelectedTopic] = useState("Cart History");

  const handleTopic = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.col1}>
          <div className={styles.topics}>
            <button
              className={
                selectedTopic === "Profile"
                  ? styles.selectedTopic
                  : styles.topic
              }
              onClick={() => handleTopic("Profile")}
            >
              <img
                src="https://img.icons8.com/ios/50/paid--v1.png"
                alt="Cart icon"
                className={styles.img}
              />
              Purchases
            </button>
            <button
              className={
                selectedTopic === "Cart History"
                  ? styles.selectedTopic
                  : styles.topic
              }
              onClick={() => handleTopic("Cart History")}
            >
              <img
                src="https://img.icons8.com/material-outlined/24/admin-settings-male.png"
                alt="Profile Icon"
                className={styles.img}
              />
              My profile
            </button>
            <button
              className={
                selectedTopic === "Reviews"
                  ? styles.selectedTopic
                  : styles.topic
              }
              onClick={() => handleTopic("Reviews")}
            >
              <img
                src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/external-rating-ecommerce-xnimrodx-lineal-xnimrodx-3.png"
                alt="Review icon"
                className={styles.img}
              />
              Reviews
            </button>
          </div>
        </div>
        <div className={styles.col2}>
          <div className={styles.col2a}>
            {selectedTopic === "Profile" && (
              <div className={styles.profile}>
                <div className={styles.carthistory}>
                  <CartHistory />
                </div>
              </div>
            )}
            {selectedTopic === "Cart History" && (
              <div className={styles.myProfile}>
                <Modification />
              </div>
            )}
            {selectedTopic === "Posts" && (
              <div className={styles.posts}>
                <Posts />
              </div>
            )}
            {selectedTopic === "Reviews" && (
              <div className={styles.reviews}>
                <Reviews />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
