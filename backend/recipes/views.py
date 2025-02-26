from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.response import Response

from recipes.models import Recipe
from recipes.serializer import RecipeSerializer


# Create your views here.
@api_view(["GET", "POST"])
def get_recipes(request):
    if request.method == "GET":
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)
    else:
        recipe = Recipe.objects.get(recipeName=request.data["recipeName"])
        serializer = RecipeSerializer(recipe, many=False)
        return Response(serializer.data)


@api_view(["POST"])
def sort_recipes(request):
    is_negative = "" if request.data["is_negative"] else "-"
    sort_parameter = (is_negative + request.data["sort"]).replace(" ", "")
    print(sort_parameter)
    recipes = Recipe.objects.all().order_by(sort_parameter)
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def add_recipe(request):
    serializer = RecipeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
