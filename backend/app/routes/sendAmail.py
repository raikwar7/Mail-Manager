from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

from app.routes.user import User
from app.routes.user import get_current_user
from app.routes.user import get_db
from sqlalchemy.orm import Session
from app.models.template import Template
from app.schemas.template_schemas import templateResponse
from app.models.mailCredModel import MailConfig
from app.schemas.swndMailSchema import SendMailSchema

router = APIRouter(prefix="/mail", tags=["mail"])

@router.get("/templates", response_model=list[str])
def get_template_titles(
    db: Session = Depends(get_db)
):
    titles = db.query(Template.title).all()
    return [title[0] for title in titles]

@router.get("/template/{title}")
def get_template_by_title(
    title: str,
    db: Session = Depends(get_db)
):
    template = (
        db.query(Template)
        .filter(Template.title == title)
        .first()
    )

    if not template:
        raise HTTPException(
            status_code=404,
            detail="Template not found"
        )

    return template

@router.post("/send")
async def send_mail(
    payload: SendMailSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # fetch smtp config of logged-in user
    config = (
        db.query(MailConfig)
        .filter(MailConfig.MAIL_USERNAME == current_user.email)
        .first()
    )

    if not config:
        raise HTTPException(
            status_code=404,
            detail="Mail config not found"
        )

    conf = ConnectionConfig(
        MAIL_USERNAME=config.MAIL_USERNAME,
        MAIL_PASSWORD=config.MAIL_PASSWORD,
        MAIL_FROM=config.MAIL_USERNAME,
        MAIL_PORT=config.MAIL_PORT,
        MAIL_SERVER=config.MAIL_SERVER,
        MAIL_STARTTLS=config.MAIL_USE_TLS,
        MAIL_SSL_TLS=False,
        USE_CREDENTIALS=True
    )

    message = MessageSchema(
        subject=payload.subject,
        recipients=[payload.to],
        body=payload.body,
        subtype="html"
    )

    try:
        fm = FastMail(conf)
        await fm.send_message(message)

        return {
            "message": "Mail sent successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
'''
@router.post("/send")
def send_mail(
    payload: SendMailSchema,
    db: Session = Depends(get_db),
    current_user=Depends(User)
):
    # fetch smtp credentials
    config = (
        db.query(MailConfig)
        .filter(MailConfig.user_id == current_user.id)
        .first()
    )

    if not config:
        raise HTTPException(
            status_code=404,
            detail="Mail config not found"
        )

    # fetch template by title
    template = (
        db.query(Template)
        .filter(Template.title == payload.title)
        .first()
    )

    if not template:
        raise HTTPException(
            status_code=404,
            detail="Template not found"
        )

    # if user edits, use edited values
    final_subject = payload.subject or template.subject
    final_body = payload.body or template.body

    try:
        msg = MIMEMultipart()
        msg["From"] = config.MAIL_USERNAME
        msg["To"] = payload.to
        msg["Subject"] = final_subject

        msg.attach(MIMEText(final_body, "plain"))

        server = smtplib.SMTP(
            config.MAIL_SERVER,
            config.MAIL_PORT
        )

        if config.MAIL_USE_TLS:
            server.starttls()

        server.login(
            config.MAIL_USERNAME,
            config.MAIL_PASSWORD
        )

        server.sendmail(
            config.MAIL_USERNAME,
            payload.to,
            msg.as_string()
        )

        server.quit()

        return {
            "message": "Mail sent successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )'''