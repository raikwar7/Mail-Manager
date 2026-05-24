from pydantic import BaseModel, EmailStr

class SendMailSchema(BaseModel):
    to: EmailStr
    subject: str
    body: str