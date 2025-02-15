from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GptCallSerializer
from .models import GptCall

# Create your views here.

class GptCallView(viewsets.ModelViewSet):
    serializer_class = GptCallSerializer
    queryset = GptCall.objects.all()