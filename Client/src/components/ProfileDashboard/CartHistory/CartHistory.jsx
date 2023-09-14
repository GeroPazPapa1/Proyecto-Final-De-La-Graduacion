import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CartHistory.module.css';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function CartHistory() {
    // const [compras, setCompras] = useState([]);
    const cartHistory = useSelector(state => state.cartHistory)
    // useEffect(() => {
    //     // Hacer una solicitud GET al backend para obtener el historial de compras del usuario actual
    //     const userId = localStorage.getItem("userId");
    //     axios.get(`/car/compras/${userId}`)
    //         .then((response) => {
    //             setCompras(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error al obtener el historial de compras:", error);
    //         });
    // }, []);

    return (
        <div className={styles.carthistory}>
            <h2>Shopping history</h2>
            <select name="" id="">
                <option hidden={true}>Date...</option>
                <option>Last week</option>
                <option>Last month</option>
                <option>Last year</option>
            </select>
            <div className={styles.container_bought}>
                {cartHistory.map(compra => (
                    <div className={styles.new_buy} key={compra.id}>
                        <img src={compra.image} className={`${styles.bought} ${styles.bought_img}`} />
                        <h1 className={styles.bought}> {compra.name}</h1>
                        <h1 className={styles.bought}> {compra.brand}</h1>
                        <h1 className={styles.bought}> {compra.model}</h1>
                        <h1 className={styles.bought}> ${compra.price} USD</h1>
                        <h1 className={styles.bought}>Bought at {compra.date}</h1>
                        <Link to={`/detail/${compra.id}`}>
                            <button className={styles.bought}>Buy Again</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
