from rest_framework.permissions import SAFE_METHODS, IsAdminUser


class IsAdminOrReadOnly(IsAdminUser):
    def has_permission(self, request, view):
        is_admin = super(IsAdminOrReadOnly, self).has_permission(request, view)
        if request.method in SAFE_METHODS:
            return True
        return request.method in SAFE_METHODS or is_admin
