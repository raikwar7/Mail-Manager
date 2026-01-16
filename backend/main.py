from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
class NumberInput(BaseModel):
    number:int

@app.post("/double")
def double_number(data:NumberInput):
    return{
        "result":data.number*2
    }