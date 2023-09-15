import React from "react";
import LOGO from "./Icons/LOGO.svg";
import CART from "./Icons/CART.svg";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NavBar() {
  const location = useLocation();
  const [user, setUser] = useState([]);
  const loggedUserJson = localStorage.getItem("authToken");
  const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;

  const handleLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const userInfoFn = async () => {
      try {
        const { data } = await axios.get(`/user/${loggedUser.response.id}`);
        setUser(data);
      } catch (error) {
        console.log(
          `The request could not be completed because of the following error: ${error.message}`
        );
      }
    };
    userInfoFn();
  }, []);

  if (location.pathname.startsWith("/admin")) {
    return null;
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
              <Link to={"/profileSettings"} className={styles.icon_name_user}>
                <img src={user.image} alt="" className={styles.iconImage} />
                {" "}
                <button className={styles.button} id={loggedUser.id}>
                  {user.name}
                </button>
              </Link>
              {loggedUser.response?.type === "admin" && (
                <Link to={"/admin/dashboard"}>
                  <button>Dashboard</button>
                </Link>
              )}
              <Link to={"/"}>
                <button onClick={handleLogout} className={styles.button}>
                  Log out
                </button>
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
                  <Link to={"/profileSettings"} className={styles.icon_name_user}>
                    <img src={user.image} alt="" className={styles.iconImage} />
                    {" "}
                    <button className={styles.button} id={loggedUser.id}>
                      {user.name}
                    </button>
                  </Link>
                  {loggedUser.response?.type === "admin" && (
                    <Link to={"/admin/dashboard"}>
                      <button className={styles.button}>Dashboard</button>
                    </Link>
                  )}
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
                  <Link to={"/profileSettings"} className={styles.icon_name_user}>
                    <img src={user.image} alt="" className={styles.iconImage} />
                    {" "}
                    <button className={styles.button} id={loggedUser.id}>
                      {user.name}
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
                  <Link to={"/profileSettings"} className={styles.icon_name_user}>
                    <img src={user.image} alt="" className={styles.iconImage} />
                    {" "}
                    <button className={styles.button} id={loggedUser.id}>
                      {user.name}
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
