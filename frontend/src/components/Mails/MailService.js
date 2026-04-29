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
export const getmailfilteredSent = async(email, start, end) => {
    const encodedMail = encodeURIComponent(email);
    const res = await fetch(`${API_BASE}/mailDashboard/sent/${encodedMail}`, {
        params: { start: start, to: end }
    });
    const data = await res.json();
    return data;
}
export const getmailfilteredRecieved = async(email, start, end) => {
    const encodedMail = encodeURIComponent(email);
    const res = await fetch(`${API_BASE}/mailDashboard/recieved/${encodedMail}`, {
        params: { start: start, to: end }
    });
    const data = await res.json();
    return data;
}