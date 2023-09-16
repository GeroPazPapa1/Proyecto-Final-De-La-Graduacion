import React, { useState, useEffect } from "react";
import styles from "./ProfileDashboard.module.css";
import Posts from "./Posts/Posts";
import Reviews from "./Reviews/Reviews";
import CartHistory from "./CartHistory/CartHistory";
import Modification from "../Modification/Modification";
import { useSelector } from "react-redux";

export default function ProfileDashboard() {
  const [selectedTopic, setSelectedTopic] = useState("Purchases");

  const handleTopic = (topic) => {
    setSelectedTopic(topic);
  };
  let menuOption = useSelector((state) => state.menuOption);
  useEffect(() => {
    if (!menuOption) {
      menuOption = "Profile";
      handleTopic(menuOption);
    }
    handleTopic(menuOption);
  }, []);
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.col1}>
          <div className={styles.topics}>
            <button
              className={
                selectedTopic === "Purchases"
                  ? styles.selectedTopic
                  : styles.topic
              }
              onClick={() => handleTopic("Purchases")}
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
                selectedTopic === "Profile"
                  ? styles.selectedTopic
                  : styles.topic
              }
              onClick={() => handleTopic("Profile")}
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
            {selectedTopic === "Purchases" && (
              <div className={styles.profile}>
                <div className={styles.carthistory}>
                  <CartHistory />
                </div>
              </div>
            )}
            {selectedTopic === "Profile" && (
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
