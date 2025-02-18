from django.urls import path
import home.users as users
import home.recipes as recipes

urlpatterns = [
    path("users/login/", users.login),
    path("users/get_users/", users.get_users),
    path("users/add_user/", users.add_user),
    path("users/delete_user/", users.delete_user),
]
