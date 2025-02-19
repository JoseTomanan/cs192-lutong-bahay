from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout


@api_view(["POST"])
def login(request):

    username = request.data["email"]
    password = request.data["password"]

    print(username, password)
    user = authenticate(username=username, password=password)

    if user is not None:
        auth_login(request, user)
        return Response({"message": "Login successful"})
    else:
        return Response({"message": "Invalid credentials"})


@api_view(["POST"])
def add_user(request):
    data = request.data

    if not data:
        return Response({"message": "An error occurred"})

    User.objects.create_user(
        username=data["username"],
        email=data["email"],
        password=data["password"],
    )

    return Response({"message": "User added successfully"})


@api_view(["POST"])
def delete_user(request):
    user = User.objects.filter(id=request.data["id"])
    user.delete()
    return Response({"message": "User delete successful"})
