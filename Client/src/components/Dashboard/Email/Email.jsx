import React from "react";
import styles from "./Email.module.css"; // Importa tu archivo de estilos CSS

export default function Email(props) {
    const { id, name, email, country, status, verify } = props;

    const verifyText = verify ? "Yes" : "Not";

    const veryClass = verify ? styles.emailItemVerifyYes : styles.emailItemVerifyNot;

    return (
        <div className={styles.emailContainer}>
            <div className={styles.emailItem}>{email}</div>
            <div className={styles.emailItem}>{name}</div>
            <div className={styles.emailItem}>{country}</div>
            <div className={styles.emailItem}>{status}</div>
            <div className={`${veryClass}`}>{verifyText}</div>
            <div className={styles.emailItem}>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
            </div>
        </div>
    );
}
