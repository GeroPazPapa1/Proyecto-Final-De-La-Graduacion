import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Email from "../Email/Email";
import styles from "./Emails.module.css";
import { applyFilterDb, deleteUserWithID, editPutUser, getDashboard } from "../../../Redux/actions";
import EDIT from "../Email/Icons/EDIT.svg";
import TRASH from "../Email/Icons/TRASH.svg";
import Swal from "sweetalert2";

export default function DashBoardEmail() {

    const pageFilteredDb = useSelector((state) => state.pageFilteredDb);
    const EmailsLoaded = useSelector((state) => state.EmailsLoaded);
    const dispatch = useDispatch();
    const [emailSelection, setEmailSelection] = useState([]);
    const selectedEmails = Object.keys(emailSelection).filter((key) => emailSelection[key]);
    const selectedEmailObjects = selectedEmails.map((emailId) => {
        return { id: emailId };
    });
    const aux = selectedEmailObjects.length;
    console.log(aux, "soy aux");
    console.log(emailSelection, "soy el DashboardEmail");

    const handleCheckboxActionEdit = async () => {
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
                for (const id in emailSelection) {
                    await dispatch(editPutUser(id, type, ban));
                }
                await dispatch(getDashboard());
                await dispatch(applyFilterDb("originEmails"));
            }
        });
    };

    const handleCheckboxActionDelete = async () => {
        Swal.fire({
            title: "¿Are you sure?",
            text: `You are about to delete ${name} from the database`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Accept",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                for (const id in emailSelection) {
                    dispatch(deleteUserWithID(id));
                }
                dispatch(applyFilterDb("originEmails"));
            }
        });
    };

    const handleCheckboxChange = (id) => {
        // Actualiza el estado de selección cuando se cambia el checkbox
        setEmailSelection((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    useEffect(() => {
        if (!EmailsLoaded) {
            const handleChangeEmails = async () => {
                await dispatch(getDashboard());
                await dispatch(applyFilterDb("originEmails"));
            };
            handleChangeEmails();
        }
    }, [EmailsLoaded, dispatch])

    return (
        <div>
            {aux >= 2 ? (
                <div>
                    <button className={styles.edit} onClick={handleCheckboxActionEdit}>
                        <img className={styles.img} src={EDIT} alt="Icon..." title="Editar usuario" />
                    </button>
                    <button className={styles.delete} onClick={handleCheckboxActionDelete}>
                        <img className={styles.img} src={TRASH} alt="Icon..." title="Eliminar usuario" />
                    </button>
                </div>
            ) : null}
            <div className={styles.emailContainer}>
                <div className={styles.emailItem}>Email</div>
                <div className={styles.emailItem}>Full Name</div>
                <div className={styles.emailItem}>Country</div>
                <div className={styles.emailItem}>Type</div>
                <div className={styles.emailItem}>Verify</div>
                <div className={styles.emailItem}>Banned</div>
                <div className={styles.emailItem}>Actions</div>
            </div>
            <div>
                {pageFilteredDb?.map((email) => (
                    <Email
                        key={email.id}
                        id={email.id}
                        name={email.name}
                        email={email.email}
                        country={email.country}
                        status={email.status}
                        verify={email.verify} />
                ))
                }
                
            </div>
        </div>
    )
}