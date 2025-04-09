from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User

from savedby.models import SavedBy
from recipes.models import Recipe
from savedby.serializer import SavedBySerializer
from recipes.serializer import RecipeSerializer


"""
Get recipe, either all recipes or by search
"""


@api_view(["POST"])
def user_save_recipe(request):
    recipeId = request.data.get("recipeId", None)
    userId = request.data.get("userId", None)
    if not recipeId:
        return Response({"error": "recipeId is required"}, status=400)
    if not userId:
        return Response({"error": "userId is required"}, status=400)
    recipe = Recipe.objects.get(pk=recipeId)
    if not recipe:
        return Response({"error": "Recipe not found"}, status=404)
    user = User.objects.get(pk=userId)
    if not user:
        return Response({"error": "User not found"}, status=404)
    if not SavedBy.objects.filter(recipe=recipe, user=user).exists():
        saved_recipe = SavedBySerializer(data={"recipe": recipeId, "user": userId})
        if saved_recipe.is_valid():
            saved_recipe.save()
            return Response({"message": "Recipe saved successfully"}, status=201)
        else:
            return Response({"error": "Failed to save recipe"}, status=400)
    else:
        return Response({"error": "Recipe already saved"}, status=400)


@api_view(["POST"])
def user_unsave_recipe(request):
    recipeId = request.data.get("recipeId", None)
    userId = request.data.get("userId", None)
    if not recipeId:
        return Response({"error": "recipeId is required"}, status=400)
    if not userId:
        return Response({"error": "userId is required"}, status=400)

    saved_recipe = SavedBy.objects.filter(recipe=recipeId, user=userId).first()
    if not saved_recipe:
        return Response({"error": "Saved recipe not found"}, status=404)

    saved_recipe.delete()
    return Response({"message": "Recipe deleted successfully"}, status=200)


@api_view(["POST"])
def user_get_saved_recipes(request):
    userId = request.data.get("userId", None)
    out = []
    if not userId:
        return Response({"error": "userId is required"}, status=400)

    saved_recipes = SavedBy.objects.filter(user=userId)
    if not saved_recipes:
        return Response({"message": "No saved recipes found"}, status=404)
    for saved_recipe in saved_recipes:
        recipe = saved_recipe.recipe
        out.append(recipe)
    serializer = RecipeSerializer(out, many=True)
    return Response(serializer.data, status=200)


@api_view(["POST"])
def recipe_is_saved_by_user(request):
    recipeId = request.data.get("recipeId", None)
    userId = request.data.get("userId", None)
    if not recipeId:
        return Response({"error": "recipeId is required"}, status=400)
    if not userId:
        return Response({"error": "userId is required"}, status=400)

    saved_recipe = SavedBy.objects.filter(recipe=recipeId, user=userId).first()
    if saved_recipe:
        return Response({"isSaved": True}, status=200)
    else:
        return Response({"isSaved": False}, status=200)
