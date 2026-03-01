from pydantic import BaseModel
class UserResponse(BaseModel):
    id:int
    email:str
    provider:str

    class config:
        orm_mode=True