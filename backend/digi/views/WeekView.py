from ..models import Week
from ..serializers import WeekSerializer
from rest_framework import permissions, mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from rest_framework import serializers

class WeekViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = WeekSerializer

    


