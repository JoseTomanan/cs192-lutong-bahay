"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/ 
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
import recipes.views as recipe
from .views import (
    get_recipes,
    sort_recipes,
    add_recipe,
    add_ingredient,
    search_ingredient,
    get_recipe_by_id,
    get_ingredients,
    create_recipe,
    fetch_all_recipes,
    del_recipe,
    # update_recipe,
    update_recipe_from_page,
)

urlpatterns = [
    path("get-recipes/", recipe.get_recipes, name="get-recipes"),
    path("sort-recipes/", recipe.sort_recipes),
    path("add-recipe/", recipe.add_recipe),
    path("add-ingredient/", recipe.add_ingredient),
    path("search-ingredient/", recipe.search_ingredient),
    path("get_recipe_by_id/", recipe.get_recipe_by_id),
    path("get_ingredients/", recipe.get_ingredients),
    path("create_recipe/", recipe.create_recipe),
    path("fetch-all-recipes/", recipe.fetch_all_recipes),
    # path("update-recipe/", recipe.update_recipe),
    path("update-recipe-from-page/", recipe.update_recipe_from_page),
    path("del-recipe/", recipe.del_recipe),
    # path("delete-recipe/", recipe.del_recipe)
]
