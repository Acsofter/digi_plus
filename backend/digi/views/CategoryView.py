from rest_framework import permissions, mixins, status, viewsets
from ..models import Company, Category
from ..serializers import CategorySerializer
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


class CategoryViewSet(viewsets.GenericViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        serializer = self.serializer_class(Category.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def create(self, request):
        request.data['company'] = self.Company.objects.first().id
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, pk=None):
        category = get_object_or_404(Category, pk=pk)
        serializer = self.serializer_class(category, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, pk=None):
        category = get_object_or_404(Category, pk=pk)
        return Response(self.serializer_class(category).data, status=status.HTTP_200_OK)    
    
    def destroy(self, request, pk=None):
        category = get_object_or_404(Category, pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
