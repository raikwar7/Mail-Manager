const API_BASE = "http://localhost:8000";
export const getSentMails = async(email) => {
    const encodedEmail = encodeURIComponent(email);

    const res = await fetch(
        `${API_BASE}/mails/sent/${encodedEmail}`
    );

    return res.json();
};

export const getRecievedMails = async(email) => {
    const res = await fetch(`${API_BASE}/mails/recieved/${email}`);
    return res.json();
}