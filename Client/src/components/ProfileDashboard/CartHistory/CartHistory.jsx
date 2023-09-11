import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './CartHistory.module.css';
import { Link } from 'react-router-dom';

export default function CartHistory() {
    const purchaseHistory = useSelector(state => state.purchaseHistory);

    useEffect(() => {
        // Aquí puedes realizar alguna acción adicional si es necesario, como cargar el historial
        // de compras cuando el componente se monte.
    }, []);

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
                {purchaseHistory.map(compra => (
                    <div className={styles.new_buy} key={compra.id}>
                        <img src={compra.image} className={`${styles.bought} ${styles.bought_img}`} alt="product" />
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
