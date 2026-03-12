import React from "react";
const MailCard=({mail,type})=>{
    return(
         <div style={{
            border:"1px solid #ddd",
            padding:"15px",
            marginBottom:"10px",
            borderRadius:"8px"
        }}>
            <h3>{mail.subject}</h3>

            {type === "received" ? (
                <p><b>From:</b> {mail.sender}</p>
            ) : (
                <p><b>To:</b> {mail.receiver}</p>
            )}

            <p>{mail.body}</p>

            <small>{mail.created_at}</small>
        </div>
    );

};
export default MailCard;