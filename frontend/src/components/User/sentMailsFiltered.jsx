import React, { useEffect, useState } from "react";
import MailCard from "../Mails/MailView/Mailcard";
import axios from "axios";

const SentFilteredMail = () => {
  const [mails, setMails] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [receiver, setReceiver] = useState(""); // ✅ correct naming
  const [receiverList, setReceiverList] = useState([]);

  // ✅ get logged-in user email
  const getUserEmail = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://127.0.0.1:8000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.email;
  };

  // ✅ fetch sent mails
  const fetchMails = async () => {
    try {
      const email = await getUserEmail();

      const url = `http://127.0.0.1:8000/mailDashboard/sent/${email}`;

      let params = {};

      if (startDate) params.start = new Date(startDate).toISOString();
      if (endDate) params.to = new Date(endDate).toISOString();

      if (receiver) params.receiver = receiver;

      const res = await axios.get(url, { params });

      setMails(res.data.mails || []);
    } catch (error) {
      console.error("Error fetching mails:", error);
    }
  };

  // ✅ fetch receiver list (dropdown)
  const fetchReceivers = async () => {
    try {
      const email = await getUserEmail();

      const res = await axios.get(
        `http://127.0.0.1:8000/mailDashboard/senders/${email}`
      );

      setReceiverList(res.data.receivers || []);
    } catch (error) {
      console.error("Error fetching receivers:", error);
    }
  };

  useEffect(() => {
    fetchMails();      // load mails initially
    fetchReceivers();  // load dropdown
  }, []);

  return (
    <div>
      {/* 🔹 Title */}
      <h2 className="text-3xl font-semibold text-center mb-6">
        📤 Sent Mails
      </h2>

      {/* 🔹 Filters */}
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

        {/* ✅ Receiver dropdown */}
        <select
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Receivers</option>
          {receiverList.map((r, index) => (
            <option key={index} value={r}>
              {r}
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
            setReceiver("");
            fetchMails();
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* 🔹 Count */}
      <h3 className="text-center mb-4">
        Total Mails: {mails.length}
      </h3>

      {/* 🔹 Mail List */}
      {mails
        .sort((a, b) => b.internal_date - a.internal_date)
        .map((mail) => (
          <MailCard key={mail.id} mail={mail} type="sent" />
        ))}
    </div>
  );
};

export default SentFilteredMail;