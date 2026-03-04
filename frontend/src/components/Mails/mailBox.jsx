import React, { useEffect, useState } from "react";
import axios from "axios";

function MailBox() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    await axios.post("http://localhost:8000/fetch-mails");
    await loadEmails();
    setLoading(false);
  };

  const loadEmails = async () => {
    const res = await axios.get("http://localhost:8000/emails");
    setEmails(res.data);
  };

  const openEmail = async (id) => {
    const res = await axios.get(`http://localhost:8000/emails/${id}`);
    setSelectedEmail(res.data);
  };

  useEffect(() => {
    loadEmails();
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-white border-r shadow-sm flex flex-col">
        
        {/* Fetch Button */}
        <div className="p-4 border-b">
          <button
            onClick={fetchEmails}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            {loading ? "Fetching..." : "Fetch New Mails"}
          </button>
        </div>

        {/* Email List */}
        <div className="overflow-y-auto flex-1">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => openEmail(email.id)}
              className={`cursor-pointer p-4 border-b hover:bg-gray-100 transition ${
                selectedEmail?.id === email.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="font-semibold text-gray-800 truncate">
                {email.subject || "(No Subject)"}
              </div>
              <div className="text-sm text-gray-600 truncate">
                {email.sender}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {email.snippet}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT MAIL VIEW */}
      <div className="w-2/3 p-8 overflow-y-auto">
        {selectedEmail ? (
          <div className="bg-white shadow-md rounded-xl p-6">
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedEmail.subject}
            </h2>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p><span className="font-semibold">From:</span> {selectedEmail.sender}</p>
              <p><span className="font-semibold">To:</span> {selectedEmail.to_recipients}</p>
              {selectedEmail.cc_recipients && (
                <p><span className="font-semibold">CC:</span> {selectedEmail.cc_recipients}</p>
              )}
            </div>

            <hr className="my-4" />

            <div
              className="prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{
                __html:
                  selectedEmail.body_html ||
                  `<pre>${selectedEmail.body_text}</pre>`,
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xl">
            Select an Email to View
          </div>
        )}
      </div>
    </div>
  );
}

export default MailBox;