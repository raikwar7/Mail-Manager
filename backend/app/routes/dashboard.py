from fastapi import APIRouter, Depends
from sqlalchemy import or_, distinct
from sqlalchemy.orm import Session
from app.routes.user import get_db
from app.models.gmailData import Email
from datetime import datetime
from typing import Optional
from sqlalchemy import func


router = APIRouter()

''' 🔹 Get unique senders for a receiver '''
@router.get('/mailDashboard/receivers/{email}')
def get_senders_for_receiver_dashboard(email: str, db: Session = Depends(get_db)):

    senders = (
        db.query(distinct(Email.sender))
        .filter(
            or_(
                Email.to_recipients.like(f"%{email}%"),
                Email.cc_recipients.like(f"%{email}%"),
                Email.bcc_recipients.like(f"%{email}%")
            )
        )
        .all()
    )

    sender_list = [s[0] for s in senders if s[0]]

    return {"senders": sender_list}


''' 🔹 Get unique receivers for a sender '''
@router.get('/mailDashboard/senders/{email}')
def get_receivers_for_sender_dashboard(email: str, db: Session = Depends(get_db)):

    mails = (
        db.query(Email)
        .filter(Email.sender.like(f"%{email}%"))
        .all()
    )

    receivers_set = set()

    for mail in mails:

        for field in [mail.to_recipients, mail.cc_recipients, mail.bcc_recipients]:
            if field:
                if isinstance(field, list):
                    receivers_set.update(field)
                else:
                    receivers_set.update(field.split(","))

    receivers_list = [r.strip() for r in receivers_set if r]

    return {"receivers": receivers_list}


''' 🔹 Get filtered sent mails '''
@router.get('/mailDashboard/sent/{email}')
def get_sent_mail_filtered(
    email: str,
    start: Optional[datetime] = None,
    to: Optional[datetime] = None,
    receiver: Optional[str] = None,
    db: Session = Depends(get_db)
):

    query = db.query(Email).filter(
        Email.sender.like(f"%{email}%")
    )

    # ✅ Flexible date filtering
    if start:
        from_ = int(start.timestamp() * 1000)
        query = query.filter(Email.internal_date >= from_)

    if to:
        to_ = int(to.timestamp() * 1000)
        query = query.filter(Email.internal_date <= to_)

    # ✅ Sender filter
    if receiver:
        query = query.filter(
            or_(
                Email.to_recipients.like(f"%{receiver}%"),
                Email.cc_recipients.like(f"%{receiver}%"),
                Email.bcc_recipients.like(f"%{receiver}%")
            )
        )

    mails = query.order_by(Email.internal_date.desc()).all()

    return {
        "mails": mails,
        "count": len(mails)
    }


''' 🔹 Get filtered received mails '''
@router.get('/mailDashboard/received/{email}')
def get_received_mails_filtered(
    email: str,
    start: Optional[datetime] = None,
    to: Optional[datetime] = None,
    sender: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query=db.query(Email)
    query = query.filter(
            or_(
                Email.to_recipients.like(f"%{email}%"),
                Email.cc_recipients.like(f"%{email}%"),
                Email.bcc_recipients.like(f"%{email}%")
            )
        )
    if sender:
     query = query.filter(Email.sender.like(f"%{sender}%")
    )

    # ✅ Flexible date filtering
    if start:
        from_ = int(start.timestamp() * 1000)
        query = query.filter(Email.internal_date >= from_)

    if to:
        to_ = int(to.timestamp() * 1000)
        query = query.filter(Email.internal_date <= to_)
  
     

    mails = query.order_by(Email.internal_date.desc()).all()

    return {
        "mails": mails,
        "count": len(mails)
    }