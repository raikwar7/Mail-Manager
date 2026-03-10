from sqlalchemy import Column, BigInteger, String, Text, JSON, Boolean
from app.schemas.database import Base

class Email(Base):
    __tablename__ = "emails"

    id = Column(BigInteger, primary_key=True, index=True)
    message_id = Column(String(255), unique=True, index=True)
    thread_id = Column(String(255))
    history_id = Column(String(255))

    sender = Column(Text)
    to_recipients = Column(Text)
    cc_recipients = Column(Text)
    bcc_recipients = Column(Text)
    reply_to = Column(Text)

    subject = Column(Text)
    snippet = Column(Text)
    body_text = Column(Text)
    body_html = Column(Text)

    label_ids = Column(JSON)
    size_estimate = Column(BigInteger)
    internal_date = Column(BigInteger)

    has_attachments = Column(Boolean, default=False)

    raw_headers = Column(JSON)
    raw_payload = Column(JSON)