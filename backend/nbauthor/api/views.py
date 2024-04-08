from rest_framework.viewsets import ModelViewSet
from ..models import Assignment
from .serializers import AssignmentSerializer

class AssignmentViewSet(ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    