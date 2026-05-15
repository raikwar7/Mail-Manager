from fastapi import APIRouter,Depends
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.routes.user import get_db
from app.models.gmailData import Email
from datetime import datetime
from sqlalchemy import distinct


router=APIRouter()

'''this one is for the recievedmailsfiltered'''

@router.get('/mailDashboard/receivers/{email}')
def get_senders_for_receiver_dashboard(email: str, db: Session = Depends(get_db)):
    """
    If user is in TO / CC / BCC → return unique senders
    """

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

'''this one is for the sentmailsfiltered'''

@router.get('/mailDashboard/senders/{email}')
def get_receivers_for_sender_dashboard(email: str, db: Session = Depends(get_db)):

    mails = (
        db.query(Email)
        .filter(Email.sender.like(f"%{email}%"))
        .all()
    )

    receivers_set = set()

    for mail in mails:

        # 🔹 TO
        if mail.to_recipients:
            if isinstance(mail.to_recipients, list):
                receivers_set.update(mail.to_recipients)
            else:
                receivers_set.update(mail.to_recipients.split(","))

        # 🔹 CC
        if mail.cc_recipients:
            if isinstance(mail.cc_recipients, list):
                receivers_set.update(mail.cc_recipients)
            else:
                receivers_set.update(mail.cc_recipients.split(","))

        # 🔹 BCC
        if mail.bcc_recipients:
            if isinstance(mail.bcc_recipients, list):
                receivers_set.update(mail.bcc_recipients)
            else:
                receivers_set.update(mail.bcc_recipients.split(","))

    receivers_list = [r.strip() for r in receivers_set if r]

    return {"receivers": receivers_list}


@router.get('/mailDashboard/sent/{email}')
def get_sent_mail_filtered(
    email: str,
    start: datetime,
    to: datetime,
    sender: str = None,
    db: Session = Depends(get_db)
):
    from_ = int(start.timestamp() * 1000)
    to_ = int(to.timestamp() * 1000)

    query = (
        db.query(Email)
        .filter(Email.sender.like(f"%{email}%"))
        .filter(Email.internal_date.between(from_, to_))
    )

    # ✅ Apply sender filter
    if sender:
        query = query.filter(Email.sender == sender)

    mails = query.all()
    count = len(mails)

    return {
        "mails": mails,
        "count": count
    }

@router.get('/mailDashboard/recieved/{email}')
def get_recieved_mails_filtered(
    email: str,
    start: datetime,
    to: datetime,
    receiver: str = None,
    db: Session = Depends(get_db)
):
    from_ = int(start.timestamp() * 1000)
    to_ = int(to.timestamp() * 1000)

    query = (
        db.query(Email)
        .filter(
            or_(
                Email.bcc_recipients.like(f"%{email}%"),
                Email.cc_recipients.like(f"%{email}%"),
                Email.to_recipients.like(f"%{email}%")
            )
        )
        .filter(Email.internal_date.between(from_, to_))
    )

    # ✅ Apply receiver filter
    if receiver:
        query = query.filter(
            or_(
                Email.to_recipients.like(f"%{receiver}%"),
                Email.cc_recipients.like(f"%{receiver}%"),
                Email.bcc_recipients.like(f"%{receiver}%")
            )
        )

    mails = query.all()
    count = len(mails)

    return {
        "mails": mails,
        "count": count
    }