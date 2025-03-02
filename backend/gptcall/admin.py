from django.contrib import admin
from .models import GptCall

class GptCallAdmin(admin.ModelAdmin):
    list_display = ('role', 'refusal', 'content')

# Register your models here.

admin.site.register(GptCall, GptCallAdmin)

