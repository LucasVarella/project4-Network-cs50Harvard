# Generated by Django 4.1.4 on 2023-02-17 02:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0009_post_edited'),
    ]

    operations = [
        migrations.RenameField(
            model_name='like',
            old_name='User',
            new_name='user',
        ),
    ]
