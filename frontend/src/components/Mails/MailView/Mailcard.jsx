import React from "react";
const MailCard=({mail,type})=>{
    return(
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "12px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      transition: "0.2s",
      cursor: "pointer"
    }}
    onMouseEnter={e => e.currentTarget.style.background = "#f9f9f9"}
    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
    >
      
      {/* Top Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
          {mail.subject || "No Subject"}
        </h3>

        <small style={{ color: "#888" }}>
          {mail.internal_date}
        </small>
      </div>

      {/* Sender / Receiver */}
      <div style={{ marginTop: "6px", fontSize: "14px", color: "#555" }}>
        {type === "received" ? (
          <p style={{ margin: 0 }}>
            <b>From:</b> {mail.sender}
          </p>
        ) : (
          <p style={{ margin: 0 }}>
            <b>To:</b> {mail.receiver}
          </p>
        )}
      </div>

      {/* Snippet */}
      <p style={{
        marginTop: "8px",
        fontSize: "14px",
        color: "#666",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }}>
        {mail.snippet || "No preview available"}
      </p>

      {/* Expandable Details */}
      <details style={{ marginTop: "10px" }}>
        <summary style={{ cursor: "pointer", fontSize: "13px", color: "#007bff" }}>
          View Details
        </summary>

        <div style={{ marginTop: "8px", fontSize: "13px", color: "#444" }}>
          <p><b>Thread ID:</b> {mail.thread_id}</p>
          <p><b>From:</b> {mail.sender}</p>
          <p><b>Body:</b> {mail.body_text || "No content"}</p>
        </div>
      </details>

    </div>
  );

};
export default MailCard;