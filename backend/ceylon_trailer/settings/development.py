"""Development settings for Ceylon Trailer."""
import os
from dotenv import load_dotenv
from .base import *  # noqa

load_dotenv(BASE_DIR / '.env')

DEBUG = True

SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-not-for-production-use')

ALLOWED_HOSTS = ['*']

# SQLite for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Use local file storage in development if Cloudinary not configured
if not os.environ.get('CLOUDINARY_CLOUD_NAME'):
    DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'

CORS_ALLOW_ALL_ORIGINS = True

# Debug toolbar (optional)
REST_FRAMEWORK = {
    **REST_FRAMEWORK,  # noqa: F405
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}
