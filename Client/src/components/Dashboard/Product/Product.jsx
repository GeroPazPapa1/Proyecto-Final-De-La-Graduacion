import React from "react";
import styles from "./Product.module.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { applyFilters, deleteCarWithID, editPutCar, getAllCars } from "../../../Redux/actions";
import TRASH from "../Email/Icons/TRASH.svg";
import EDIT from "../Email/Icons/EDIT.svg";
import PLUS from "../Email/Icons/PLUS.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Email(props) {
    const { id, name, brand, color, model, price, location, state, onCheckboxChange, isChecked } = props;

    const dispatch = useDispatch();
    
    const handleDeletedCar = async (id) => {
            Swal.fire({
            title: "¿Are you sure?",
            text: `You are about to delete ${name} from the database`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Accept",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCarWithID(id));
                dispatch(applyFilters("originCars"));
            }
        });
    };

    return (
        <div className={styles.emailContainer}>
            <input 
            type="checkbox" 
            checked={isChecked}
            onChange={() => onCheckboxChange(id)}>
            </input>
            <div className={styles.emailItem}>{name}</div>
            <div className={styles.emailItem}>{brand}</div>
            <div className={styles.emailItem}>{color}</div>
            <div className={styles.emailItem}>{model}</div>
            <div className={styles.emailItem}>{price}</div>
            <div className={styles.emailItem}>{location}</div>
            <div className={styles.emailItem}>{state}</div>
            <div className={styles.emailItem}>
                <>
                    <button className={styles.delete} onClick={() => handleDeletedCar(id)}>
                        <img className={styles.img} src={TRASH} alt="Icon..." title="Delete car" />
                    </button>
                    <Link to={`/admin/dashboard/edit/${id}`} >
                        <button className={styles.edit}>
                        <img className={styles.img} src={EDIT} alt="Icon..." title="Edit car" />
                        </button>
                    </Link>
                </>
            </div>
        </div>
    );
}

