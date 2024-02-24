from django.contrib import admin
from .models import Registration , Language , Question , Choice,  Test

# Register your models here.
admin.site.register(Registration)
admin.site.register(Language)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(Test)
