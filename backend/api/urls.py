from django.urls import path, include

urlpatterns = [
    path("recipes/", include("recipes.urls")),
    path("users/", include("users.urls")),
]
