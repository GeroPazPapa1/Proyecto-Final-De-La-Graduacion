import React, { useState, useEffect } from 'react'
import styles from './Posts.module.css'
import axios from 'axios';
import NOTCARS from "../../Cart/Icons/NOTCARS.png";
import { Link } from 'react-router-dom';


export default function Posts() {
    const [posts, setPosts] = useState([])
    const loggedUserJson = localStorage.getItem("authToken");
    const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;
    const userId = loggedUser?.response?.id
    const getPosts = async (userId) => {
        try {
            const endpoint = "/car/user/";
            const { data } = await axios.get(`${endpoint}${userId}`);
            setPosts(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        try {
            getPosts(userId);
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <div>
            {posts.length > 0 ?
                <div className={styles.posts}>
                    <h2 className={styles.post_title}>Your Posts</h2>
                    {posts.map((car, index) => (
                        <img style={{ width: 60 }} src={car.image[0]} key={index} />
                    ))}
                </div>
                :
                <div className={styles.noposts}>
                    <h1 className={styles.post_title}>Your Posts</h1>
                    <div className={styles.notPosts}>
                        <div>
                            <img src={NOTCARS} alt="Not Cars..." />
                        </div>
                        <div>
                            <h2>No posts yet!</h2>
                            <p>Publish your car to show it on our catalogue</p>
                            <Link to="/publish-your-car" className={styles.publish}>
                                <button>
                                    Publish
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}