from django.urls import path
import users.views as users

urlpatterns = [
    path("login/", users.login),
    path("logout/", users.logout),
    path("add-user/", users.add_user),
    path("delete-user/", users.delete_user),
    path("fetch-user-by-id/", users.fetch_user_by_id),
    path("suspend-user/", users.suspend_user),
]
