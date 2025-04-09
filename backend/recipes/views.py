from rest_framework.decorators import api_view
from rest_framework.permissions import BasePermission
from rest_framework.response import Response

from django.shortcuts import render
from django.db import OperationalError, connection
from django.db.models import Count

from .models import Recipe, Ingredients, RecipeIngredients
from .serializer import RecipeSerializer, IngredientsSerializer, RecipeIngredientsSerializer

from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .custom_permissions import IsAdminOrReadOnly

from django.db.models import Prefetch

Recipe.objects.prefetch_related(
    Prefetch(
        "recipeingredient_set",  # or the related_name if set
        queryset=RecipeIngredients.objects.select_related("ingredient")
    )
)


"""
Get recipe, either all recipes or by search
"""


@api_view(["GET", "POST"])
def get_recipes(request):
    if request.method == "GET":
        recipes = Recipe.objects.exclude(recipeName__isnull=True).exclude(
            recipeName__exact=""
        )

        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)

    else:
        # recipe = Recipe.objects.get(recipeName=request.data["recipeName"])
        # serializer = RecipeSerializer(recipe, many=False)
        # return Response(serializer.data)
        recipe_name = request.data.get("recipeName", None)

        if not recipe_name:
            return Response({"error": "recipeName is required"}, status=400)

        recipe = Recipe.objects.filter(recipeName__iexact=recipe_name.lower).first()

        if not recipe:
            return Response({"error": "Recipe not found"}, status=404)

        serializer = RecipeSerializer(recipe, many=False)
        return Response(serializer.data)


"""
Fetching all recipe (Zach version).
To remove and replace all instances with get_recipes -- please resolve when you have time
"""


@api_view(["GET"])
def fetch_all_recipes(request):
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)


"""
Retrieve single recipe using ID (key)
"""


@api_view(["GET", "POST"])
def get_recipe_by_id(request):
    recipes = Recipe.objects.all().filter(id=request.data.get("id"))
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)


"""
Retrieve recipes using filter
"""


@api_view(["POST"])
def sort_recipes(request):
    recipes = None

    if request.data.get("ingredients", None):
        ingredients = Ingredients.objects.filter(
            ingredientName__in=request.data["ingredients"]
        )

        if not ingredients:
            return Response({"error": "Ingredient(s) not found"}, status=404)

        cooked_by = RecipeIngredients.objects.select_related(
            "ingredient", "recipe"
        ).all()
        cooked_by = cooked_by.filter(
            ingredient__ingredientName__in=request.data["ingredients"]
        )

        result = cooked_by.values("recipe").annotate(count=Count("recipe"))
        result = [i["recipe"] for i in result if i["count"] == len(ingredients)]

        recipes = Recipe.objects.filter(id__in=result)

        if not recipes:
            return Response(
                {"error": "No recipes found with the given ingredients"}, status=404
            )

    is_negative = "" if request.data["is_negative"] else "-"
    sort_parameter = (is_negative + request.data["sort"]).replace(" ", "")

    if recipes:
        recipes = recipes.order_by(sort_parameter)
    else:
        recipes = Recipe.objects.order_by(sort_parameter)

    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)


"""
Add ingredient to recipe;
Recipe must exist already before using
"""


@api_view(["POST"])
def add_ingredient(request):
    ingredient_serializer = IngredientsSerializer(data=request.data)

    if ingredient_serializer.is_valid():
        ingredient_serializer.save()
        return Response(ingredient_serializer.data)

    return Response(ingredient_serializer.errors)


"""
Search ingredient by name
"""


@api_view(["POST"])
def search_ingredient(request):
    ingredient_name = request.data.get("ingredientName", None)

    if not ingredient_name:
        return Response({"error": "ingredientName is required"}, status=400)

    ingredient = Ingredients.objects.filter(ingredientName=ingredient_name).first()

    if not ingredient:
        return Response({"error": "Ingredient not found"}, status=404)

    serializer = IngredientsSerializer(ingredient, many=False)
    return Response(serializer.data)


"""
Add recipe (Elijah version)
"""


@api_view(["POST"])
def add_recipe(request):
    ingredients = request.data.pop("ingredients", None)
    recipe_serializer = RecipeSerializer(data=request.data)

    if recipe_serializer.is_valid():
        recipe_serializer.save()

        for i in ingredients or []:
            temp = {}
            ingredient_id = Ingredients.objects.filter(ingredientName=i).first().id  # type: ignore
            temp["ingredient"] = ingredient_id

            recipe_id = None
            recipe_id = (
                Recipe.objects.filter(recipeName=request.data["recipeName"]).first().id  # type: ignore
            )

            temp["recipe"] = recipe_id
            cooked_by_serializer = CookedBySerializer(data=temp)

            if cooked_by_serializer.is_valid():
                cooked_by_serializer.save()
            else:
                return Response(cooked_by_serializer.errors)

        return Response(recipe_serializer.data)

    return Response(recipe_serializer.errors)


"""
Get ingredients, either all or by filter
"""


@api_view(["GET", "POST"])
def get_ingredients(request):
    if request.method == "GET":
        ingredients = Ingredients.objects.all()
        serializer = IngredientsSerializer(ingredients, many=True)
        return Response(serializer.data)

    else:
        # recipe = Recipe.objects.get(recipeName=request.data["recipeName"])
        # serializer = RecipeSerializer(recipe, many=False)
        # return Response(serializer.data)
        recipe_name = request.data.get("recipeName", None)

        if not recipe_name:
            return Response({"error": "recipeName is required"}, status=400)

        recipe = Recipe.objects.filter(recipeName=recipe_name).first()

        if not recipe:
            return Response({"error": "Recipe not found"}, status=404)

        serializer = RecipeSerializer(recipe, many=False)
        return Response(serializer.data)


"""
Add recipe (Zach version);
Has quantity property for ingredients, equipment
"""


@api_view(["GET", "POST"])
def create_recipe(request):
    recipeInfo = request.data[0]
    ingredientsList = request.data[1]

    recipeName = recipeInfo["recipeName"]
    recipeDifficulty = recipeInfo["cookDifficulty"]
    equipment = recipeInfo["equipment"]
    instructions = recipeInfo["instructions"]
    recipeServings = recipeInfo["servings"]
    recipePrice = recipeInfo["price"]
    ratings = 0

    print(recipeInfo)

    newRecipeObject = Recipe(
        recipeName=recipeName,
        cookDifficulty=recipeDifficulty,
        equipment=equipment,
        instructions=instructions,
        servings=recipeServings,
        price=recipePrice,
        ratings=ratings,
    )

    newRecipeObject.save()

    # create RecipeIngredients
    for ingredient in ingredientsList:
        ingredientId = ingredient["ingredientObject"]["id"]
        ingredientQuantity = ingredient["ingredientQuantity"]

        ingredientObject = Ingredients.objects.get(pk=ingredientId)

        newRecipeIngredient = RecipeIngredients(
            quantity=ingredientQuantity,
            unit="units",
            ingredientId=ingredientObject,
            recipe=newRecipeObject,
        )

        newRecipeIngredient.save()

    # get ingredients from id
    # create UserIngredients with given ingredients
    # get created UserIngredients
    # create Recipe entry
    # link UserIngredients to Recipe
    return Response((recipeInfo, ingredientsList))


"""
Delete recipe from name
"""


@api_view(["POST"])
def del_recipe(request):
    recipe_name = request.data.get("recipeName", None)

    if not recipe_name:
        return Response({"error": "recipeName is required"}, status=400)

    recipe = Recipe.objects.filter(recipeName=recipe_name).first()

    if not recipe:
        return Response({"error": "Recipe not found"}, status=404)

    recipe.delete()
    return Response({"message": "Recipe deleted successfully"}, status=200)

# """
# Edit recipe (must exist already)
# """
# @api_view(["POST"])
# def update_recipe(request):
#     recipe_name = request.data.get("recipeName", None)
    
#     if not recipe_name:
#         return Response({"error": "recipeName is required"}, status=400)
    
#     recipe = Recipe.objects.filter(recipeName=recipe_name).first()
    
#     if not recipe:
#         return Response({"error": "Recipe not found"}, status=404)
    
#     ingredients = request.data["ingredients"]
#     recipe_serializer = RecipeSerializer(recipe, data=request.data)
#     # recipe_serializer = RecipeSerializer(recipe, many=False)
    
#     if recipe_serializer.is_valid():
#         recipe_serializer.save()
#         RecipeIngredients.objects.filter(recipe=recipe.id).delete() # type: ignore
        
#         for i in ingredients or []:
#             temp = {}
#             ingredient_id = Ingredients.objects.filter(ingredientName=i).first().id # type: ignore
#             temp["ingredient"] = ingredient_id
#             temp["recipe"] = recipe.id # type: ignore
#             cooked_by_serializer = RecipeIngredients(data=temp)
            
#             if cooked_by_serializer.is_valid():
#                 cooked_by_serializer.save()
            
#             else:
#                 return Response(cooked_by_serializer.errors)

#         return Response(recipe_serializer.data)
    
#     return Response(recipe_serializer.errors)


"""
Edit recipe (must exist already)
"""


@api_view(["POST"])
def update_recipe_from_page(request):
    recipeData = request.data.get("recipe", None)
    recipe_id = recipeData["recipeId"]
    
    # if not recipe_name:
    #     return Response({"error": "recipeName is required"}, status=400)
    
    # recipe = Recipe.objects.filter(recipeName=recipe_name).first()
    
    if not recipe_id:
        return Response({"error": "recipeName is required"}, status=400)
    recipe = Recipe.objects.filter(id=recipe_id).first()

    if not recipe:
        return Response({"error": "Recipe not found"}, status=404)
    
    ingredients = request.data["ingredients"]
    # print(ingredients)
    # 
    recipe_serializer = RecipeSerializer(recipe, data=request.data["recipe"])
    if not(recipe_serializer.is_valid()):
        print(recipe_serializer.errors)
        print("invalid recipe_serializer")
        print(request.data["recipe"])
    else:
        print(recipeData)
        print("recipe_serializer valid")
        
    if recipe_serializer.is_valid():
        recipe_serializer.save()
        RecipeIngredients.objects.filter(recipe=recipe.id).delete() #type: ignore

        for i in ingredients or []:
            temp = {}
            ingredient_id = Ingredients.objects.filter(ingredientName=i).first().id  # type: ignore
            temp["ingredient"] = ingredient_id
            temp["recipe"] = recipe.id  # type: ignore
            cooked_by_serializer = RecipeIngredientsSerializer(data=temp)

            if cooked_by_serializer.is_valid():
                cooked_by_serializer.save()

            else:
                print(cooked_by_serializer.errors)
                return Response(cooked_by_serializer.errors)

        return Response(recipe_serializer.data)

    return Response(recipe_serializer.errors)
