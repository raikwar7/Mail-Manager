from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from app.routes import admin
from app.routes import user
from app.routes import gmail_data
from app.routes import MailView
from app.routes import dashboard
from app.schemas.database import Base, engine
from app.routes.auth import router
from app.routes import templates_routes
from app.routes import mailCred
from app.routes import sendAmail
from app.routes import aiSummarizerGenRouter

# Load environment variables
load_dotenv()
print("the cliend id is",os.getenv("GOOGLE_CLIENT_ID"))


# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# 🔐 Add Session Middleware (REQUIRED FOR OAUTH)
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET", "dev-secret-key"),  # use .env in prod
)

# 🌍 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL (not "*")
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth routes
app.include_router(router)
app.include_router(admin.router)
app.include_router(user.router)
app.include_router(gmail_data.router)
app.include_router(MailView.router)
app.include_router(dashboard.router)
app.include_router(templates_routes.router)
app.include_router(mailCred.router)
app.include_router(sendAmail.router)
app.include_router(aiSummarizerGenRouter.router)


# -------------------------
# Test Routes (Optional)
# -------------------------

class NumberInput(BaseModel):
    number: int


@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}


@app.post("/double")
def double_number(data: NumberInput):
    return {
        "result": data.number * 2
    }