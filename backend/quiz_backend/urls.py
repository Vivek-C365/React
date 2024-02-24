from django.urls import path
from quiz_backend import views

urlpatterns = [
    path('registration/',views.RegistrationList.as_view()),
    path('language/',views.LanguageList.as_view()),
    path('questions/', views.QuestionList.as_view()),
    path('test/', views.TestList.as_view()),
    path('choice/', views.ChoiceList.as_view()),
    
]
