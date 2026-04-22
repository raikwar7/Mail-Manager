from fastapi import APIRouter,Depends
from sqlalchemy import or_
from sqlalchemy.orm import session
from app.routes.user import get_db
from app.models.gmailData import Email
from datetime import datetime


router=APIRouter()
 

@router.get('mailCount/sent/{email}')
def get_sent_mail_count(email:str,
                        start:datetime,
                        to:datetime,
                        db:session=Depends(get_db)):
    from_=int(start.timestamp()*1000)
    to=int(to.timestamp()*1000)
    query=(db.query(Email)
    .filter(Email.sender.like(f"%{email}%"))
    .filter(Email.internal_date.between(from_,to)))
    mails=query.all()
    count=query.count()
    return{
        "mails":mails,
        "count":count
    }