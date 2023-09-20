import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getDashboard, usersLoadedTrue } from "../../Redux/actions";
import styles from "./Dashboard.module.css";
import SETTING from "./Icons/SETTING.svg";
import DashBoardEmail from "./Emails/Emails";
import SearchBarDashboard from "./SearchBar/SearchBar";
import Filters from "./Filters/Filters";

export default function Dashboard() {
    const [selectedTab, setSelectedTab] = useState("USERS");

    const location = useLocation();
    const dispatch = useDispatch();

    const usersLoaded = useSelector((state) => state.usersLoaded);

    const loggedUserJson = localStorage.getItem("authToken");
    const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    }

    const handleLogout = () => {
        localStorage.clear();
    };

    useEffect(() => {
        const handleChargedUsers = async () => {
            if (
                location.pathname === "/admin/dashboard" &&
                loggedUser &&
                loggedUser.response &&
                loggedUser.response.type === "admin"
            ) {
                // Verifica si los usuarios ya están cargados o no
                if (!usersLoaded) {
                    try {
                        // Realiza la solicitud y carga los usuarios
                        await dispatch(usersLoadedTrue());
                        await dispatch(getDashboard(loggedUser));
                    } catch (error) {
                        console.error("Error al obtener los usuarios:", error);
                    }
                }
            }
        };

        handleChargedUsers(); // Llama a la función para cargar los usuarios
    }, [dispatch, location.pathname, loggedUser, usersLoaded]);

    return (
        <div>
            {location.pathname === "/admin/dashboard" && (
                <div>
                    {!loggedUser ? (
                        <>
                            <div className={styles.notAccess}>
                                <div>
                                    <div>
                                        <h2>You must log in and be an <br />Administrator to access here</h2>
                                    </div>
                                    <div>
                                        <Link to="/home">
                                            <button>GO HOME</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : loggedUser.response.type === "admin" ? (
                        // Aquí puedes agregar el contenido que se mostrará para los usuarios admin
                        <>
                            <div className={styles.containerP}>
                                <div className={styles.containerLeft}>
                                    <div className={styles.adminTools}>
                                        <h2>Admin <br />Tools</h2>
                                        <img className={styles.img} src={SETTING} alt="Setting..." />
                                    </div>
                                    <div>
                                        <>
                                            <button onClick={() => handleTabChange("USERS")}>USERS</button>
                                            <button onClick={() => handleTabChange("SALES")}>SALES</button>
                                            <Link to={"/home"}>
                                                <button>HOME</button>
                                            </Link>
                                            <Link to={"/login"}>
                                                <button onClick={handleLogout}>LOGOUT</button>
                                            </Link>
                                        </>
                                    </div>
                                </div>
                                <div className={styles.containerRight}>
                                    <div className={styles.stateUp}>
                                        <h2>{selectedTab}</h2>
                                    </div>
                                    <div className={styles.hello}>
                                        <h2>DashBoard</h2>
                                    </div>
                                    <div>
                                        <SearchBarDashboard />
                                        <Filters />
                                    </div>
                                    <div>{selectedTab === "USERS" && (
                                        <div className={styles.DashboardUser}>
                                            <DashBoardEmail />
                                        </div>
                                    )
                                    }
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Agrega el contenido que se mostrará para los usuarios no admin aquí
                        <>
                            <div className={styles.notAccess}>
                                <div>
                                    <div>
                                        <h2>You must be an administrator <br /> to access these functions</h2>
                                    </div>
                                    <div>
                                        <Link to="/home">
                                            <button>GO HOME</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
