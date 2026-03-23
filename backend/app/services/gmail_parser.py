def parse_headers(headers):
    header_map = {h["name"]: h["value"] for h in headers}

    return {
        "sender": header_map.get("From"),
        "to": split_emails(header_map.get("To")),
        "cc": split_emails(header_map.get("Cc")),
        "bcc": split_emails(header_map.get("Bcc")),
        "reply_to": header_map.get("Reply-To"),
        "subject": header_map.get("Subject"),
    }


def split_emails(value):
    if not value:
        return []
    return [v.strip() for v in value.split(",")]

import base64


def decode_base64(data):
    if not data:
        return None
    return base64.urlsafe_b64decode(data).decode("utf-8", errors="ignore")


def extract_body(payload):
    body_text = None
    body_html = None

    def walk(parts):
        nonlocal body_text, body_html

        for part in parts:
            mime = part.get("mimeType")
            body = part.get("body", {}).get("data")

            if mime == "text/plain" and body:
                body_text = decode_base64(body)

            elif mime == "text/html" and body:
                body_html = decode_base64(body)

            elif "parts" in part:
                walk(part["parts"])

    if "parts" in payload:
        walk(payload["parts"])
    else:
        body_text = decode_base64(payload.get("body", {}).get("data"))

    return body_text, body_html

def extract_attachments(payload):
    attachments = []

    def walk(parts):
        for part in parts:
            filename = part.get("filename")

            if filename:
                attachments.append({
                    "filename": filename,
                    "mimeType": part.get("mimeType"),
                    "size": part.get("body", {}).get("size"),
                    "attachmentId": part.get("body", {}).get("attachmentId"),
                })

            if "parts" in part:
                walk(part["parts"])

    if "parts" in payload:
        walk(payload["parts"])

    return attachments