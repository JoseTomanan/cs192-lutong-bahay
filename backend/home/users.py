from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User
from home.serializer import UserSerializer

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect


@api_view(["GET", "POST"])
def login(request):
    users = {"john123@gmail.com": "password", "2@2": "2", "a": "a"}
    data = request.data

    response = {
        "success": False,
        "message": "",
    }

    if not data:
        response["mesage"] = "An error occurred"
    elif data["identifier"] not in users:
        response["message"] = "User does not exist"
    elif data["password"] != users[data["identifier"]]:
        response["message"] = "Invalid password"
    else:
        response["message"] = "Log in successful"
        response["success"] = True

    return Response(response)


@api_view(["GET"])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def add_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(["POST"])
def delete_user(request):
    user = User.objects.filter(id=request.data["id"])
    user.delete()
    return Response({"message": "User delete successful"})
