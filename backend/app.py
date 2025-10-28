# app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from src.inference import predict_emotion
from src.gemini_api import call_gemini_api

# ---------------------------
# Load environment variables
# ---------------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("⚠️ Gemini API key not set. Please configure GEMINI_API_KEY in environment or .env file.")

# ---------------------------
# FastAPI setup
# ---------------------------
app = FastAPI(title="Elyvra Chatbot Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # update frontend URLs if different
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Request schema
# ---------------------------
class Message(BaseModel):
    text: str
    user_id: str | None = "default"  # optional user_id for memory handling

# ---------------------------
# Special triggers
# ---------------------------
special_triggers = {
    "story": "Sure! Do you want me to start the story now? 🌸",
    "advice": "I can give some advice based on your situation. 🌟"
}

# ---------------------------
# Chat endpoint
# ---------------------------
@app.post("/chat")
def chat(msg: Message):
    user_text = msg.text.strip()
    user_id = msg.user_id or "default"

    if not user_text:
        return {"response": "Please say something! 🌸"}

    lower_text = user_text.lower()
    
    # Special trigger keywords
    if "wanna hear a story" in lower_text or "tell me a story" in lower_text:
        return {"response": special_triggers["story"]}
    if "need advice" in lower_text or "give advice" in lower_text:
        return {"response": special_triggers["advice"]}

    # 1️⃣ Predict emotion
    emotion = predict_emotion(user_text)

    # 2️⃣ Get Gemini response with memory
    response_text = call_gemini_api(user_text, emotion, user_id)

    return {"response": response_text}

# ---------------------------
# Reset memory (optional)
# ---------------------------
@app.post("/reset")
def reset_memory():
    from src.gemini_api import user_sessions
    user_sessions.clear()
    return {"message": "Memory cleared 🌸"}

# ---------------------------
# Root test endpoint
# ---------------------------
@app.get("/")
def read_root():
    return {"message": "Elyvra Chatbot Backend is running 🌸"}
