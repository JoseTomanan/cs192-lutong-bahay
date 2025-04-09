from django.db import models
from django.contrib.auth.models import User
from recipes.models import Recipe


class SavedBy(models.Model):
    recipe = models.ForeignKey(
        Recipe, related_name="saved_by", on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User, related_name="saved_recipes", on_delete=models.CASCADE
    )


# Create your models here.
