from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, field_validator
from fastapi.middleware.cors import CORSMiddleware

from secret import (
    hash_password, verify_password,
    generate_api_key, hash_api_key
)

from db import users 
from datetime import datetime, timezone

app = FastAPI(title="Expense Tracker Auth") 

# ✅ CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://token-generate-server.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------
# 🔐 Validators
# ----------------------
def validate_password(password: str):
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")
    return password


# ----------------------
# 📦 Schemas
# ----------------------
class Signup(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def password_validation(cls, v):
        return validate_password(v)


class Login(BaseModel):
    email: EmailStr
    password: str


class ResetPassword(BaseModel):
    email: EmailStr
    new_password: str

    @field_validator("new_password")
    @classmethod
    def new_password_validation(cls, v):
        return validate_password(v)


# ----------------------
# 🚀 APIs
# ----------------------
@app.post("/signup")
def signup(data: Signup):
    if users.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="User already exists")

    users.insert_one({
        "email": data.email,
        "password_hash": hash_password(data.password),
        "created_at": datetime.now(timezone.utc)
    })

    return {"status": "User Sign-UP Successfully"}


@app.post("/login")
def login(data: Login):
    user = users.find_one({"email": data.email})

    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    api_key = generate_api_key()
    users.update_one(
        {"_id": user["_id"]},
        {"$set": {
            "api_key_hash": hash_api_key(api_key),
            "is_active": True
        }}
    )

    return {"api_key": api_key}


@app.post("/reset-password")
def reset_password(data: ResetPassword):
    user = users.find_one({"email": data.email})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    users.update_one(
        {"_id": user["_id"]},
        {"$set": {
            "password_hash": hash_password(data.new_password),
            "is_active": False,
            "api_key_hash": None
        }}
    )

    return {"message": "Password reset successful"}
