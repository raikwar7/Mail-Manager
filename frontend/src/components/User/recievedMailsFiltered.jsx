import React, { useEffect, useState } from "react";
import MailCard from "../Mails/MailView/Mailcard";
import axios from "axios";

const ReceivedFilteredMail = () => {
  const [mails, setMails] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sender, setSender] = useState(""); // ✅ renamed
  const [senderList, setSenderList] = useState([]); // ✅ dropdown

  const getUserEmail = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://127.0.0.1:8000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.email;
  };

  // ✅ Fetch mails
  const fetchMails = async () => {
    try {
      const email = await getUserEmail();

      let url = `http://127.0.0.1:8000/mailDashboard/received/${email}`;

      let params = {};

      if (startDate) params.start = new Date(startDate).toISOString();
      if (endDate) params.to = new Date(endDate).toISOString();

      if (sender) params.sender = sender;

      const res = await axios.get(url, { params });

      setMails(res.data.mails || []);
    } catch (error) {
      console.error("Error fetching mails:", error);
    }
  };

  // ✅ Fetch sender list (dropdown)
  const fetchSenders = async () => {
    try {
      const email = await getUserEmail();

      const res = await axios.get(
        `http://127.0.0.1:8000/mailDashboard/receivers/${email}`
      );

      setSenderList(res.data.senders || []);
    } catch (err) {
      console.error("Error fetching senders:", err);
    }
  };

  useEffect(() => {
    fetchMails();     // ✅ load all mails initially
    fetchSenders();   // ✅ load sender dropdown
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-6">
        📥 Received Mails
      </h2>

      {/* Filters */}
      <div className="flex gap-4 justify-center mb-6">

        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />

        {/* ✅ Sender Dropdown */}
        <select
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Senders</option>
          {senderList.map((s, index) => (
            <option key={index} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={fetchMails}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>

        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
            setSender("");
            fetchMails();
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <h3 className="text-center mb-4">
        Total Mails: {mails.length}
      </h3>

      {mails
        .sort((a, b) => b.internal_date - a.internal_date)
        .map((mail) => (
          <MailCard key={mail.id} mail={mail} type="received" />
        ))}
    </div>
  );
};

export default ReceivedFilteredMail;