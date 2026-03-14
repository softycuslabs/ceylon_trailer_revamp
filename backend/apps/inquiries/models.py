from django.db import models


class InquiryStatus(models.TextChoices):
    NEW = 'new', 'New'
    CONTACTED = 'contacted', 'Contacted'
    CLOSED = 'closed', 'Closed'


class Inquiry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    message = models.TextField()
    trip = models.ForeignKey(
        'trips.Trip', on_delete=models.SET_NULL, null=True, blank=True, related_name='inquiries'
    )
    destination = models.ForeignKey(
        'destinations.Destination', on_delete=models.SET_NULL, null=True, blank=True, related_name='inquiries'
    )
    travel_date = models.DateField(null=True, blank=True)
    number_of_travelers = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20, choices=InquiryStatus.choices, default=InquiryStatus.NEW)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Inquiries'

    def __str__(self):
        return f"{self.name} - {self.email} ({self.status})"
