import React from "react"
import { useSelector } from "react-redux"
import LOADING from "./Icons/LOADING.svg"
import Email from "../Email/Email";

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
            <div>
                {emails.map((email) => (
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