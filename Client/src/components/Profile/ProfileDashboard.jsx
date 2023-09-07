import React, { useState } from "react";
import styles from './ProfileDashboard.module.css'
import Profile from './Profile/Profile'
import Config from './Config/Config'
import Posts from './Posts/Posts'
import Reviews from './Reviews/Reviews'
import CartHistory from './CartHistory/CartHistory'

export default function ProfileDashboard() {
    const [selectedTopic, setSelectedTopic] = useState("Profile")

    const handleTopic = (topic) => {
        setSelectedTopic(topic)
    }

    return (
        <>
            <div className={styles.profile}>
                <div className={styles.col1}>
                    <div className={styles.topics}>
                        <button
                            className={selectedTopic === "Profile" ? styles.selectedTitle : styles.title}
                            onClick={() => handleTopic("Profile")}
                        >
                            Profile
                        </button>
                        <button
                            className={selectedTopic === "Cart History" ? styles.selectedTitle : styles.title}
                            onClick={() => handleTopic("Cart History")}
                        >
                            Cart History
                        </button>
                        <button
                            className={selectedTopic === "Posts" ? styles.selectedTitle : styles.title}
                            onClick={() => handleTopic("Posts")}
                        >
                            Posts
                        </button>
                        <button
                            className={selectedTopic === "Reviews" ? styles.selectedTitle : styles.title}
                            onClick={() => handleTopic("Reviews")}
                        >
                            Reviews
                        </button>
                        <button
                            className={selectedTopic === "Config" ? styles.selectedTitle : styles.title}
                            onClick={() => handleTopic("Config")}
                        >
                            Config
                        </button>
                    </div>
                </div>
                <div className={styles.col2}>
                    <div className={styles.col2a}>
                        <h1 className={styles.title}>No</h1>
                        <h1 className={styles.title}>Se</h1>
                        <h1 className={styles.title}>Que</h1>
                        <h1 className={styles.title}>Poner</h1>
                        <h1 className={styles.title}>Aca</h1>
                    </div>
                    <div className={styles.col2b}>
                        {selectedTopic === "Profile" && (
                            <div className={styles.profile}>
                                <Profile />
                            </div>
                        )}
                        {selectedTopic === "Cart History" && (
                            <div className={styles.carthistory}>
                                <CartHistory />
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
                        {selectedTopic === "Config" && (
                            <div className={styles.config}>
                                <Config />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}