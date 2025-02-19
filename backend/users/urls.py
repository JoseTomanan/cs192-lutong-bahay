from django.urls import path
import users.views as users

urlpatterns = [
    path("login/", users.login),
    path("logout/", users.logout),
    path("add-user/", users.add_user),
    path("delete-user/", users.delete_user),
]
