from django.db import models


# Create your models here.
class User(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    objects = models.Manager()

class Recipe(models.Model):
    name = models.CharField(max_length=100)