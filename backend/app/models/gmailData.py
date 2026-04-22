from sqlalchemy import Column, BigInteger, String, Text, JSON, Boolean
from app.schemas.database import Base
from sqlalchemy import Column, BigInteger, String, Text, JSON, Boolean
from app.schemas.database import Base


class Email(Base):
    __tablename__ = "emails"

    id = Column(BigInteger, primary_key=True, index=True)

    # Gmail identifiers
    message_id = Column(String(255), unique=True, index=True)
    thread_id = Column(String(255), index=True)
    history_id = Column(String(255))
    # Email metadata
    sender = Column(Text)
    to_recipients = Column(JSON)
    cc_recipients = Column(JSON)
    bcc_recipients = Column(JSON)
    reply_to = Column(Text)

    subject = Column(Text)
    snippet = Column(Text)

    # Body
    body_text = Column(Text)
    body_html = Column(Text)

    # Attachments
    has_attachments = Column(Boolean, default=False)
    attachments = Column(JSON)  # [{filename, mimeType, size, attachmentId}]

    # Labels & metadata
    label_ids = Column(JSON)
    size_estimate = Column(BigInteger)
    internal_date = Column(BigInteger)

    # Raw backup (VERY IMPORTANT)
    raw_headers = Column(JSON)
    raw_payload = Column(JSON)