# Generated by Django 4.2.2 on 2023-07-13 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='title',
            field=models.CharField(default='No Title', max_length=50),
        ),
    ]