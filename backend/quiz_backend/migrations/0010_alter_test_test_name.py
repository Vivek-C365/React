# Generated by Django 5.0.2 on 2024-02-21 07:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz_backend', '0009_test_quiz_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='test',
            name='test_name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quiz_backend.language'),
        ),
    ]