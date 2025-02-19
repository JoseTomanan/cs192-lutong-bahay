from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout


@api_view(["POST"])
def login(request):

    username = request.data["email"]
    password = request.data["password"]

<<<<<<< HEAD:backend/home/views.py
    if not data:
        response["mesage"] = "An error occurred"
    elif data["email"] not in users:
        response["message"] = "User does not exist"
    elif data["password"] != users[data["email"]]:
        response["message"] = "Invalid password"
=======
    print(username, password)
    user = authenticate(username=username, password=password)

    if user is not None:
        auth_login(request, user)
        return Response({"message": "Login successful"})
>>>>>>> 4e5bb534d0a1628b681cbf4df1d3606dee3cd2e0:backend/home/users.py
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
