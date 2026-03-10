from pydantic import BaseModel
class UserResponse(BaseModel):
    id:int
    email:str
    provider:str
    access_token:str
    refresh_token:str

    class config:
        orm_mode=True