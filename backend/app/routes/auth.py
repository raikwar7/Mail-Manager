"""
routes/auth.py
--------------
Handles Google OAuth login & callback logic
"""
from fastapi import APIRouter,Depends,Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.schemas.database  import sessionLocal
from app.models.models import User
from app.authentication.oauth import oauth
from app.authentication.auth import create_jwt

#router with/auth prefic

router=APIRouter(prefix="/auth",tags=["Auth"])

def get_db():
    """
    Dependency to get DB session
    Automatically closes session after request
    """
    db=sessionLocal()
    try:
        yield db
    finally:
        db.close()
    
@router.get("/google/login")
async def google_login(request:Request):
    """
    Step 1:
    Redirect user to Google login page
    """
    redirect_ui="http://localhost:8000/auth/google/callback"
    return await oauth.google.authorize_redirect(request,redirect_ui)

@router.get("/google/callback")
async def google_callback(request:Request,db:Session=Depends(get_db)):
    """
    Step 2:
    Google redirects back to this endpoint after login

    - Fetch user info from Google
    - Store user in DB if not exists
    - Generate JWT token
    """
    token=await oauth.google.authorize_access_token(request)
    user_info=token.get("userinfo")
    email=user_info.get("email")

    #chekc if user already exist

    user=db.query(User).filter(User.email==email).first()
    if not  user:
        user=User(email=email,provider="google")
        db.add(user)
        db.commit()

    jwt_token=create_jwt(email)
# Frontend URL (Vite runs on 5173)
    frontend_url = "http://localhost:5173"

    # Redirect to frontend with token
    return RedirectResponse(
        url=f"{frontend_url}/login-success?token={jwt_token}"
    )

