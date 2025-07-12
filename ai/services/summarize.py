import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize_answers(answers):
    full_text = "\n".join(answers)
    prompt = f"Summarize the following answers like an Amazon review summary:\n\n{full_text}"
    
    response = client.chat.completions.create(
        model="gpt-4.1-mini", 
        messages=[{"role": "user", "content": prompt}]
    )
    
    return response.choices[0].message.content
