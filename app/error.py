from http.client import HTTPException
from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

app = FastAPI()

errors = {
    'InvaildValueException': {
        'code': status.HTTP_304_NOT_MODIFIED,
        'detail': "Invaild data was sent. Please check data.",
    },
}


"""
InvaildValueException:422: 유효하지 않은 값이 요청됐을 때 사용함
"""

# HTTPException 커스텀
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=jsonable_encoder({"detail": exc.detail, "code": exc.status_code}),
    )

# 422: 값이 유효하지 않을 때 사용함
class InvaildValueException(HTTPException):
    def __init__(self, body: str = {}):
        self.body = body

@app.exception_handler(InvaildValueException)
async def invaild_value_exception_handler(request: Request, exc: InvaildValueException):
    print("invaild_value_exception_handler")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": 'Invaild data was sent. Please check data.', "body": exc.body}),
    )




@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )

