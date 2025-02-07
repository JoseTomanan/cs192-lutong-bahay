from rest_framework.decorators import api_view
from rest_framework.response import Response

from home.models import Person
from home.serializer import PersonSerializer


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
        persons = Person.objects.all()
        serializer = PersonSerializer(persons, many=True)
        return Response(serializer.data)
    if request.method == "POST":
        data = request.data
        serializer = PersonSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)
