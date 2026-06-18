from fastapi import APIRouter
from pydantic import BaseModel
from app.services.aiSummarizerGenerator import summarize_email, generate_email_content

router = APIRouter(prefix="/ai", tags=["AI"])

# -------------------------------
# REQUEST MODELS
# -------------------------------
class SummarizeRequest(BaseModel):
    content: str


class GenerateRequest(BaseModel):
    prompt: str


# -------------------------------
# SUMMARIZE
# -------------------------------
@router.post("/summarize")
def summarize_mail(data: SummarizeRequest):
    result = summarize_email(data.content)
    return {
        "summary": result
    }


# -------------------------------
# GENERATE MAIL
# -------------------------------
@router.post("/generate")
def generate_mail(data: GenerateRequest):
    result = generate_email_content(data.prompt)
    return {
        "generated_mail": result
    }