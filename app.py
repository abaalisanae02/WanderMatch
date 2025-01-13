import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)
OPENAI_API_KEY= "sk-<your-openai-api-key>"

# Initialize OpenAI client
client = openai.OpenAI(api_key=OPENAI_API_KEY)


def chat_gpt(prompt):
    """Function to interact with OpenAI Chat API."""
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        # Extract content from the response
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise Exception(f"OpenAI API error: {str(e)}")


@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.json
        answers = data["answers"]

        # Construct the prompt
        prompt = f"""
        Based on the following preferences, suggest the top 3 travel destinations with a short description:
        Preferences:
        - Landscape: {answers[0]}
        - Weather: {answers[1]}
        - Activities: {answers[2]}

        Provide recommendations in the format:
        Destination Name: Short description.
        """

        # Get response from chat_gpt function
        suggestions_text = chat_gpt(prompt)
        suggestions = suggestions_text.split("\n")

        # Parse suggestions into a structured format
        results = [{"name": s.split(":")[0].strip(), "description": s.split(":")[1].strip()} for s in suggestions if ":" in s]

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)