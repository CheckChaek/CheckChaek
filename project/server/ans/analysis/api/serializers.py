from django.core import serializers
from rest_framework import serializers
from .models import *

class status_serializer(serializers.ModelSerializer):
    class Meta:
        model = image_status
        fields = ['image_status','image_title','image_publisher','image_author','image_price']
    image_status = serializers.CharField(max_length=10)
    image_title = serializers.CharField(max_length=100)
    image_publisher = serializers.CharField(max_length=100)
    image_author = serializers.CharField(max_length=100)
    image_price = serializers.IntegerField()
