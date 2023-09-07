import React from 'react'
import LOGO from "./Icons/LOGO.svg";
import CART from "./Icons/CART.svg";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserId, setUserType } from '../../Redux/actions';

export default function NavBar() {
    const location = useLocation();

    const userInfo = JSON.parse(localStorage.getItem("authToken"));

    const Logout = async () => {
        localStorage.removeItem("authToken"); //Elimina el Token de autenticación de localStorage

        //Restablece los datos el usuario en el estado
        useDispatch(setUserId(null));
        useDispatch(setUserType(null));

        window.location.reload(); //Recarga la página
    }

    const handleLogout = () => {
        Logout();
    }

    return (
        <div className={styles.container}>
            <div>
                <Link to={"/"}>
                    <img className={styles.logo} src={LOGO} alt="Logo..." />
                </Link>
            </div>
            {location.pathname === "/" && (
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
                    </div></>
            )}
            {location.pathname === "/login" || location.pathname === "/register" && (
                null
            )}
        </div>
    );
}
