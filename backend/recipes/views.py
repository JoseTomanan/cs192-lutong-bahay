from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render
from django.db import OperationalError, connection

from .models import Recipe
from .serializer import RecipeSerializer


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


@api_view(["POST"])
def sort_recipes(request):
    is_negative = "" if request.data["is_negative"] else "-"
    sort_parameter = (is_negative + request.data["sort"]).replace(" ", "")
    print(sort_parameter)
    recipes = Recipe.objects.all().order_by(sort_parameter)
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)

def check_database_status():
    try:
        connection.cursor()
        return True
    
    except OperationalError:
        return False

@api_view(["POST"])
def add_recipe(request):
    serializer = RecipeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


