from django.db import models

# Create your models here.
class Registration  (models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField()
    password = models.CharField(max_length = 100)

    def __str__(self):
        return self.name

class Language(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100 , unique=True)

    def __str__(self):
        return self.name


class Question(models.Model):
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text


class Test(models.Model):
    id =  models.AutoField(primary_key=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    quiz_score = models.FloatField(max_length = 100 , default =  0 )