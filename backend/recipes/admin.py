from django.contrib import admin
from .models import Recipe, Ingredients, UserIngredientsInventory, RecipeIngredients

# Register your models here.
admin.site.register(Recipe)
admin.site.register(Ingredients)
admin.site.register(UserIngredientsInventory)
admin.site.register(RecipeIngredients)