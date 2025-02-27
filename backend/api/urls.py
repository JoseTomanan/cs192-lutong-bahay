from django.urls import path, include
from users.views import GoogleLoginView

urlpatterns = [
    path("recipes/", include("recipes.urls")),
    path("users/", include("users.urls")),
    path("reviews/", include("reviews.urls")), 

    path('auth/', include('dj_rest_auth.urls')),  # Login, logout, password reset
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # Signup
]
