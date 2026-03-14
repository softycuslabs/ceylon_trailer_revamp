"""Ceylon Trailer URL Configuration."""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/destinations/', include('apps.destinations.urls')),
    path('api/trips/', include('apps.trips.urls')),
    path('api/gallery/', include('apps.gallery.urls')),
    path('api/blog/', include('apps.blog.urls')),
    path('api/testimonials/', include('apps.testimonials.urls')),
    path('api/inquiries/', include('apps.inquiries.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Admin customization
admin.site.site_header = 'Ceylon Trailer Admin'
admin.site.site_title = 'Ceylon Trailer'
admin.site.index_title = 'Welcome to Ceylon Trailer CMS'
