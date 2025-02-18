from django.urls import path, include
from home.views import login, person

from home.views import get_users, add_user, delete_user
from recipes.views import get_recipes


urlpatterns = [
    path("login/", login),
    path("person/", person),

    path("users/", get_users),
    path("add-user/", add_user, name="add-user"),
    path("delete-user/", delete_user, name="delete-user"),
    path("recipes/", include("recipes.urls")),
]
