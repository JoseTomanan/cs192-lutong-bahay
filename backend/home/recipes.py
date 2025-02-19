from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Recipe
from home.serializer import RecipeSerializer

from pathlib import Path 
import json


@api_view(['GET', 'POST'])
def search(request): 

    # currently, these lines simply read a harcoded JSON file
    # this should be changed to interface with the database instead 
    current_dir = Path(__file__).parent 
    file_path = current_dir / 'fake_api_calls' / 'search_recipes.json'
    with open(file_path, 'r') as file:
        resp = json.load(file)

    return Response(resp)
 