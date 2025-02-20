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
        query = request.data.get("query", "")
        if not query:
            return Response({"error": "Query is required"}, status=status.HTTP_400_BAD_REQUEST)

        gpt_service = GPTService()
        logging.info(f"Creating GPT call with query: {query}")
        gpt_call = gpt_service.create_gpt_call(query)

        serializer = self.get_serializer(gpt_call)
        return Response(serializer.data, status=status.HTTP_201_CREATED)