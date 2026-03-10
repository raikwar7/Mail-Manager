import base64
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials


def decode_body(data):
    return base64.urlsafe_b64decode(data).decode("utf-8", errors="ignore")


def extract_body(payload):
    body_text = ""
    body_html = ""

    if "parts" in payload:
        for part in payload["parts"]:
            mime = part.get("mimeType")
            data = part.get("body", {}).get("data")

            if data:
                decoded = decode_body(data)
                if mime == "text/plain":
                    body_text += decoded
                elif mime == "text/html":
                    body_html += decoded
    else:
        data = payload.get("body", {}).get("data")
        if data:
            body_text = decode_body(data)

    return body_text, body_html


def fetch_all_emails():
    creds = Credentials.from_authorized_user_file("token.json")
    service = build("gmail", "v1", credentials=creds)

    results = service.users().messages().list(userId="me").execute()
    messages = results.get("messages", [])

    email_list = []

    for msg in messages:
        msg_data = service.users().messages().get(
            userId="me",
            id=msg["id"],
            format="full"
        ).execute()

        payload = msg_data["payload"]
        headers = payload.get("headers", [])

        def get_header(name):
            for h in headers:
                if h["name"].lower() == name.lower():
                    return h["value"]
            return None

        body_text, body_html = extract_body(payload)

        has_attachments = any(
            part.get("filename")
            for part in payload.get("parts", [])
        )

        email_list.append({
            "message_id": msg_data["id"],
            "thread_id": msg_data.get("threadId"),
            "history_id": msg_data.get("historyId"),

            "sender": get_header("From"),
            "to_recipients": get_header("To"),
            "cc_recipients": get_header("Cc"),
            "bcc_recipients": get_header("Bcc"),
            "reply_to": get_header("Reply-To"),

            "subject": get_header("Subject"),
            "snippet": msg_data.get("snippet"),

            "body_text": body_text,
            "body_html": body_html,

            "label_ids": msg_data.get("labelIds"),
            "size_estimate": msg_data.get("sizeEstimate"),
            "internal_date": msg_data.get("internalDate"),

            "has_attachments": has_attachments,
            "raw_headers": headers,
            "raw_payload": payload,
        })

    return email_list