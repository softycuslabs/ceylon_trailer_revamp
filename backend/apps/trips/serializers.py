from rest_framework import serializers
from .models import Trip, TripImage, TripItineraryDay
from apps.destinations.serializers import DestinationListSerializer


class TripImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripImage
        fields = ['id', 'image', 'caption', 'order']


class TripItineraryDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TripItineraryDay
        fields = ['id', 'day_number', 'title', 'description', 'activities']


class TripListSerializer(serializers.ModelSerializer):
    destination_name = serializers.CharField(source='destination.name', read_only=True)
    destination_province = serializers.CharField(source='destination.province', read_only=True)
    destination_slug = serializers.CharField(source='destination.slug', read_only=True)

    class Meta:
        model = Trip
        fields = [
            'id', 'title', 'slug', 'destination_name', 'destination_province',
            'destination_slug', 'duration_days', 'price', 'short_description',
            'cover_image', 'trip_type', 'activities', 'featured'
        ]


class TripDetailSerializer(serializers.ModelSerializer):
    destination = DestinationListSerializer(read_only=True)
    images = TripImageSerializer(many=True, read_only=True)
    itinerary = TripItineraryDaySerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = [
            'id', 'title', 'slug', 'destination', 'duration_days', 'price',
            'description', 'short_description', 'cover_image', 'images',
            'activities', 'trip_type', 'highlights', 'itinerary',
            'featured', 'created_at', 'updated_at'
        ]
