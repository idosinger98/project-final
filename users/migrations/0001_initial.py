# Generated by Django 4.2 on 2023-06-26 16:07

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('profile_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('phone_number', models.CharField(max_length=10,
                                                  validators=[django.core.validators.RegexValidator(
                                                      message='Phone number must be numeric.', regex='^[0-9]*$'),
                                                   django.core.validators.MinLengthValidator(10)])),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE,
                                                 to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]