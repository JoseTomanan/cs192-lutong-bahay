from rest_framework import serializers
from savedby.models import SavedBy


class SavedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedBy
        fields = "__all__"
