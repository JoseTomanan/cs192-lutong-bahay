from rest_framework import serializers
from .models import Recipe, Ingredients, CookedBy


class IngredientsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredients
        fields = "__all__"


class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = "__all__"


class CookedBySerializer(serializers.ModelSerializer):

    class Meta:
        model = CookedBy
        fields = "__all__"
