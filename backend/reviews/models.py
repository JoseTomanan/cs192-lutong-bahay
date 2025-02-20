from django.db import models

# Create your models here.
class Review(models.Model):
    recipeId = models.IntegerField()
    reviewerId = models.IntegerField()
    rating = models.IntegerField()
    reviewString = models.CharField(max_length=200)
    
    @classmethod
    def create(cls, recipeId, reviewerId, rating, reviewString):
        review = cls(recipeId=recipeId, reviewerId=reviewerId, rating=rating, reviewString=reviewString)
        return review
    