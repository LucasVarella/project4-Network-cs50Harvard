# Generated by Django 4.1.4 on 2023-01-26 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0007_follow_following'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(max_length=320),
        ),
    ]
