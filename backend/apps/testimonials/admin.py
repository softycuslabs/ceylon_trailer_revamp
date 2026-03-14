from django.contrib import admin
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'country', 'rating', 'trip', 'is_approved', 'created_at']
    list_filter = ['is_approved', 'rating']
    search_fields = ['name', 'country', 'comment']
    list_editable = ['is_approved']
    actions = ['approve_testimonials']

    def approve_testimonials(self, request, queryset):
        queryset.update(is_approved=True)
    approve_testimonials.short_description = 'Approve selected testimonials'
