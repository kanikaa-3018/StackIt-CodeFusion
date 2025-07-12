from openai import OpenAI
import os
import re

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_tags(text: str):
    prompt = f"Suggest 3 to 5 relevant tags (without backticks or the word 'Tags:') for the following StackOverflow-style question:\n\n{text}\n\nTags:"

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.choices[0].message.content

    cleaned = re.sub(r"(?i)^tags:\s*", "", raw.strip())
    cleaned = cleaned.replace("`", "")
    cleaned = cleaned.replace("\n", ",")

    tags = [tag.strip().lower() for tag in cleaned.split(",") if tag.strip()]
    return tags
