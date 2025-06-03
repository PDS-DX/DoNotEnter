from openai import OpenAI
from django.conf import settings
from .models import GptCall

class GPTService:
    def __init__(self, openai_client=None):
        # Dependency Injection: Allows you to pass a mock client for testing
        self.client = openai_client or OpenAI(api_key=settings.OPENAI_API_KEY)

    def create_gpt_call(self, history: list = None):
        history = history or []

        if len(history) == 0:
            history = [
                {
                    "role": "system",
                    "content": (
                        "You are an inquisitive and mysterious person. "
                        "You only give conversational responses, not verbose ones."
                    ),
                },
                {"role": "user", "content": "Ask me a random question about my past."},
            ]

        last_message = history[-1]
        GptCall.objects.create(
            role=last_message.get("role"),
            content=last_message.get("content"),
            refusal=last_message.get("refusal"),
        )

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=history,
        )

        history.append(
            {
                "role": response.choices[0].message.role,
                "content": response.choices[0].message.content,
                "refusal": response.choices[0].message.refusal,
            }
        )

        last_message = history[-1]
        GptCall.objects.create(
            role=last_message.get("role"),
            content=last_message.get("content"),
            refusal=last_message.get("refusal"),
        )

        print(response.to_json())

        # Save to database
        return history
