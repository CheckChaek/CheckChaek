from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view, schema
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .serializers import image_serializer

@swagger_auto_schema(method='post', request_body=image_serializer)  # 요청 스키마 설정
@api_view(['POST'])
def test_api(request):
    if request.method == 'POST':
        serializer = image_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)