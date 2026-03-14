from django.db import models
from django.utils.text import slugify
from apps.destinations.models import Destination


class ActivityType(models.TextChoices):
    ARCHAEOLOGICAL = 'archaeological', 'Archaeological'
    WATERFALLS = 'waterfalls', 'Waterfalls'
    HIKING = 'hiking', 'Hiking'
    LEISURE = 'leisure', 'Leisure Time'
    BEACH = 'beach', 'Beach Events'
    BOATING = 'boating', 'Boating'
    KAYAKING = 'kayaking', 'Kayaking'
    CYCLING = 'cycling', 'Cycling'
    WILDLIFE = 'wildlife', 'Wildlife Safari'
    CULTURAL = 'cultural', 'Cultural'


class TripType(models.TextChoices):
    ADVENTURE = 'adventure', 'Adventure'
    CULTURAL = 'cultural', 'Cultural'
    WILDLIFE = 'wildlife', 'Wildlife'
    BEACH = 'beach', 'Beach'
    PILGRIMAGE = 'pilgrimage', 'Pilgrimage'
    HONEYMOON = 'honeymoon', 'Honeymoon'
    FAMILY = 'family', 'Family'
    GROUP = 'group', 'Group'


class Trip(models.Model):
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True, blank=True, max_length=350)
    destination = models.ForeignKey(
        Destination, on_delete=models.SET_NULL, null=True, related_name='trips'
    )
    duration_days = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.TextField()
    short_description = models.CharField(max_length=300, blank=True)
    cover_image = models.ImageField(upload_to='trips/covers/', blank=True, null=True)
    activities = models.JSONField(default=list, blank=True)
    trip_type = models.CharField(max_length=50, choices=TripType.choices, default=TripType.CULTURAL)
    highlights = models.JSONField(default=list, blank=True)
    featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class TripImage(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='trips/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.trip.title} - Image {self.order}"


class TripItineraryDay(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='itinerary')
    day_number = models.PositiveIntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    activities = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ['day_number']
        unique_together = ['trip', 'day_number']

    def __str__(self):
        return f"{self.trip.title} - Day {self.day_number}: {self.title}"
