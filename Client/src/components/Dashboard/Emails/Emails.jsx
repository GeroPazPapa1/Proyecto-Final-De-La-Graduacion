import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Email from "../Email/Email";
import styles from "./Emails.module.css";
import { applyFilterDb, getDashboard } from "../../../Redux/actions";

export default function DashBoardEmail() {

    const pageFilteredDb = useSelector((state) => state.pageFilteredDb);
    const EmailsLoaded = useSelector((state) => state.EmailsLoaded);
    const dispatch = useDispatch();

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
                        verify={email.verify}
                        ban={email.ban} />
                ))
                }
            </div>
        </div>
    )
}