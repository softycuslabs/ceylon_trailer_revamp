from rest_framework import serializers
from .models import TravelArticle


class TravelArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelArticle
        fields = [
            'id', 'title', 'slug', 'author', 'cover_image',
            'excerpt', 'tags', 'published_at', 'created_at'
        ]


class TravelArticleDetailSerializer(serializers.ModelSerializer):
    destination_name = serializers.CharField(source='destination.name', read_only=True)
    destination_slug = serializers.CharField(source='destination.slug', read_only=True)

    class Meta:
        model = TravelArticle
        fields = [
            'id', 'title', 'slug', 'author', 'cover_image', 'content',
            'excerpt', 'destination_name', 'destination_slug', 'tags',
            'published_at', 'created_at', 'updated_at'
        ]
