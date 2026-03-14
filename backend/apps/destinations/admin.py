from django.contrib import admin
from .models import Destination, DestinationImage


class DestinationImageInline(admin.TabularInline):
    model = DestinationImage
    extra = 3
    fields = ['image', 'caption', 'order']


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ['name', 'province', 'featured', 'is_active', 'created_at']
    list_filter = ['province', 'featured', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['featured', 'is_active']
    inlines = [DestinationImageInline]
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'slug', 'province', 'image', 'featured', 'is_active')
        }),
        ('Content', {
            'fields': ('short_description', 'description')
        }),
        ('Map Coordinates', {
            'fields': ('map_lat', 'map_lng'),
            'classes': ('collapse',)
        }),
    )


@admin.register(DestinationImage)
class DestinationImageAdmin(admin.ModelAdmin):
    list_display = ['destination', 'caption', 'order']
    list_filter = ['destination']
