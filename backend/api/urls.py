from django.urls import path
from home.views import login, person

urlpatterns = [
    path("login/", login),
    path("person/", person),
]
