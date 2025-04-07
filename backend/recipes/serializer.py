from rest_framework import serializers
from .models import Recipe, Ingredients, RecipeIngredients#, CookedBy


class IngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = "__all__"

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = "__all__"

    def get_ingredients(self, recipe):
        ingredients = RecipeIngredientsSerializer(
            RecipeIngredients.objects.filter(recipe=recipe.id), many=True
        ).data
        ingredient_ids = [
            Ingredients.objects.get(id=i["ingredientId"]).id
            for i in ingredients
        ]
        ingredient_objects = Ingredients.objects.filter(id__in=ingredient_ids)
        serialized_ingredients = IngredientsSerializer(ingredient_objects, many=True).data
        return ingredients
    

class RecipeIngredientsSerializer(serializers.ModelSerializer):
    ingredientName = serializers.SerializerMethodField()

    class Meta:
        model = RecipeIngredients
        fields = "__all__"

    def get_ingredientName(self, recipe_ingredient):
        ingredientName = IngredientsSerializer(Ingredients.objects.get(pk=recipe_ingredient.ingredientId.id)).data["ingredientName"]
        return ingredientName
