import json
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch

from .models import Recipe
from .serializer import RecipeSerializer

class TestRecipes(APITestCase):
    def setup(self):
        Recipe.objects.create(
            id=1,
            recipeName="Hotdog",
            cookDifficulty="1",
            servings=1,
            equipment="",
            instructions="- slice hotdog\n- fry hotdog on pan until cooked",
            ingredients=[]
            )
        Recipe.objects.create(
            id=2,
            recipeName="Fried egg",
            cookDifficulty="1",
            servings=1,
            equipment="",
            instructions="- crack egg\n- fry egg on pan until cooked",
            ingredients=[]
            )
        Recipe.objects.create(
            id=3,
            recipeName="Tortang talong",
            cookDifficulty="1",
            servings=1,
            equipment="",
            instructions="- crack egg on eggplant\n- fry on pan until cooked",
            ingredients=[]
            )

    @patch("Recipe.views.check_connection_status")
    def test_no_database_connection(self, mock_status):
        mock_status.return_value = False

        self._recipe_url = reverse("get-recipes")
        result = self.client.get(self._recipe_url)

        self.assertEqual(result.status_code, status.HTTP_503_SERVICE_UNAVAILABLE)

    def test_get_all_recipes(self):
        ...

    def test_get_specific_recipe(self):
        ...

    def test_sort_recipes(self):
        ...

    def test_no_results(self):
        ...
