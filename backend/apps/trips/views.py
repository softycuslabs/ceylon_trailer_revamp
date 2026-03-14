from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as django_filters
from .models import Trip
from .serializers import TripListSerializer, TripDetailSerializer


class TripFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    min_duration = django_filters.NumberFilter(field_name='duration_days', lookup_expr='gte')
    max_duration = django_filters.NumberFilter(field_name='duration_days', lookup_expr='lte')
    destination_slug = django_filters.CharFilter(field_name='destination__slug')
    province = django_filters.CharFilter(field_name='destination__province')

    class Meta:
        model = Trip
        fields = ['trip_type', 'featured', 'destination', 'destination_slug', 'province']


class TripViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Trip.objects.filter(is_active=True).select_related('destination')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = TripFilter
    search_fields = ['title', 'description', 'short_description']
    ordering_fields = ['title', 'price', 'duration_days', 'created_at']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TripDetailSerializer
        return TripListSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = self.queryset.filter(featured=True)
        serializer = TripListSerializer(featured, many=True, context={'request': request})
        return Response(serializer.data)
