from rest_framework import serializers
from .models import GalleryImage


class GalleryImageSerializer(serializers.ModelSerializer):
    destination_name = serializers.CharField(source='destination.name', read_only=True)
    destination_slug = serializers.CharField(source='destination.slug', read_only=True)

    class Meta:
        model = GalleryImage
        fields = [
            'id', 'title', 'image', 'category', 'destination_name',
            'destination_slug', 'caption', 'order', 'is_featured', 'created_at'
        ]
