import bcrypt
import secrets
import hashlib

def hash_password(password: str) -> bytes:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode(), hashed)

def generate_api_key():
    return secrets.token_hex(16)

def hash_api_key(key: str):
    return hashlib.sha256(key.encode()).hexdigest()

