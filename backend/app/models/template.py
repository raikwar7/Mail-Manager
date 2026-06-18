from sqlalchemy import Column,String,Text,JSON,Integer
from app.schemas.database import Base

from sqlalchemy import Column, Integer, String, Text

class Template(Base):
    __tablename__ = "templates"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), unique=True)
    subject = Column(String(255))
    body = Column(Text)