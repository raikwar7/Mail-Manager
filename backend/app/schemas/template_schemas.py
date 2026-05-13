from pydantic import BaseModel

class templateRecord(BaseModel):
  
    title:str
    subject:str
    body:str

    class config:
        orm_mode=True
 

# ✅ OUTPUT (with id)
class templateResponse(templateRecord):
    id: int

     