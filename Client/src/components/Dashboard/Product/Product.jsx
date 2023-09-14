import React from "react";
import styles from "./Product.module.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { applyFilterDb, deleteUserWithID, editPutUser, getDashboard } from "../../../Redux/actions";
import TRASH from "../Email/Icons/TRASH.svg";
import EDIT from "../Email/Icons/EDIT.svg";
import { useState } from "react";

export default function Email(props) {
    const { id, name, brand, color, model, price, location, state, onCheckboxChange, isChecked } = props;

    const dispatch = useDispatch();

    // const handleDeletedEmail = async (id) => {
    //         Swal.fire({
    //         title: "¿Are you sure?",
    //         text: `You are about to delete ${name} from the database`,
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Accept",
    //         cancelButtonText: "Cancel",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             dispatch(deleteUserWithID(id));
    //             dispatch(applyFilterDb("originEmails"));
    //         }
    //     });
    // };
    
    // const handlePutEmail = (id) => {
    //     Swal.fire({
    //         title: "Select options",
    //         icon: "question",
    //         html: '<select id="select-status" class="swal2-select">' +
    //             '<option value="admin">Admin</option>' +
    //             '<option value="user">User</option>' +
    //             '</select>' +
    //             '<select id="select-ban" class="swal2-select">' +
    //             '<option value=true>Banned</option>' +
    //             '<option value=false>Not Banned</option>' +
    //             '</select>',
    //         showCancelButton: true,
    //         confirmButtonText: "Accept",
    //         cancelButtonText: "Cancel",
    //         preConfirm: () => {
    //             const selectedStatus = document.getElementById('select-status').value;
    //             const selectedBan = document.getElementById('select-ban').value;
    //             return {
    //                 type: selectedStatus,
    //                 ban: selectedBan
    //             };
    //         }
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             const { type, ban } = result.value;
    //             // Aquí puedes utilizar los valores seleccionados (type y ban) como desees
    //             console.log("Type seleccionado:", status);
    //             console.log("Ban seleccionado:", ban);
    //             await dispatch(editPutUser(id, type, ban));
    //             await dispatch(getDashboard());
    //             await dispatch(applyFilterDb("originEmails"));
    //         }
    //     });
    // };

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
                    <button className={styles.delete} >
                        <img className={styles.img} src={TRASH} alt="Icon..." title="Delete user" />
                    </button>
                    <button className={styles.edit}>
                        <img className={styles.img} src={EDIT} alt="Icon..." title="Edit user" />
                    </button>
                </>
            </div>
        </div>
    );
}

