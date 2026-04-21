const API_BASE = "http://localhost:8000";
export const getSentMails = async(email) => {
    const encodedEmail = encodeURIComponent(email);

    const res = await fetch(
        `${API_BASE}/mails/sent/${encodedEmail}`
    );

    return res.json();
};

export const getRecievedMails = async(email) => {
    const encodedemail = encodeURIComponent(email);
    const res = await fetch(`${API_BASE}/mails/recieved/${encodedemail}`);
    return res.json();
}