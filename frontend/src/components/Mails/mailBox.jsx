import React, { useEffect, useState } from "react";
import axios from "axios";

function MailBox() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserEmail(res.data.email);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchEmails = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8000/fetch-mails?email=${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Emails API Response:", res.data);

      if (Array.isArray(res.data)) {
        setEmails(res.data);
      } else {
        setEmails([]);
      }

    } catch (err) {
      console.error("Error fetching emails:", err);
    } finally {
      setLoading(false);
    }
  };

  const openEmail = (email) => {
    setSelectedEmail(email);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchEmails();
    }
  }, [userEmail]);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">

      {/* Email List */}
      <div className="w-1/3 bg-white border-r shadow-sm flex flex-col">

        <div className="p-4 border-b">
          <button
            onClick={fetchEmails}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            {loading ? "Fetching..." : "Fetch New Mails"}
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {emails.length === 0 && !loading && (
            <div className="p-4 text-gray-500">No Emails Found</div>
          )}

          {emails.map((email) => (
            <div
              key={email.message_id}
              onClick={() => openEmail(email)}
              className="cursor-pointer p-4 border-b hover:bg-gray-100"
            >
              <div className="font-semibold">
                {email.subject || "(No Subject)"}
              </div>

              <div className="text-sm text-gray-600">
                {email.sender}
              </div>

              <div className="text-xs text-gray-500">
                {email.snippet}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Viewer */}
      <div className="w-2/3 p-8 overflow-y-auto">
        {selectedEmail ? (
          <div className="bg-white shadow-md rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              {selectedEmail.subject || "(No Subject)"}
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              From: {selectedEmail.sender}
            </p>

            <hr className="my-4" />
            <div className="whitespace-pre-wrap">
              {selectedEmail.snippet || "No snippet Body"}
            </div>

            <div className="whitespace-pre-wrap">
              {selectedEmail.body_text || "No Email Body"}
            </div>

          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xl">
            Select an Email
          </div>
        )}
      </div>

    </div>
  );
}

export default MailBox;