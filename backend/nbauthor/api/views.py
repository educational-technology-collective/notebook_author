from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Assignment, Question, Solution, Test
from .serializers import AssignmentSerializer, QuestionSerializer, SolutionSerializer, TestSerializer

class AssignmentViewSet(ModelViewSet):
    queryset = Assignment.objects.all().order_by('seq')
    serializer_class = AssignmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['course']
    
class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all().order_by('seq')
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['assignment']
    
class SolutionViewSet(ModelViewSet):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['question']
    
class TestViewSet(ModelViewSet):
    queryset = Test.objects.all().order_by('seq')
    serializer_class = TestSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['question']
    