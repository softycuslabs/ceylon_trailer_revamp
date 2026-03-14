from django.contrib import admin
from .models import GalleryImage


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'destination', 'is_featured', 'order', 'created_at']
    list_filter = ['category', 'is_featured']
    search_fields = ['title', 'caption']
    list_editable = ['is_featured', 'order']
