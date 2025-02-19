from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout


@api_view(["POST"])
def login(request):
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(username=username, password=password)

    if user is not None:
        auth_login(request, user)
        return Response({"success": True, "message": "Login successful"})
    else:
        return Response({"success": False, "message": "Invalid credentials"})


@api_view(["POST"])
def add_user(request):
    user = User.objects.create_user(
        username=request.data["username"], password=request.data["password"]
    )
    return Response({"message": "User created successfully"})


@api_view(["POST"])
def delete_user(request):
    user = User.objects.get(username=request.data["username"])
    user.delete()
    return Response({"message": "User deleted successfully"})


@api_view(["POST"])
def logout(request):
    auth_logout(request)
    return Response({"message": "Logout successful"})


# Create your views here.
