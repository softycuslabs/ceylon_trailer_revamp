from django.contrib import admin
from .models import TravelArticle


@admin.register(TravelArticle)
class TravelArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'destination', 'is_published', 'published_at', 'created_at']
    list_filter = ['is_published', 'destination']
    search_fields = ['title', 'content', 'author']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_published']
    date_hierarchy = 'published_at'
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'author', 'cover_image', 'excerpt', 'content')
        }),
        ('Categorization', {
            'fields': ('destination', 'tags')
        }),
        ('Publishing', {
            'fields': ('is_published', 'published_at')
        }),
    )
