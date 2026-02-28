from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.schemas.database import Base,engine
from app.routes.auth import router


Base.metadata.create_all(bind=engine)
app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)
class NumberInput(BaseModel):
    number:int

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}

@app.post("/double")
def double_number(data:NumberInput):
    return{
        "result":data.number*2
    }