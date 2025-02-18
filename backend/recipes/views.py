from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.response import Response

from recipes.models import Recipe
from recipes.serializer import RecipeSerializer

# Create your views here.
@api_view(['GET'])
def get_recipes(request):
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)