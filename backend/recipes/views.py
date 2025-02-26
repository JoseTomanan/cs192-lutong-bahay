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
        recipe = Recipe.objects.get(recipeName=request.data["recipeName"])
        serializer = RecipeSerializer(recipe, many=False)
        return Response(serializer.data)


@api_view(["POST"])
def sort_recipes(request):
    recipes = Recipe.objects.order_by(request.data["sort"])
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)

def check_database_status():
    try:
        connection.cursor()
        return True
    
    except OperationalError:
        return False