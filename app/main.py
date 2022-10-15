from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import user, auth, post
from app.consts import BASE_URL

app = FastAPI()

origins = [
    settings.CLIENT_ORIGIN,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=['Auth'], prefix=f'{BASE_URL}/auth')
app.include_router(user.router, tags=['Users'], prefix=f'{BASE_URL}/users')
app.include_router(post.router, tags=['Posts'], prefix=f'{BASE_URL}/posts')


@app.get(f'{BASE_URL}/')
def root():
    return {'message': 'hello vrame'}
