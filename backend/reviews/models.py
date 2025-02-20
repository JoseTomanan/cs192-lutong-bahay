from django.db import models

# Create your models here.
class Review(models.Model):
    recipeId = models.IntegerField()
    reviewerId = models.IntegerField()
    reviewRating = models.IntegerField()
    reviewString = models.CharField(max_length=200)
    
    @classmethod
    def create(cls, recipeId, reviewerId, reviewRating, reviewString):
        review = cls(recipeId=recipeId, reviewerId=reviewerId, reviewRating=reviewRating, reviewString=reviewString)
        return review
    