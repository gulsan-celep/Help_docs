# Generated by Django 2.2 on 2019-05-20 12:33

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('help_docs', '0007_auto_20190520_1524'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newcontent',
            name='content',
            field=ckeditor.fields.RichTextField(),
        ),
    ]