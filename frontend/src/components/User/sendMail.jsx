import React, { useState } from "react";
import axios from "axios";

const MailContent = () => {
    const [receiver, setReceiver] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    

    return (
        <div>
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 relative">Send the mails
                <span className="block w-20 h-1 bg-blue-500 mx-auto mt-2 rounded"></span>
            </h2>

            <input type="mail"
            value={receiver}
            ></input>
        </div>
    );
};

export default MailContent; 
