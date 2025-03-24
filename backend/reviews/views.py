from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.response import Response

from reviews.models import Review
from reviews.serializer import ReviewSerializer
from recipes.models import Recipe

from django.contrib.auth.models import User

# Create your views here.
# Create your views here.
@api_view(['POST'])
def post_review(request):
    # get Recipe object from ID
    recipeId = request.data['recipeId']
    recipeObject = Recipe.objects.get(pk=recipeId)

    # get Reviewer from ID
    reviewerId = request.data['reviewerId']
    reviewerObject = User.objects.get(pk=reviewerId)
    
    reviewRating = request.data['reviewRating']
    reviewString = request.data['reviewString']
    review = Review.create(recipe=recipeObject, reviewer=reviewerObject, reviewRating=reviewRating, reviewString=reviewString)
    review.save()
    return Response({"message": "Review posted successfully"})
    