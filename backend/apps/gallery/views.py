from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import GalleryImage
from .serializers import GalleryImageSerializer


class GalleryImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category', 'is_featured', 'destination']
    ordering_fields = ['order', 'created_at']

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = self.queryset.filter(is_featured=True)
        serializer = GalleryImageSerializer(featured, many=True, context={'request': request})
        return Response(serializer.data)
