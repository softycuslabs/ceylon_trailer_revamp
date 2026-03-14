from rest_framework import serializers
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    trip_title = serializers.CharField(source='trip.title', read_only=True)

    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'country', 'avatar', 'rating', 'comment', 'trip_title', 'created_at']
