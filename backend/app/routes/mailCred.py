from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.routes.user import get_db
from app.models.mailCredModel import MailConfig
from app.schemas.mailCredSchemas import MailConfigCreate, MailConfigResponse
from app.routes.user import get_current_user
from app.models.models import User

router = APIRouter(prefix="/mail-config", tags=["Mail Config"])


# ---------------- GET MAIL CONFIG ----------------
@router.get("/", response_model=MailConfigResponse)
def get_mail_config(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    config = (
        db.query(MailConfig)
        .filter(MailConfig.user_id == current_user.id)
        .first()
    )

    if not config:
        raise HTTPException(
            status_code=404,
            detail="Mail configuration not found"
        )

    return config


# ---------------- CREATE / UPDATE ----------------
@router.post("/", response_model=MailConfigResponse)
def save_mail_config(
    payload: MailConfigCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing_config = (
        db.query(MailConfig)
        .filter(MailConfig.user_id == current_user.id)
        .first()
    )

    # UPDATE existing
    if existing_config:
        existing_config.EMAIL_SERVICE = payload.EMAIL_SERVICE
        existing_config.MAIL_SERVER = payload.MAIL_SERVER
        existing_config.MAIL_PORT = payload.MAIL_PORT
        existing_config.MAIL_USE_TLS = payload.MAIL_USE_TLS
        existing_config.MAIL_USERNAME = payload.MAIL_USERNAME
        existing_config.MAIL_PASSWORD = payload.MAIL_PASSWORD

        db.commit()
        db.refresh(existing_config)
        return existing_config

    # CREATE new
    new_config = MailConfig(
        user_id=current_user.id,
        EMAIL_SERVICE=payload.EMAIL_SERVICE,
        MAIL_SERVER=payload.MAIL_SERVER,
        MAIL_PORT=payload.MAIL_PORT,
        MAIL_USE_TLS=payload.MAIL_USE_TLS,
        MAIL_USERNAME=payload.MAIL_USERNAME,
        MAIL_PASSWORD=payload.MAIL_PASSWORD
    )

    db.add(new_config)
    db.commit()
    db.refresh(new_config)

    return new_config