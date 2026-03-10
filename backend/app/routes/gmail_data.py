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

@router.get("/fetch-mails")
def fetch_all_emails(db: Session = Depends(get_db), email: str = ""):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    access_token = user.access_token
    refresh_token = user.refresh_token

    service = get_gmail_service(access_token, refresh_token)

    results = service.users().messages().list(
        userId="me",
        maxResults=20
    ).execute()

    messages = results.get("messages", [])

    email_list = []

    for msg in messages:
        msg_data = service.users().messages().get(
            userId="me",
            id=msg["id"],
            format="full"
        ).execute()

        headers = msg_data["payload"]["headers"]

        subject = ""
        sender = ""

        for header in headers:
            if header["name"] == "Subject":
                subject = header["value"]
            if header["name"] == "From":
                sender = header["value"]

        body = ""

        if "parts" in msg_data["payload"]:
            for part in msg_data["payload"]["parts"]:
                if part["mimeType"] == "text/plain":
                    data = part["body"]["data"]
                    body = base64.urlsafe_b64decode(data).decode("utf-8")

        email_list.append({
            "message_id": msg_data["id"],
            "thread_id": msg_data["threadId"],
            "subject": subject,
            "sender": sender,
            "snippet": msg_data.get("snippet"),
            "body": body,
            "internal_date": msg_data.get("internalDate"),
        })

    return email_list