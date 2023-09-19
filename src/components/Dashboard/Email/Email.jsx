import React, { useEffect } from "react";
import styles from "./Email.module.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { applyFilterDb, deleteUserWithID, editPutUser, getDashboard } from "../../../Redux/actions";
import TRASH from "./Icons/TRASH.svg";
import EDIT from "./Icons/EDIT.svg";
import { useState } from "react";

export default function Email(props) {
    const { id, name, email, country, status, verify, ban, onCheckboxChange, isChecked } = props;

    const dispatch = useDispatch();

    const verifyText = verify ? "Yes" : "Not";
    const banText = ban ? "Banned" : "Not";
    const veryClass = verify ? styles.emailItemVerifyYes : styles.emailItemVerifyNot;
    const veryClassB = ban ? styles.emailItemVerifyNot : styles.emailItemVerifyYes;

    const handleDeletedEmail = async (id) => {
        Swal.fire({
            title: "¿Are you sure?",
            text: `You are about to delete ${name} from the database`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Accept",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUserWithID(id));
                dispatch(applyFilterDb("originEmails"));
            }
        });
    };

    const handlePutEmail = (id) => {
        Swal.fire({
            title: "Select options",
            icon: "question",
            html: '<select id="select-status" class="swal2-select">' +
                '<option value="admin">Admin</option>' +
                '<option value="user">User</option>' +
                '</select>' +
                '<select id="select-ban" class="swal2-select">' +
                '<option value=true>Banned</option>' +
                '<option value=false>Not Banned</option>' +
                '</select>',
            showCancelButton: true,
            confirmButtonText: "Accept",
            cancelButtonText: "Cancel",
            preConfirm: () => {
                const selectedStatus = document.getElementById('select-status').value;
                const selectedBan = document.getElementById('select-ban').value;
                return {
                    type: selectedStatus,
                    ban: selectedBan
                };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { type, ban } = result.value;
                // Aquí puedes utilizar los valores seleccionados (type y ban) como desees
                console.log("Type seleccionado:", status);
                console.log("Ban seleccionado:", ban);
                await dispatch(editPutUser(id, type, ban));
                await dispatch(getDashboard());
                await dispatch(applyFilterDb("originEmails"));
            }
        });
    };

    useEffect(() => {
        console.log(email.status)
    })

    return (
        <div className={styles.emailContainer}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onCheckboxChange(id)}>
            </input>
            <div className={styles.emailItem}>{email}</div>
            <div className={styles.emailItem}>{name}</div>
            <div className={styles.emailItem}>{country}</div>
            <div className={styles.emailItem}>{status}</div>
            <div className={`${veryClass}`}>{verifyText}</div>
            <div className={`${veryClassB}`}>{banText}</div>
            <div className={styles.emailItem}>
                <>
                    <button className={styles.delete} onClick={() => handleDeletedEmail(id)}>
                        <img className={styles.img} src={TRASH} alt="Icon..." title="Delete user" />
                    </button>
                    <button className={styles.edit} onClick={() => handlePutEmail(id)}>
                        <img className={styles.img} src={EDIT} alt="Icon..." title="Edit user" />
                    </button>
                </>
            </div>
        </div>
    );
}
