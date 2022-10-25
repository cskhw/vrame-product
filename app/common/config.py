import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    DATABASE_PORT: int
    POSTGRES_HOST: str
    POSTGRES_HOSTNAME: str
    POSTGRES_DB: str

    REFRESH_TOKEN_EXPIRES_IN: int
    ACCESS_TOKEN_EXPIRES_IN: int
    JWT_ALGORITHM: str

    EMAIL_ADDR: str
    EMAIL_PW: str

    CLIENT_ORIGIN: str

    VERIFICATION_SECRET: str

    JWT_PUBLIC_KEY: str
    JWT_PRIVATE_KEY: str

    class Config:
        case_sensitive = True
        env_file = "C:\\Users\\Administrator\\Documents\\GitHub\\vrame-product\\.env"


settings = Settings()
