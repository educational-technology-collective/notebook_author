# Generated by Django 5.0.4 on 2024-04-11 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nbauthor', '0004_alter_assignment_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='metadata_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='metadata_stub',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='stub',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='solution',
            name='stub',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='test',
            name='category',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='test',
            name='metadata_stub',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='test',
            name='stub',
            field=models.TextField(blank=True, null=True),
        ),
    ]
