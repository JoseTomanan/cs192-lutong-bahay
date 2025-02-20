from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.response import Response

from reviews.models import Review
from reviews.serializer import ReviewSerializer

# Create your views here.
# Create your views here.
@api_view(['POST'])
def post_review(request):
    recipeId = request.data['recipeId']
    reviewerId = request.data['reviewerId']
    reviewRating = request.data['reviewRating']
    reviewString = request.data['reviiewString']
    review = Review.create(recipeId=recipeId, reviewerId=reviewerId, reviewText=reviewRating, reviewString=reviewString)
    review.save()
    return Response({"message": "Review posted successfully"})
    