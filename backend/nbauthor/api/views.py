from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Assignment, Question, Solution, Test
from .serializers import AssignmentSerializer, QuestionSerializer, SolutionSerializer, TestSerializer, FileSerializer
from .utils.nb2psql import nb2psql
from .utils.psql2nb import psql2nb

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
    
class FileViewSet(ViewSet):
    serializer_class = FileSerializer
     
    def list(self, request):
        assignment = request.GET['assignment']
        raw = psql2nb(assignment)
        return Response(raw)

    def create(self, request):
        file = request.FILES.get('file')
        nb2psql(file)
        return Response("Uploaded")
    