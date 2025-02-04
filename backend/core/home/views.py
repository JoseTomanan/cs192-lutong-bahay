from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST", "GET"])
def index(request):
    users = {"John": "password"}
    if request.method == "GET":
        return Response({"message": "Welcome to the login page"})
    data = request.data
    print("HELLO")
    if data:
        if data["username"] in users:
            if data["password"] == users[data["username"]]:
                return Response({"message": "Login successful"})
            else:
                return Response({"message": "Invalid password"})
        else:
            return Response({"message": "Invalid username"})
