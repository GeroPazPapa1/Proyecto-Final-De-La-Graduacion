import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Email from "../Email/Email";
import styles from "./Emails.module.css";
import { applyFilterDb, deleteUserWithID, editPutUser, getDashboard } from "../../../Redux/actions";
import EDIT from "../Email/Icons/EDIT.svg";
import TRASH from "../Email/Icons/TRASH.svg";
import Swal from "sweetalert2";
import USER from "./Icons/USER.png";

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

    console.log(pageFilteredDb)

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
            reverseButtons: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Accept",
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
            reverseButtons: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Accept",
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


    if (pageFilteredDb.length === 0) {
        return (
            <div className={styles.containerCNF}>
                <div className={styles.containerNF}>
                    <div>
                        <img src={USER} alt="NotFound..." />
                    </div>
                    <div className={styles.textNF}>
                        <p>Not Found</p>
                        <span>No users found</span>
                    </div>
                </div>
            </div>
        );
    }

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