from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.response import Response

from reviews.models import Review
from reviews.serializer import ReviewSerializer

# Create your views here.
# Create your views here.
@api_view(['POST'])
def post_review(request):
    recipe = request.data['recipe']
    reviewer = request.data['reviewer']
    reviewRating = request.data['reviewRating']
    reviewString = request.data['reviewString']
    review = Review.create(recipe=recipe, reviewer=reviewer, reviewRating=reviewRating, reviewString=reviewString)
    # review.save()
    return Response({"message": "Review posted successfully"})
    