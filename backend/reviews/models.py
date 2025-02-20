from django.db import models

# Create your models here.
class Review(models.Model):
    recipeId = models.IntegerField()
    reviewerId = models.IntegerField()
    rating = models.IntegerField()
    reviewString = models.CharField(max_length=200)
    
    