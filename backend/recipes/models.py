from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Ingredients(models.Model):
    ingredientName = models.CharField(max_length=100)
    ingredientMeasurementUnit = models.CharField(max_length=100)
    caloriesPerUnit = models.IntegerField()
    proteinPerUnit = models.IntegerField()
    fatPerUnit = models.IntegerField()
    carbsPerUnit = models.IntegerField()

class UserIngredientsInventory(models.Model):
    ingredientId = models.ForeignKey(Ingredients, on_delete=models.CASCADE, related_name='inventory')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    quantity = models.IntegerField()

class Recipe(models.Model):
    recipeName = models.CharField(max_length=100)
    price = models.FloatField()
    cookDifficulty = models.CharField(max_length=100)
    servings = models.IntegerField()
    equipment = models.CharField(max_length=1000)
    instructions = models.CharField(max_length=1000)
    ratings = models.FloatField()


class CookedBy(models.Model):
    recipe = models.ForeignKey(
        Recipe, related_name="has_ingredients", on_delete=models.CASCADE
    )
    ingredient = models.ForeignKey(
        Ingredients, related_name="is_ingredient_of", on_delete=models.CASCADE
    )
