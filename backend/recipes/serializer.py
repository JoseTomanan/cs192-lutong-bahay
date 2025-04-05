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
        ingredient_list = [
            Ingredients.objects.get(id=i["ingredient"]).ingredientName
            for i in ingredients
        ]
        return ingredient_list
class RecipeIngredientsSerializer(serializers.ModelSerializer):

    class Meta:
        model = RecipeIngredients
        fields = "__all__"
