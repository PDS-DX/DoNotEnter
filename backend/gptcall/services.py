from openai import OpenAI
from django.conf import settings
from .models import GptCall

class GPTService:
    def __init__(self, openai_client=None):
        # Dependency Injection: Allows you to pass a mock client for testing
        self.client = openai_client or OpenAI(api_key=settings.OPENAI_API_KEY)

    def create_gpt_call(self, history: list = None):
        if len(history) == 0:
            history = [
                {"role": "system", "content": "You are an inquisitive and mysterious person. You only give conversational responses, not verbose ones."},
                {"role": "user", "content": "Ask me a random question about my past."},
            ]

        GptCall.objects.create(role="user", content=history[len(history) - 1], refusal=None)

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=history,
        )

        history.append({
            "role": response.choices[0].message.role,
            "content": response.choices[0].message.content,
            "refusal": response.choices[0].message.refusal
        })

        GptCall.objects.create(role="assistant", content=history[len(history) - 1], refusal=None)

        print(response.to_json())

        # Save to database
        return history
