"""
auth.py
--------
Handles JWT creation for authenticated users
"""
from jose import jwt
from datetime import datetime,timedelta

SECRET_KEY="Secret7"
ALGORITHM="HS256"

def create_jwt(email:str):
    """
    Create a JWT token for the logged-in user

    Payload:
    - sub: user's email
    - exp: token expiration time
    """
    payload={
        "sub":email,
"exp": datetime.utcnow() + timedelta(hours=48)    }
    return jwt.encode(payload,SECRET_KEY,algorithm=ALGORITHM)

