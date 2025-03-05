from django.db import models
from recipes.models import Recipe
from django.contrib.auth.models import User

# Create your models here.
class Review(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, default=0)
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    reviewRating = models.IntegerField()
    reviewString = models.CharField(max_length=200)
    
    @classmethod
    def create(cls, recipe, reviewer, reviewRating, reviewString):
        review = cls(recipe=recipe, reviewer=reviewer, reviewRating=reviewRating, reviewString=reviewString)
        return review
    