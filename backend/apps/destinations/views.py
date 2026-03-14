from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Destination, DestinationImage
from .serializers import (
    DestinationListSerializer, DestinationDetailSerializer, DestinationImageSerializer
)


class DestinationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Destination.objects.filter(is_active=True)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['province', 'featured']
    search_fields = ['name', 'description', 'short_description']
    ordering_fields = ['name', 'created_at']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DestinationDetailSerializer
        return DestinationListSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = self.queryset.filter(featured=True)
        serializer = DestinationListSerializer(featured, many=True, context={'request': request})
        return Response(serializer.data)


class DestinationImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DestinationImage.objects.all()
    serializer_class = DestinationImageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['destination']
