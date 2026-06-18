from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# -------------------------------
# SUMMARIZE EMAIL
# -------------------------------
def summarize_email(content: str):
    try:
        prompt = f"""
        Summarize the following email into 3-5 short bullet points.

Rules:
- Keep it concise and precise
- Focus only on key message, actions, deadlines, and sender intent
- Ignore HTML tags, CSS, scripts, signatures, and unnecessary formatting
- If HTML content exists, extract only meaningful text
- Do not repeat information
- Maximum 1 short sentence per bullet
- Output only bullet points

        Email:
        {content}
        """

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3
        )

        return response.choices[0].message.content

    except Exception as e:
        return str(e)


# -------------------------------
# GENERATE EMAIL CONTENT
# -------------------------------
def generate_email_content(user_prompt: str):
    try:
        prompt = f"""
        You are professional email writer.

        Generate email content based on:
        {user_prompt}

        Keep format:
        Subject:
        Body:
        """

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7
        )

        return response.choices[0].message.content

    except Exception as e:
        return str(e)