"""
oauth.py
---------
Configures Google OAuth using Authlib
"""
 
from authlib.integrations.starlette_client import OAuth

#oauth oibject
oauth=OAuth()

#register google oauth provider
oauth.register(
    name="google",
    client_id="GOOGLE_CLIENT_ID",
    client_secret="GOOGLE_CLIENT_SECRET",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        "scope":"openid email profile"
    },
)