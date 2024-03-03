from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import Registration_serializer , Language_serializer , QuestionSerializer ,  TestSerializer , Choice_serializer
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView , CreateAPIView , UpdateAPIView , DestroyAPIView
# Create your views here.
from .models import Registration , Language , Question ,Test , Choice

class RegistrationList(ListAPIView):
    queryset = Registration.objects.all()
    serializer_class = Registration_serializer
    
class LanguageList(ListAPIView):
    queryset = Language.objects.all()
    serializer_class =  Language_serializer

class QuestionList(ListAPIView):
    # queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        language_id = self.request.query_params.get('language')
        return Question.objects.filter(language_id=language_id)

class ChoiceList(ListAPIView):
    queryset = Choice.objects.all()
    serializer_class = Choice_serializer
    

class TestList(ListAPIView):
    serializer_class =  TestSerializer
    
    def get_queryset(self):
        language_id = self.request.query_params.get('language')
        return Test.objects.filter(language_id=language_id)

# POST data TO  SERVER
class CreateLanguageView(CreateAPIView):
    queryset = Language.objects.all()
    serializer_class =  Language_serializer
       