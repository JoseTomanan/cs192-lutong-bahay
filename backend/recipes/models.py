from django.db import models

# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=100)
    ingredients = models.CharField(max_length=100)
    directions = models.CharField(max_length=100)
    