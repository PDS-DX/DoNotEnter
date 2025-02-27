from openai import OpenAI
from django.conf import settings
from .models import GptCall

class GPTService:
    def __init__(self, openai_client=None):
        # Dependency Injection: Allows you to pass a mock client for testing
        self.client = openai_client or OpenAI(api_key=settings.OPENAI_API_KEY)

    def create_gpt_call(self, query: str, history: list = None):
        if history is None:
            history = [
                {"role": "system", "content": "You are an inquisitive and mysterious man. You only give conversational responses, not verbose ones."},
                {"role": "user", "content": "Ask me a random question about my past."},
            ]

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=history,
        )

        reply = response.choices[0].message.content

        # Save to database
        new_gpt_call = GptCall.objects.create(query=query, reply=reply)
        return new_gpt_call
