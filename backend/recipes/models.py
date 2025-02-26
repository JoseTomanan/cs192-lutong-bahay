from django.db import models


# Create your models here.
class Recipe(models.Model):
    recipeName = models.CharField(max_length=100)
    cookDifficulty = models.CharField(max_length=100)
    servings = models.IntegerField()
    ingredients = models.ManyToManyField("Ingredients", related_name="is_ingredient_of")
    equipment = models.CharField(max_length=1000)
    instructions = models.CharField(max_length=1000)


class Ingredients(models.Model):
    ingredientName = models.CharField(max_length=100)
    ingredientMeasurementUnit = models.CharField(max_length=100)
    caloriesPerUnit = models.IntegerField()
    proteinPerUnit = models.IntegerField()
    fatPerUnit = models.IntegerField()
    carbsPerUnit = models.IntegerField()
    quantity = models.IntegerField()

