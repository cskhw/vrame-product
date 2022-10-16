from pydantic import BaseModel



class SimpleResponse(BaseModel):
    status: int
    detail: str