# src/gemini_api.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

# ---------------------------
# Setup Gemini API
# ---------------------------
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# ---------------------------
# Create model with concise behavior
# ---------------------------
model = genai.GenerativeModel(
    "ggemini-2.5-flash",
    system_instruction=(
        "You are Elyvra — a warm, concise, and emotionally aware AI companion. "
        "Keep replies short (1–3 sentences), natural, and kind. "
        "Maintain awareness of prior conversation context and user emotions."
    ),
)

# ---------------------------
# Memory storage (in-memory)
# ---------------------------
user_sessions = {}

# ---------------------------
# Function to call Gemini API
# ---------------------------
def call_gemini_api(user_input: str, emotion: str, user_id: str = "default") -> str:
    """
    Send user input to Gemini with emotional and contextual awareness.
    Maintains per-user memory in 'user_sessions'.
    """
    # Create or get chat session
    if user_id not in user_sessions:
        user_sessions[user_id] = model.start_chat(history=[])

    chat = user_sessions[user_id]

    # Build prompt with emotion context
    prompt = f"The user seems {emotion}. Reply concisely and empathetically to: {user_input}"

    try:
        response = chat.send_message(prompt)
        reply = response.text.strip()
    except Exception as e:
        reply = "Sorry, I ran into an issue while thinking about that. 💭"
        print(f"⚠️ Gemini API error: {e}")

    return reply
