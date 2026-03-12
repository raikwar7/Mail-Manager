import React, { useEffect, useState } from "react";
import { getReceivedMails } from "../services/mailService";
import MailCard from "../components/MailCard";

const ReceivedMail = () => {

    const [mails, setMails] = useState([]);
    const userEmail = localStorage.getItem("user_email");

    useEffect(() => {

        const fetchMails = async () => {
            const data = await getReceivedMails(userEmail);
            setMails(data);
        };

        fetchMails();

    }, [userEmail]);

    return (
        <div>
            <h2>Received Mails</h2>

            {mails.map(mail => (
                <MailCard key={mail.id} mail={mail} type="received"/>
            ))}

        </div>
    );
};

export default ReceivedMail;