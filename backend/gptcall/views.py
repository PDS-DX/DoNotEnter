from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import GptCall
from .serializers import GptCallSerializer
from .services import GPTService
import logging

class GptCallViewSet(ModelViewSet):
    queryset = GptCall.objects.all()
    serializer_class = GptCallSerializer

    # Overriding create (POST) method to use GPTService
    def create(self, request, *args, **kwargs):
        history = request.data.get("history", [])

        gpt_service = GPTService()
        gpt_calls = gpt_service.create_gpt_call(history)

        serializer = self.get_serializer(gpt_calls, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)