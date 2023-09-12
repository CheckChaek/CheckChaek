from django.core import serializers
from rest_framework import serializers
from .models import image

class image_serializer(serializers.ModelSerializer):
    class Meta:
        model = image
        fields = ['image_url']
    image_url = serializers.CharField(max_length=1000)