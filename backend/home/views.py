from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User
from .forms import UserAddForm
from home.serializer import UserSerializer

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect

@api_view(["POST", "GET"])
def index(request):
    users = {"john123@gmail.com": "password"}
    
    if request.method == "GET":
        return Response({"message": "Welcome to the login page"})
    
    data = request.data
    print("HELLO")

    if data:
        if data["email"] in users:
            if data["password"] == users[data["email"]]:
                return Response({"message": "Login successful"})
            else:
                return Response({"message": "Invalid password"})
            
        else:
            return Response({"message": "Invalid username"})


@api_view(["POST", "GET"])
def person(request):
    if request.method == "GET":
        print("HELLO")
        persons = User.objects.all()
        serializer = UserSerializer(persons, many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

@api_view(['GET'])
def get_users(request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

@csrf_exempt 
@api_view(['POST'])
def add_user(request):
    data = request.data
    print(data)
    newUser = User()
    newUser.email = data["email"]
    newUser.password = data["password"]
    newUser.save()
    return HttpResponseRedirect('dbtest')