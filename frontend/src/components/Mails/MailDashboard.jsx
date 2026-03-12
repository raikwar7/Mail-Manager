import React, { useState } from "react";
import SentMail from "./MailView/SentMailView";
import ReceivedMail from "./MailView/RecievedMailView";
const MailDashboard = () => {

    const [tab, setTab] = useState("received");

    return (
        <div style={{padding:"20px"}}>

            <h1>Mail Dashboard</h1>

            <div style={{marginBottom:"20px"}}>

                <button onClick={() => setTab("received")}>
                    Received
                </button>

                <button onClick={() => setTab("sent")}>
                    Sent
                </button>

            </div>

            {tab === "received" && <ReceivedMail/>}
            {tab === "sent" && <SentMail/>}

        </div>
    );
};

export default MailDashboard;