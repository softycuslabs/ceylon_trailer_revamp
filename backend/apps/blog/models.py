from django.db import models
from django.utils.text import slugify
from django.utils import timezone
from apps.destinations.models import Destination


class TravelArticle(models.Model):
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True, blank=True, max_length=350)
    author = models.CharField(max_length=100, default='Ceylon Trailer Team')
    cover_image = models.ImageField(upload_to='blog/covers/', blank=True, null=True)
    content = models.TextField()
    excerpt = models.CharField(max_length=400, blank=True)
    destination = models.ForeignKey(
        Destination, on_delete=models.SET_NULL, null=True, blank=True, related_name='articles'
    )
    tags = models.JSONField(default=list, blank=True)
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)
