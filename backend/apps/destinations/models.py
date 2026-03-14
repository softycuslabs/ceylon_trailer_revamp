from django.db import models
from django.utils.text import slugify


class Province(models.TextChoices):
    NORTHERN = 'Northern', 'Northern Province'
    NORTH_CENTRAL = 'North Central', 'North Central Province'
    NORTH_WESTERN = 'North Western', 'North Western Province'
    CENTRAL = 'Central', 'Central Province'
    EASTERN = 'Eastern', 'Eastern Province'
    SABARAGAMUWA = 'Sabaragamuwa', 'Sabaragamuwa Province'
    WESTERN = 'Western', 'Western Province'
    SOUTHERN = 'Southern', 'Southern Province'
    UVA = 'Uva', 'Uva Province'


class Destination(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    short_description = models.CharField(max_length=300, blank=True)
    province = models.CharField(max_length=50, choices=Province.choices)
    image = models.ImageField(upload_to='destinations/', blank=True, null=True)
    map_lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    map_lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class DestinationImage(models.Model):
    destination = models.ForeignKey(
        Destination, on_delete=models.CASCADE, related_name='images'
    )
    image = models.ImageField(upload_to='destinations/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.destination.name} - Image {self.order}"
