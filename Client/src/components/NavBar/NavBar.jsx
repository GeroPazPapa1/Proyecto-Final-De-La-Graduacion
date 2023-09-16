import React from "react";
import LOGO from "./Icons/LOGO.svg";
import CART from "./Icons/CART.svg";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { logOut } from '../NotiStack'

export default function NavBar() {
  const location = useLocation();
  const [user, setUser] = useState([]);
  // const user = useSelector((state) => )
  const loggedUserJson = localStorage.getItem("authToken");
  const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;


  if (location.pathname.startsWith("/admin")) {
    return null;
  }
  
  const handleLogout = () => {
    localStorage.clear();
    logOut();
  };

  useEffect(() => {
    const userInfoFn = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/user/${loggedUser.response.id}`);
        setUser(data);
      } catch (error) {
        console.log(`The request could not be completed because of the following error: ${error.message}`);
      }
    }
    userInfoFn();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <Link to={"/"}>
          <img className={styles.logo} src={LOGO} alt="Logo..." />
        </Link>
      </div>
      {location.pathname === "/" && !loggedUser && (
        <div className={styles.containerL}>
          {!loggedUser ? (
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
              <p>Welcome {loggedUser.name}</p>
              {loggedUser.response?.type === "admin" && (
                <Link to={"/admin/dashboard"}>
                  <button>Dashboard</button>
                </Link>
              )}
              <Link to="/">
                <button onClick={handleLogout}>Logout</button>
              </Link>
            </>
          )}
        </div>
      )}
      {location.pathname === "/home" && (
        <>
          <div className={styles.containerLP}>
            <div>
              <Link to={"/home"}>
                <button className={styles.button}>Home</button>
              </Link>
              <button className={styles.button}>Contacts</button>
              <Link to={"/favorites"}>
                <button className={styles.button}>Favorites</button>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.containerL}>
              {loggedUser && (
                <>
                  <img src={user.image} alt="" className={styles.iconImage} />
                  <Link to={"/profile"}>
                    {" "}
                    <span className={styles.name}>{user.name}</span>
                  </Link>
                  {loggedUser.response?.type === "admin" && (
                    <Link to={"/admin/dashboard"}>
                      <button className={styles.button}>Dashboard</button>
                    </Link>
                  )}
                  <Link to={"/profileSettings"}>
                    <button className={styles.button} id={loggedUser.id}>
                      Edit Profile
                    </button>
                  </Link>
                  <Link to={"/"}>
                    <button onClick={handleLogout} className={styles.button}>
                      Log out
                    </button>
                  </Link>
                </>
              )}
              {!loggedUser && (
                <>
                  <Link to={"/login"}>
                    <button className={styles.button}>Log in</button>
                  </Link>
                  <Link to={"/register"}>
                    <button className={styles.button}>Register</button>
                  </Link>
                </>
              )}
              <Link to="/cart">
                <img className={styles.icons} src={CART} alt="Cart..." />
              </Link>
            </div>
          </div>
        </>
      )}
      {location.pathname === "/cart" && (
        <>
          <div className={styles.containerLP}>
            <div>
              <Link to={"/home"}>
                <button className={styles.button}>Home</button>
              </Link>
              <button className={styles.button}>Contacts</button>
              <Link to={"/favorites"}>
                <button className={styles.button}>Favorites</button>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.containerL}>
              {loggedUser && (
                <>
                  <span>{loggedUser.email}</span>
                  {loggedUser.response?.type === "admin" && (
                    <Link to={"/admin/dashboard"}>
                      <button>Dashboard</button>
                    </Link>
                  )}
                  <Link to={"/profileSettings"}>
                    <button className={styles.button} id={loggedUser.id}>
                      Edit Profile
                    </button>
                  </Link>
                  <Link to={"/"}>
                    <button onClick={handleLogout} className={styles.button}>
                      Log out
                    </button>
                  </Link>
                </>
              )}
              {!loggedUser && (
                <>
                  <Link to={"/login"}>
                    <button className={styles.button}>Log in</button>
                  </Link>
                  <Link to={"/register"}>
                    <button className={styles.button}>Register</button>
                  </Link>
                </>
              )}
              <Link to="/cart">
                <img className={styles.icons} src={CART} alt="Cart..." />
              </Link>
            </div>
          </div>
        </>
      )}
      {location.pathname.startsWith("/detail/") && (
        <>
          <div className={styles.containerLP}>
            <div>
              <Link to={"/home"}>
                <button className={styles.button}>Home</button>
              </Link>
              <button className={styles.button}>Contacts</button>
            </div>
          </div>
          <div>
            <div className={styles.containerL}>
              {loggedUser && (
                <>
                  <span>{loggedUser.email}</span>
                  {loggedUser.response?.type === "admin" && (
                    <Link to={"/admin/dashboard"}>
                      <button>Dashboard</button>
                    </Link>
                  )}
                  <Link to={"/profileSettings"}>
                    <button className={styles.button} id={loggedUser.id}>
                      Edit Profile My profile
                    </button>
                  </Link>
                  <Link to={"/"}>
                    <button onClick={handleLogout} className={styles.button}>
                      Log out
                    </button>
                  </Link>
                </>
              )}
              {!loggedUser && (
                <>
                  <Link to={"/login"}>
                    <button className={styles.button}>Log in</button>
                  </Link>
                  <Link to={"/register"}>
                    <button className={styles.button}>Register</button>
                  </Link>
                </>
              )}
              <Link to="/cart">
                <img className={styles.icons} src={CART} alt="Cart..." />
              </Link>
            </div>
          </div>
        </>
      )}
      {location.pathname === "/login" ||
        (location.pathname === "/register" && null)}
    </div>
  );
}
