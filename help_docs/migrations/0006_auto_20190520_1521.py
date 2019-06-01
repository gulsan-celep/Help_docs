# Generated by Django 2.2 on 2019-05-20 12:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('help_docs', '0005_auto_20190517_1652'),
    ]

    operations = [
        migrations.CreateModel(
            name='new_content',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=2500, verbose_name='İçerik')),
                ('alt_menu', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='help_docs.AltMenu')),
                ('ust_menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='help_docs.UstMenu')),
            ],
            options={
                'verbose_name_plural': 'İçerik',
            },
        ),
        migrations.DeleteModel(
            name='new_title',
        ),
    ]
