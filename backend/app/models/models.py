"""
models.py
----------
Defines database tables using SQLAlchemy ORM
"""
from sqlalchemy import Column,Integer,String
from app.schemas.database import Base 

class User(Base):
     """
    User table:
    - Stores Google authenticated users only
    - No password field (OAuth based)
    """
     __tablename__="users"
     id=Column(Integer,primary_key=True,index=True)
     email=Column(String(100),unique=True,index=True)
     provider=Column(String(50))
     access_token = Column(String)
     refresh_token = Column(String)   
