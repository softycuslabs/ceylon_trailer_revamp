from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import TravelArticle
from .serializers import TravelArticleListSerializer, TravelArticleDetailSerializer


class TravelArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TravelArticle.objects.filter(is_published=True)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['destination']
    search_fields = ['title', 'content', 'excerpt', 'author']
    ordering_fields = ['published_at', 'created_at', 'title']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TravelArticleDetailSerializer
        return TravelArticleListSerializer
