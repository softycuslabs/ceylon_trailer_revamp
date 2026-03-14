from django.db import models
from apps.destinations.models import Destination


class GalleryCategory(models.TextChoices):
    DESTINATIONS = 'destinations', 'Destinations'
    WILDLIFE = 'wildlife', 'Wildlife'
    CULTURE = 'culture', 'Culture'
    LANDSCAPE = 'landscape', 'Landscape'
    PEOPLE = 'people', 'People'
    FOOD = 'food', 'Food'
    ACCOMMODATION = 'accommodation', 'Accommodation'


class GalleryImage(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=50, choices=GalleryCategory.choices, default=GalleryCategory.DESTINATIONS)
    destination = models.ForeignKey(
        Destination, on_delete=models.SET_NULL, null=True, blank=True, related_name='gallery_images'
    )
    caption = models.CharField(max_length=300, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title
