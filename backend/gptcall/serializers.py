from rest_framework import serializers
from .models import GptCall

class GptCallSerializer(serializers.ModelSerializer):
    class Meta:
        model = GptCall
        fields = ('id', 'query', 'reply')