from rest_framework.routers import DefaultRouter
from .views import DestinationViewSet, DestinationImageViewSet

router = DefaultRouter()
router.register(r'', DestinationViewSet, basename='destination')
router.register(r'images', DestinationImageViewSet, basename='destination-image')

urlpatterns = router.urls
