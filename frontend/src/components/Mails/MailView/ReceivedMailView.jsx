import React, { useEffect, useState } from "react";
import MailBox from "../mailBox";
const ReceivedMail = () => {

    const [mails, setMails] = useState([]);
    

    useEffect(() => {
        const fetchMails = async () => {

        const token = localStorage.getItem("token");

      const userRes = await axios.get(
        "http://127.0.0.1:8000/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const email = userRes.data.email;

      const mailRes = await axios.get(
        `http://127.0.0.1:8000/mails/received/${email}`
      );

      setMails(mailRes.data);
    };

        fetchMails();

    }, []);

    return (
        <div>
            <h2>Received Mails</h2>

            {mails.map(mail => (
                <MailBox key={mail.id} mail={mail} type="received"/>
            ))}

        </div>
    );
};

export default ReceivedMail;