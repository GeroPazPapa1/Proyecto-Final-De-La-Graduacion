import React from 'react'
import LOGO from "./Icons/LOGO.svg";
import CART from "./Icons/CART.svg";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
    const location = useLocation();

    const loggedUserJson = localStorage.getItem("authToken");
    const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;

    const handleLogout = () => {
        localStorage.clear();
    };

    console.log("loggedUser:", loggedUser);
    console.log("loggedUser.email:", loggedUser?.email);
    return (
        <div className={styles.container}>
            <div>
                <Link to={"/"}>
                    <img className={styles.logo} src={LOGO} alt="Logo..." />
                </Link>
            </div>
            {location.pathname === "/" && !loggedUser && (
                <div className={styles.containerL}>
                    <Link to={"/login"}>
                        <button className={styles.button}>Log in</button>
                    </Link>
                    <Link to={"/register"}>
                        <button className={styles.button}>Register</button>
                    </Link>
                </div>
            )}
            {location.pathname === "/home" && (
                <><div className={styles.containerLP}>
                    <div>
                        <Link to={"/home"}>
                            <button className={styles.button}>Home</button>
                        </Link>
                        <button className={styles.button}>Contacts</button>
                    </div>
                </div>
                    <div>
                        <div className={styles.containerL}>
                            <Link to={"/favorites"}>
                                <button className={styles.button}>Favorites</button>
                            </Link>
                            {
                                loggedUser && (
                                    <>
                                    <span>{loggedUser.email}</span>
                                    <Link to={"/modification"}>
                                        <button className={styles.button} id={loggedUser.id}>Modification</button></Link>
                                    <Link to={"/home"}>
                                    <button onClick={handleLogout} className={styles.button}>Log out</button>
                                    </Link>
                                    </>
                                )
                            }
                            { !loggedUser && (
                                <>
                                <Link to={"/login"}>
                                    <button className={styles.button}>Log in</button>
                                </Link>
                                <Link to={"/register"}>
                                    <button className={styles.button}>Register</button>
                                </Link>
                                </>
                                )
                            }
                            <Link to='/cart'>
                                <img className={styles.icons} src={CART} alt="Cart..." />
                            </Link>
                        </div> 
                    </div></>
            )}
            {location.pathname === "/login" || location.pathname === "/register" && (
                null
            )}
        </div>
    );
}
