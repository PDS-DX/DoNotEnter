from django.contrib import admin
from .models import GptCall

class GptCallAdmin(admin.ModelAdmin):
    list_display = ('query', 'reply')

# Register your models here.

admin.site.register(GptCall, GptCallAdmin)

