from django.urls import path, include

urlpatterns = [
<<<<<<< HEAD
    path("recipes/", include("recipes.urls")),
    path("users/", include("users.urls")),
=======
    path("users/login/", users.login),
    path("users/add_user/", users.add_user),
    path("users/delete_user/", users.delete_user),
>>>>>>> 4e5bb534d0a1628b681cbf4df1d3606dee3cd2e0
]
