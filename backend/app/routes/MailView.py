
from fastapi import FastAPI,requests,responses,APIRouter,Depends
import os
from sqlalchemy.orm import Session
from app.routes.user import get_db
from app.models.gmailData import Email

router = APIRouter()

@router.get('/mails/sent/')
def get_sent_mails(mail:str,db:Session=Depends(get_db)):
    email=(
        db.query(Email).filter(Email.sender==email)
        .order_by(Email.internal_date.desc()).all()
    )
    return email
@router.get('/mails/recieved/')
def get_recieved_mails(mail:str,db:Session=Depends(get_db)):
    email=(db.query(Email)
           .filter(Email.bcc_recipients==email
                                   or Email.cc_recipients==email).order_by
    (Email.internal_date.desc()).all())
    return email