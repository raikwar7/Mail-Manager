import React, { useEffect, useState } from "react";
import MailCard from "./Mailcard";
import axios from "axios";

const ReceivedMail = () => {
  const [mails, setMails] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchMails = async () => {
    try {
      const token = localStorage.getItem("token");

      // Get logged-in user
      const userRes = await axios.get(
        "http://127.0.0.1:8000/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const email = userRes.data.email;

      let url = `http://127.0.0.1:8000/mails/recieved/${email}`;
      let params = {};

      // If filter applied → use filtered API
      if (startDate && endDate) {
        url = `http://127.0.0.1:8000/mailDashboard/recieved/${email}`;

        params = {
          start: startDate + ":00", // fix format
          to: endDate + ":00",
        };
      }

      const res = await axios.get(url, { params });

      // Handle both API formats
      if (res.data.mails) {
        setMails(res.data.mails);
      } else {
        setMails(res.data);
      }
    } catch (error) {
      console.error("Error fetching mails:", error);
    }
  };

  useEffect(() => {
    fetchMails();
  }, []);

  return (
    <div>
      {/* 🔹 Title */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 relative">
        📥 Received Mails
        <span className="block w-20 h-1 bg-blue-500 mx-auto mt-2 rounded"></span>
      </h2>

      {/* 🔹 Filter UI */}
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
            fetchMails();
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* 🔹 Count */}
      <h3 className="text-center mb-4 text-gray-600">
        Total Mails: {mails.length}
      </h3>

      {/* 🔹 Mail List */}
      {mails
        .sort((a, b) => b.internal_date - a.internal_date)
        .map((mail) => (
          <MailCard key={mail.id} mail={mail} type="recieved" />
        ))}
    </div>
  );
};

export default ReceivedMail;