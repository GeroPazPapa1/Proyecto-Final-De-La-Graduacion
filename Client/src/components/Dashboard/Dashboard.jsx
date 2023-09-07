import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getDashboard, usersLoadedTrue } from "../../Redux/actions";

export default function Dashboard() {
    const userInfo = JSON.parse(localStorage.getItem("authToken"));
    const location = useLocation();
    const dispatch = useDispatch();

    const usersLoaded = useSelector((state) => state.usersLoaded);

    useEffect(() => {
        const handleChargedUsers = async () => {
            if (location.pathname === "/user/dashboard") {
                // Verifica si los usuarios ya están cargados o no
                if (!usersLoaded) {
                    try {
                        // Realiza la solicitud y carga los usuarios
                        await dispatch(getDashboard(userInfo));
                        await dispatch(usersLoadedTrue());
                    } catch (error) {
                        console.error("Error al obtener los usuarios:", error);
                    }
                }
            }
        };

        handleChargedUsers(); // Llama a la función para cargar los usuarios
    }, [dispatch, location.pathname, userInfo, usersLoaded]);

    return (
        <div>
            {location.pathname === "/user/dashboard" && (
                <div>
                    {!userInfo ? (
                        <>
                            <h2>You must log in and be an Administrator to access here</h2>
                            <Link to="/home">
                                <button>Come Home</button>
                            </Link>
                        </>
                    ) : userInfo.type === "admin" ? (
                        // Aquí puedes agregar el contenido que se mostrará para los usuarios admin
                        <>
                            <h2>Welcome, Admin!</h2>
                            {/* Agrega más contenido aquí para los usuarios admin */}
                        </>
                    ) : (
                        // Agrega el contenido que se mostrará para los usuarios no admin aquí
                        <>
                            <h2>You must be an administrator to access these functions</h2>
                            <Link to="/home">
                                <button>Come Home</button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
