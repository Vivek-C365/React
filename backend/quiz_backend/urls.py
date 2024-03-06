from django.urls import path
from quiz_backend import views

urlpatterns = [
    path('registration/',views.RegistrationList.as_view()),
    path('language/',views.LanguageList.as_view()),
    path('questions/', views.QuestionList.as_view()),
    path('test/', views.TestList.as_view()),
    path('choice/', views.ChoiceList.as_view()),
    path('createlanguage/', views.CreateLanguageView.as_view(), name='create_language'),
    path('languages/<int:pk>/delete/', views.LanguageDeleteView.as_view(), name='language-delete'),
    path('languages/<int:pk>/update/', views.LanguageUpdateView.as_view(), name='language-update'),
    path('add_question/', views.CreateQuestionview.as_view(), name='Create_question'),
    path('add_choice/', views.CreateChoiceView.as_view(), name='Create_Choice'),

    
]
