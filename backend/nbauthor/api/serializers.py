from rest_framework.serializers import ModelSerializer
from ..models import Assignment

class AssignmentSerializer(ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('id', 'description', 'metadata_description', 'stub','metadata_stub')