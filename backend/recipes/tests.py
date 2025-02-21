from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch
from .models import Recipe

class TestRecipes(APITestCase):
    def setup(self):
        ...

    # @patch(Recipe.views.check_connection_status)
    def test_no_database_connection(self, mock_status):
        ...

    def test_get_all_recipes(self):
        ...

    def test_get_specific_recipe(self):
        ...

    def test_sort_recipes(self):
        ...

    def test_no_results(self):
        ...
