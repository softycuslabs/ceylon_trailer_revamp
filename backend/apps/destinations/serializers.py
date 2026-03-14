from rest_framework import serializers
from .models import Destination, DestinationImage


class DestinationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationImage
        fields = ['id', 'image', 'caption', 'order']


class DestinationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = [
            'id', 'name', 'slug', 'short_description', 'province',
            'image', 'featured', 'map_lat', 'map_lng'
        ]


class DestinationDetailSerializer(serializers.ModelSerializer):
    images = DestinationImageSerializer(many=True, read_only=True)

    class Meta:
        model = Destination
        fields = [
            'id', 'name', 'slug', 'description', 'short_description',
            'province', 'image', 'images', 'map_lat', 'map_lng',
            'featured', 'created_at', 'updated_at'
        ]
