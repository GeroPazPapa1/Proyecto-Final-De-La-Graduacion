import React from 'react'
import LOGO from "./Icons/LOGO.svg";
import CART from "./Icons/CART.svg";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserId, setUserType } from '../../Redux/actions';

export default function NavBar() {
    const location = useLocation();

    return (
        <div className={styles.container}>
            <div>
                <Link to={"/"}>
                    <img className={styles.logo} src={LOGO} alt="Logo..." />
                </Link>
            </div>
            {location.pathname === "/" && !loggedUser && (
                <div className={styles.containerL}>
                    {!userInfo ? (
                        <>
                            <Link to={"/login"}>
                                <button className={styles.button}>Log in</button>
                            </Link>
                            <Link to={"/register"}>
                                <button className={styles.button}>Register</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <p>Welcome {userInfo.name}</p>
                            {userInfo.type === "admin" && (
                                <button>Dashboard</button>
                            )}
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    )}
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
                            {!userInfo ? (
                                <>
                                    <Link to={"/favorites"}>
                                        <button className={styles.button}>Favorites</button>
                                    </Link>
                                    <Link to={"/login"}>
                                        <button className={styles.button}>Log in</button>
                                    </Link>
                                    <Link to={"/register"}>
                                        <button className={styles.button}>Register</button>
                                    </Link>
                                    <Link to='/cart'>
                                        <img className={styles.icons} src={CART} alt="Cart..." />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to={"/favorites"}>
                                        <button className={styles.button}>Favorites</button>
                                    </Link>
                                    <p>Welcome {userInfo.name}</p>
                                    {userInfo.type === "admin" && (
                                        <button>Dashboard</button>
                                    )}
                                    <button onClick={handleLogout}>Logout</button>
                                    <Link to='/cart'>
                                        <img className={styles.icons} src={CART} alt="Cart..." />
                                    </Link>
                                </>
                            )}
                        </div>
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
