from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.common.config import settings
from app.routers import posts, auth, users
from app.common.consts import BASE_URL, MODE

BASE_URL = BASE_URL + MODE

app = FastAPI()

origins = [
    settings.CLIENT_ORIGIN,
    "http://localhost",
    "http://localhost:80",
    "http://localhost:81",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=['Auth'], prefix=f'{BASE_URL}/auth')
app.include_router(users.router, tags=['Users'], prefix=f'{BASE_URL}/users')
app.include_router(posts.router, tags=['Posts'], prefix=f'{BASE_URL}/posts')


@app.get(BASE_URL)
def root():
    return {'message': 'hello vrame'}
