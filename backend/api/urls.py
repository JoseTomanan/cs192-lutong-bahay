from django.urls import path
from apps.home.views import index, person

urlpatterns = [
    path("index/", index),
    path("person/", person),
]
