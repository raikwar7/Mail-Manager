import base64
from fastapi import APIRouter, Header, HTTPException,Depends
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import os
from sqlalchemy.orm import Session
from app.routes.user import get_db
from app.models.models import User
router = APIRouter()


def get_gmail_service(access_token: str,refresh_token:str):
    print(access_token,refresh_token)

    creds = Credentials(
        token=access_token,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        scopes=["https://www.googleapis.com/auth/gmail.readonly"]
    )

    service = build("gmail", "v1", credentials=creds)
    print(access_token)

    return service
from app.models.gmailData import Email

from app.services.gmail_parser import (
    parse_headers,
    extract_body,
    extract_attachments,
)
from google.auth.exceptions import RefreshError

@router.get("/fetch-mails")
def fetch_all_emails(db: Session = Depends(get_db), email: str = ""):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    service = get_gmail_service(user.access_token, user.refresh_token)
    print("Checkpoint 1: service created")

    try:
        results = service.users().messages().list(
            userId="me",
            maxResults=10
        ).execute()

        print("Checkpoint 2: messages list fetched")

    except RefreshError as e:
        print("TOKEN ERROR:", str(e))
        raise HTTPException(
            status_code=401,
            detail="Session expired. Please login again."
        )

    except Exception as e:
        print("GENERAL ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail="Internal error"
        )

    messages = results.get("messages", [])

    for msg in messages:

        msg_data = service.users().messages().get(
            userId="me",
            id=msg["id"],
            format="full"
        ).execute()

        exists = db.query(Email).filter(
            Email.message_id == msg_data["id"]
        ).first()

        if exists:
            continue

        payload = msg_data["payload"]

        header_data = parse_headers(payload.get("headers", []))
        body_text, body_html = extract_body(payload)
        attachments = extract_attachments(payload)

        new_email = Email(
            message_id=msg_data["id"],
            thread_id=msg_data.get("threadId"),
            history_id=msg_data.get("historyId"),
            sender=header_data["sender"],
            to_recipients=header_data["to"],
            cc_recipients=header_data["cc"],
            bcc_recipients=header_data["bcc"],
            reply_to=header_data["reply_to"],
            subject=header_data["subject"],
            snippet=msg_data.get("snippet"),
            body_text=body_text,
            body_html=body_html,
            has_attachments=len(attachments) > 0,
            attachments=attachments,
            label_ids=msg_data.get("labelIds"),
            size_estimate=msg_data.get("sizeEstimate"),
            internal_date=msg_data.get("internalDate"),
            raw_headers=payload.get("headers"),
            raw_payload=payload
        )

        db.add(new_email)

    db.commit()

    emails = db.query(Email).order_by(Email.internal_date.desc()).all()

    return emails