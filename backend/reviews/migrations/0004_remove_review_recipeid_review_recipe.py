# Generated by Django 5.1.6 on 2025-03-05 08:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0006_recipe_ratings'),
        ('reviews', '0003_rename_rating_review_reviewrating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='recipeId',
        ),
        migrations.AddField(
            model_name='review',
            name='recipe',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='recipes.recipe'),
        ),
    ]
