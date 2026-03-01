from fastapi import APIRouter,Depends
from sqlalchemy.orm import session
from app.routes.auth import get_db
from app.models.models import User
from app.schemas.user import UserResponse
from typing import List

router=APIRouter(prefix="/admin",tags=["admin"])

@router.get("/users",response_model=List[UserResponse])
def get_all_users_db(db:session=Depends(get_db)):
    users=db.query(User).all()
    return users
