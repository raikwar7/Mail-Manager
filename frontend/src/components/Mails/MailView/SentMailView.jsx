import React, { useEffect, useState } from "react";
import axios from "axios";
import MailCard from "./Mailcard";

const SentMail = () => {
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
        `http://127.0.0.1:8000/mails/sent/${email}`
      );

      setMails(mailRes.data);
    };

    fetchMails();
  }, []);

  return (
    <div>
      <h2>Sent Mails</h2>

      {mails.map(mail => (
        <MailCard key={mail.id} mail={mail} type="sent" />
      ))}
    </div>
  );
};

export default SentMail;