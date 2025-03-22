from rest_framework.decorators import api_view
from rest_framework.permissions import BasePermission
from rest_framework.response import Response

from django.shortcuts import render
from django.db import OperationalError, connection
from django.db.models import Count

from .models import Recipe, Ingredients, CookedBy
from .serializer import RecipeSerializer, IngredientsSerializer, CookedBySerializer

from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .custom_permissions import IsAdminOrReadOnly


# Create your views here.
@api_view(["GET", "POST"])
def get_recipes(request):
    if request.method == "GET":
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)
    else:
        # recipe = Recipe.objects.get(recipeName=request.data["recipeName"])
        # serializer = RecipeSerializer(recipe, many=False)
        # return Response(serializer.data)
        recipe_name = request.data.get("recipeName", None)
        if not recipe_name:
            return Response({"error": "recipeName is required"}, status=400)

        recipe = Recipe.objects.filter(recipeName=recipe_name).first()
        if not recipe:
            return Response({"error": "Recipe not found"}, status=404)

        serializer = RecipeSerializer(recipe, many=False)
        return Response(serializer.data)

@api_view(["GET", "POST"])
def get_recipe_by_id(request):
    recipes = Recipe.objects.all().filter(id=request.data.get("id"))
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)




@api_view(["POST"])
def sort_recipes(request):
    recipes = None
    if request.data.get("ingredients", None):
        ingredients = Ingredients.objects.filter(
            ingredientName__in=request.data["ingredients"]
        )
        if not ingredients:
            return Response({"error": "Ingredient(s) not found"}, status=404)

        cooked_by = CookedBy.objects.select_related("ingredient", "recipe").all()
        cooked_by = cooked_by.filter(
            ingredient__ingredientName__in=request.data["ingredients"]
        )
        result = cooked_by.values("recipe").annotate(count=Count("recipe"))
        result = [i["recipe"] for i in result if i["count"] == len(ingredients)]

        recipes = Recipe.objects.filter(id__in=result)
        if not recipes:
            return Response(
                {"error": "No recipes found with the given ingredients"}, status=404
            )
    is_negative = "" if request.data["is_negative"] else "-"
    sort_parameter = (is_negative + request.data["sort"]).replace(" ", "")
    if recipes:
        recipes = recipes.order_by(sort_parameter)
    else:
        recipes = Recipe.objects.order_by(sort_parameter)
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)


def check_database_status():
    try:
        connection.cursor()
        return True

    except OperationalError:
        return False


@api_view(["POST"])
def add_ingredient(request):
    ingredient_serializer = IngredientsSerializer(data=request.data)
    if ingredient_serializer.is_valid():
        ingredient_serializer.save()
        return Response(ingredient_serializer.data)
    return Response(ingredient_serializer.errors)


@api_view(["POST"])
def search_ingredient(request):
    ingredient_name = request.data.get("ingredientName", None)
    if not ingredient_name:
        return Response({"error": "ingredientName is required"}, status=400)
    ingredient = Ingredients.objects.filter(ingredientName=ingredient_name).first()
    if not ingredient:
        return Response({"error": "Ingredient not found"}, status=404)

    serializer = IngredientsSerializer(ingredient, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def add_recipe(request):
    ingredients = request.data.pop("ingredients", None)
    recipe_serializer = RecipeSerializer(data=request.data)
    if recipe_serializer.is_valid():
        recipe_serializer.save()
        for i in ingredients or []:
            temp = {}
            ingredient_id = Ingredients.objects.filter(ingredientName=i).first().id
            temp["ingredient"] = ingredient_id
            recipe_id = None
            recipe_id = (
                Recipe.objects.filter(recipeName=request.data["recipeName"]).first().id
            )
            temp["recipe"] = recipe_id
            cooked_by_serializer = CookedBySerializer(data=temp)
            if cooked_by_serializer.is_valid():
                cooked_by_serializer.save()
            else:
                return Response(cooked_by_serializer.errors)

        return Response(recipe_serializer.data)
    return Response(recipe_serializer.errors)
