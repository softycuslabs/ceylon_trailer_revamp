from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Inquiry
from .serializers import InquirySerializer


class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    http_method_names = ['post', 'head', 'options']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'message': 'Thank you! Your inquiry has been received. We will contact you shortly.'},
            status=status.HTTP_201_CREATED
        )
