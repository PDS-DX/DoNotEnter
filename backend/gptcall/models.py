from django.db import models

# Create your models here.

class GptCall(models.Model):
    role = models.TextField()
    refusal = models.TextField(null=True, blank=True)
    content = models.TextField()