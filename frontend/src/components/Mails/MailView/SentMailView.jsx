import React, { useEffect, useState } from "react";
import { getSentMails } from "../services/mailService";
import MailCard from "../components/MailCard";

const SentMail = () => {

    const [mails, setMails] = useState([]);
    const userEmail = localStorage.getItem("user_email");

    useEffect(() => {

        const fetchMails = async () => {
            const data = await getSentMails(userEmail);
            setMails(data);
        };

        fetchMails();

    }, [userEmail]);

    return (
        <div>
            <h2>Sent Mails</h2>

            {mails.map(mail => (
                <MailCard key={mail.id} mail={mail} type="sent"/>
            ))}

        </div>
    );
};

export default SentMail;