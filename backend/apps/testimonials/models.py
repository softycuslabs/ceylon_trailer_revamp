from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=5
    )
    comment = models.TextField()
    trip = models.ForeignKey(
        'trips.Trip', on_delete=models.SET_NULL, null=True, blank=True, related_name='testimonials'
    )
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.country}) - {self.rating}★"
