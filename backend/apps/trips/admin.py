from django.contrib import admin
from .models import Trip, TripImage, TripItineraryDay


class TripImageInline(admin.TabularInline):
    model = TripImage
    extra = 3
    fields = ['image', 'caption', 'order']


class TripItineraryDayInline(admin.StackedInline):
    model = TripItineraryDay
    extra = 1
    fields = ['day_number', 'title', 'description', 'activities']


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ['title', 'destination', 'trip_type', 'duration_days', 'price', 'featured', 'is_active']
    list_filter = ['trip_type', 'featured', 'is_active', 'destination__province']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['featured', 'is_active']
    inlines = [TripImageInline, TripItineraryDayInline]
    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'slug', 'destination', 'trip_type', 'cover_image', 'featured', 'is_active')
        }),
        ('Details', {
            'fields': ('short_description', 'description', 'duration_days', 'price')
        }),
        ('Activities & Highlights', {
            'fields': ('activities', 'highlights'),
            'description': 'Enter as JSON arrays, e.g. ["Hiking", "Swimming"]'
        }),
    )


@admin.register(TripImage)
class TripImageAdmin(admin.ModelAdmin):
    list_display = ['trip', 'caption', 'order']
    list_filter = ['trip']


@admin.register(TripItineraryDay)
class TripItineraryDayAdmin(admin.ModelAdmin):
    list_display = ['trip', 'day_number', 'title']
    list_filter = ['trip']
