from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from urllib.parse import urljoin

from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView



@api_view(["POST"])
def login(request):
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"success": False, "is_staff": False, "message": "Invalid credentials"})
    
    if user.is_staff:
        auth_login(request, user)
        response = Response({"success": True, "is_staff": True, "message": "Admin login successful"})
        response.set_cookie("username", username, max_age=3600, httponly=False, secure=True, samesite='Lax')
        return response
    
    else:
        auth_login(request, user)
        response = Response({"success": True, "is_staff": False, "message": "Login successful"})
        response.set_cookie("username", username, max_age=3600, httponly=False, secure=True, samesite='Lax')
        return response


@api_view(["POST"])
def add_user(request):
    # {"username": "testuser", "password": ""}
    try: 
        if request.data["password"] != request.data["confirm_password"]:
            return Response({"success": False, "message": "Passwords must match"})

        user = User.objects.create_user(
            username=request.data["username"], password=request.data["password"]
        ) 
        return Response({"success": True, "message": "User created successfully"})
    except:
        return Response({"success": False, "message": "Error creating user (username taken)"})


@api_view(["POST"]) 
def delete_user(request):
    user = User.objects.get(username=request.data["username"])
    user.delete()
    return Response({"message": "User deleted successfully"})


@api_view(["POST"])
def logout(request):
    auth_logout(request)
    return Response({"message": "Logout successful"})


# Google Auth
class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://localhost:5173/'
    client_class = OAuth2Client
