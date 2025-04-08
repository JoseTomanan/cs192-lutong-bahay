from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User

from savedby.models import SavedBy
from recipes.models import Recipe
from savedby.serializer import SavedBySerializer


"""
Get recipe, either all recipes or by search
"""


@api_view(["POST"])
def user_save_recipe(request):
    recipe_name = request.data.get("recipeName", None)
    username = request.data.get("username", None)
    temp = {}
    if not recipe_name:
        return Response({"error": "recipeName is required"}, status=400)

    if not username:
        return Response({"error": "username is required"}, status=400)

    recipe = Recipe.objects.filter(recipeName=recipe_name).first()

    if not recipe:
        return Response({"error": "Recipe not found"}, status=404)
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({"error": "User not found"}, status=404)
    temp["recipe"] = recipe.id  # type: ignore
    temp["user"] = user.id
    saved_recipe = SavedBySerializer(data=temp)
    if saved_recipe.is_valid():
        saved_recipe.save()
    else:
        return Response(saved_recipe.errors)

    return Response({"message": "Recipe saved successfully"}, status=200)


@api_view(["POST"])
def user_delete_recipe(request):
    recipe_name = request.data.get("recipeName", None)
    username = request.data.get("username", None)
    if not recipe_name:
        return Response({"error": "recipeName is required"}, status=400)

    if not username:
        return Response({"error": "username is required"}, status=400)

    recipe = Recipe.objects.filter(recipeName=recipe_name).first()

    if not recipe:
        return Response({"error": "Recipe not found"}, status=404)
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({"error": "User not found"}, status=404)

    saved_recipe = SavedBy.objects.filter(recipe=recipe.id, user=user.id).first()
    if not saved_recipe:
        return Response({"error": "Saved recipe not found"}, status=404)
    saved_recipe.delete()
    return Response({"message": "Recipe deleted successfully"}, status=200)


@api_view(["POST"])
def user_get_saved_recipes(request):
    username = request.data.get("username", None)
    if not username:
        return Response({"error": "username is required"}, status=400)

    user = User.objects.filter(username=username).first()
    if not user:
        return Response({"error": "User not found"}, status=404)

    saved_recipes = SavedBy.objects.filter(user=user.id).values("recipe__recipeName")
    if not saved_recipes:
        return Response({"message": "No saved recipes found"}, status=200)

    recipes = [recipe["recipe__recipeName"] for recipe in saved_recipes]
    return Response({"saved_recipes": recipes}, status=200)
