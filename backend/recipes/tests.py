import sys
import json

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch

# from recipes.models import Recipe
# from recipes.serializer import RecipeSerializer

class TestRecipes(APITestCase):
    ...
    # def setUp(self):
    #     Recipe.objects.create(
    #         id=1,
    #         recipeName="Hotdog",
    #         price=5,
    #         cookDifficulty="1",
    #         servings=1,
    #         equipment="pan",
    #         instructions="- slice hotdog\n- fry hotdog on pan until cooked",
    #         ratings=4,
    #         ingredients="hotdog"
    #         )
    #     Recipe.objects.create(
    #         id=2,
    #         recipeName="Fried egg",
    #         price=4,
    #         cookDifficulty="1",
    #         servings=1,
    #         equipment="pan",
    #         instructions="- crack egg\n- fry egg on pan until cooked",
    #         ratings=5,
    #         ingredients="egg,salt"
    #         )
    #     Recipe.objects.create(
    #         id=3,
    #         recipeName="Tortang talong",
    #         price=3,
    #         cookDifficulty="1",
    #         servings=1,
    #         equipment="pan",
    #         instructions="- crack egg on eggplant\n- fry on pan until cooked",
    #         ratings=2,
    #         ingredients="eggplant"
    #         )

    # @patch("recipes.views.check_database_status")
    # def test_no_database_connection(self, mock_status):
    #     mock_status.return_value = False

    #     print("mock status return value:", mock_status.return_value)

    #     self._recipe_url = reverse("get-recipes")
    #     response = self.client.get(self._recipe_url)

    #     print("mock status called:", mock_status.called)
    #     print(response)

    #     self.assertEqual(response.status_code, status.HTTP_503_SERVICE_UNAVAILABLE)

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
