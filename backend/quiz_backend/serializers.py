from rest_framework import serializers
from .models import Registration , Language , Question ,Test , Choice

class Registration_serializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['id', 'name','username', 'email','password'] 

class Language_serializer(serializers.ModelSerializer):
    class Meta:
        model=Language
        fields=['id', 'name']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class Choice_serializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'

class  TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'