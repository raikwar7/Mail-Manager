import React, { useState } from "react";
import axios from "axios";

const MailCard = ({ mail, type }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const summarizeMail = async (e) => {
    e.stopPropagation(); // prevents card click issues

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/ai/summarize",
        {
          content: mail.body_text || mail.snippet || "",
        }
      );

      setSummary(res.data.summary);
      setShowSummary(true);
    } catch (err) {
      console.error("Summary error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        transition: "0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "#f9f9f9")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "#fff")
      }
    >
      {/* Top Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {mail.subject || "No Subject"}
        </h3>

        <small style={{ color: "#888" }}>
          {new Date(
            Number(mail.internal_date)
          ).toLocaleString()}
        </small>
      </div>

      {/* Sender / Receiver */}
      <div
        style={{
          marginTop: "6px",
          fontSize: "14px",
          color: "#555",
        }}
      >
        {type === "received" ? (
          <p style={{ margin: 0 }}>
            <b>From:</b> {mail.sender}
          </p>
        ) : (
          <p style={{ margin: 0 }}>
            <b>To:</b> {mail.to_recipients}
          </p>
        )}
      </div>

      {/* Snippet */}
      <p
        style={{
          marginTop: "8px",
          fontSize: "14px",
          color: "#666",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {mail.snippet || "No preview available"}
      </p>

      {/* Summarize Button */}
      <button
        onClick={summarizeMail}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "8px 14px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        {loading ? "Summarizing..." : "Summarize Mail"}
      </button>

      {/* AI Summary */}
      {showSummary && summary && (
        <div
          style={{
            marginTop: "12px",
            padding: "10px",
            backgroundColor: "#f4f8ff",
            borderLeft: "4px solid #007bff",
            borderRadius: "6px",
          }}
        >
          <h4
            style={{
              margin: "0 0 6px 0",
              fontSize: "14px",
            }}
          >
            AI Summary
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#444",
            }}
          >
            {summary}
          </p>
        </div>
      )}

      {/* Expandable Details */}
      <details style={{ marginTop: "10px" }}>
        <summary
          style={{
            cursor: "pointer",
            fontSize: "13px",
            color: "#007bff",
          }}
        >
          View Details
        </summary>

        <div
          style={{
            marginTop: "8px",
            fontSize: "13px",
            color: "#444",
          }}
        >
          <p>
            <b>Thread ID:</b> {mail.thread_id}
          </p>
          <p>
            <b>From:</b> {mail.sender}
          </p>
          <p>
            <b>Body:</b>{" "}
            {mail.body_text || "No content"}
          </p>
        </div>
      </details>
    </div>
  );
};

export default MailCard;