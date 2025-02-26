import json
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch

from .models import Recipe
from .serializer import RecipeSerializer

class TestRecipes(APITestCase):
    def setUp(self):
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
        response = self.client.get(self._recipe_url)

        self.assertEqual(response.status_code, status.HTTP_503_SERVICE_UNAVAILABLE)

    # def test_get_all_recipes(self):
    #     self.recipes_url = reverse("recipe-list")
    #     res = self.client.get(self.recipes_url)
        
    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(len(res.data), 3)
        
    #     recipe1 = res.data[0]
    #     self.assertEqual(recipe1["id"], 1)
    #     self.assertEqual(recipe1["recipeName"], "Hotdog")
        
    #     recipe2 = res.data[1]
    #     self.assertEqual(recipe2["id"], 2)
    #     self.assertEqual(recipe2["recipeName"], "Fried egg")
        
    #     recipe3 = res.data[2]
    #     self.assertEqual(recipe3["id"], 3)
    #     self.assertEqual(recipe3["recipeName"], "Tortang talong")

    # def test_get_specific_recipe(self):
    #     self.recipe_url = reverse("recipe-detail", args=[1])
    #     res = self.client.get(self.recipe_url)
        
    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(res.data["id"], 1)
    #     self.assertEqual(res.data["recipeName"], "Hotdog")

    # def test_sort_recipes(self):
    #     self.recipe_url = reverse("recipe-detail", args=[1])
    #     res = self.client.get(self.recipes_url, {"sort": "recipeName"})
        
    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(res.data[0]["recipeName"], "Fried egg")
    #     self.assertEqual(res.data[1]["recipeName"], "Hotdog")
    #     self.assertEqual(res.data[2]["recipeName"], "Tortang talong")

    # def test_no_results(self):
    #     self.recipes_url = reverse("recipe-list")
    #     res = self.client.get(self.recipes_url, {"search": "Nonexistent"})
        
    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(len(res.data), 0)
