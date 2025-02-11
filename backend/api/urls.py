from django.urls import path
from apps.users.views import index, person

urlpatterns = [
    path("index/", index),
    path("person/", person),
]
