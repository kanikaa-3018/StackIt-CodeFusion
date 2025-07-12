import os
import re
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def rephrase_question(title: str, description: str):
    prompt = f"Rephrase the following question for better clarity. Return it in the format:\nTitle: <...>\nDescription: <...>\n\nOriginal:\nTitle: {title}\nDescription: {description}"

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    output = response.choices[0].message.content

    title_match = re.search(r'Title:\s*(.*)', output)
    description_match = re.search(r'Description:\s*(.*)', output)

    return {
        "title": title_match.group(1).strip() if title_match else title,
        "description": description_match.group(1).strip() if description_match else description
    }
