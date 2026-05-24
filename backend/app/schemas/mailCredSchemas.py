from pydantic import BaseModel, EmailStr

class MailConfigBase(BaseModel):
    EMAIL_SERVICE: str
    MAIL_SERVER: str
    MAIL_PORT: int
    MAIL_USE_TLS: bool
    MAIL_USERNAME: EmailStr
    MAIL_PASSWORD: str


class MailConfigCreate(MailConfigBase):
    pass


class MailConfigResponse(MailConfigBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True