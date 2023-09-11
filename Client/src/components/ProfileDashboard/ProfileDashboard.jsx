import React, { useState } from "react";
import styles from './ProfileDashboard.module.css'
import Profile from './Profile/Profile'
import Posts from './Posts/Posts'
import Reviews from './Reviews/Reviews'
import CartHistory from './CartHistory/CartHistory'

export default function ProfileDashboard() {
    const [selectedTopic, setSelectedTopic] = useState("Cart History")

    const handleTopic = (topic) => {
        setSelectedTopic(topic)
    }

    return (
        <>
            <div className={styles.profile}>
                <div className={styles.col1}>
                    <div className={styles.topics}>
                        <button
                            className={selectedTopic === "Profile" ? styles.selectedTopic : styles.topic}
                            onClick={() => handleTopic("Profile")}
                        >
                            Profile
                        </button>
                        <button
                            className={selectedTopic === "Cart History" ? styles.selectedTopic : styles.topic}
                            onClick={() => handleTopic("Cart History")}
                        >
                            Cart History
                        </button>
                        <button
                            className={selectedTopic === "Posts" ? styles.selectedTopic : styles.topic}
                            onClick={() => handleTopic("Posts")}
                        >
                            Posts
                        </button>
                        <button
                            className={selectedTopic === "Reviews" ? styles.selectedTopic : styles.topic}
                            onClick={() => handleTopic("Reviews")}
                        >
                            Reviews
                        </button>
                    </div>
                </div>
                <div className={styles.col2}>
                    <div className={styles.col2a}>
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
                    </div>
                </div>
            </div>
        </>
    )
}