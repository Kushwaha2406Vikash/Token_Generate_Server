from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

try:
    # Create client (SYNC)
    client = MongoClient(os.getenv("mongo_uri"))

    # Ping to confirm connection
    client.admin.command("ping")
    print("Connected successfully")

    # Select DB & collection
    db = client["expense_tracker"]
    users = db["users"]   # ✅ EXPORT THIS

except Exception as e:
    raise Exception(f"The following error occurred: {e}")
