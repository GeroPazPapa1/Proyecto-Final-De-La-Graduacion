import React from "react"
import { useSelector } from "react-redux"
import LOADING from "./Icons/LOADING.svg"
import Email from "../Email/Email.1";
import styles from "./Emails.module.css";

export default function DashBoardEmail() {

    const emails = useSelector((state) => state.filteredsDashboard.emailsOrigins);
    const usersLoaded = useSelector((state) => state.usersLoaded);

    if (!usersLoaded) {
        return (
            <div>
                <img src={LOADING} alt="Loading..." />
            </div>
        );
    }

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
                
                {emails.map((email) => (
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