from django.contrib import admin
from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'country', 'trip', 'destination', 'status', 'created_at']
    list_filter = ['status', 'country', 'created_at']
    search_fields = ['name', 'email', 'phone', 'country', 'message']
    list_editable = ['status']
    readonly_fields = ['name', 'email', 'phone', 'country', 'message', 'trip', 'destination',
                       'travel_date', 'number_of_travelers', 'created_at', 'updated_at']
    date_hierarchy = 'created_at'

    def has_add_permission(self, request):
        return False

    fieldsets = (
        ('Contact Info', {
            'fields': ('name', 'email', 'phone', 'country')
        }),
        ('Inquiry Details', {
            'fields': ('trip', 'destination', 'travel_date', 'number_of_travelers', 'message')
        }),
        ('Status & Dates', {
            'fields': ('status', 'created_at', 'updated_at')
        }),
    )
