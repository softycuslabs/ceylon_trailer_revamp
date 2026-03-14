from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_approved=True)
    serializer_class = TestimonialSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['trip']
