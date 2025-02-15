from django.db import models

# Create your models here.

class GptCall(models.Model):
    query = models.TextField()
    reply = models.TextField()

    def __str__(self):
        return self.query