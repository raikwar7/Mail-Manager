from sqlalchemy import Column,String,Text,JSON,Integer
from app.schemas.database import Base

class Template(Base):
    __tablename__="templates"

    id=Column(Integer,primary_key=True,index=True,autoincrement=True)
    title=Column(String(255),unique=True)
    subject=Column(String(255))
    body=Column(String(255))