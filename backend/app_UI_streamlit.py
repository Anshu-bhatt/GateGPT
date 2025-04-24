# app_flask.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))  # make sure this is set in your .env file

# Initialize Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat(history=[])

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

@app.route("/chat", methods=["POST"])
def chat_endpoint():
    try:
        data = request.json
        user_input = data.get("message", "")

        if not user_input:
            return jsonify({"error": "No message provided"}), 400

        response_stream = chat.send_message(user_input, stream=True)
        full_response = ""

        for chunk in response_stream:
            full_response += chunk.text

        return jsonify({"reply": full_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
