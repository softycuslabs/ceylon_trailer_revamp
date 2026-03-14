from rest_framework.routers import DefaultRouter
from .views import TravelArticleViewSet

router = DefaultRouter()
router.register(r'', TravelArticleViewSet, basename='article')

urlpatterns = router.urls
