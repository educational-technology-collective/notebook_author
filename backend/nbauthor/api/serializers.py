from rest_framework.serializers import ModelSerializer
from ..models import Assignment, Question, Solution, Test

class AssignmentSerializer(ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__' 

class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
 
class SolutionSerializer(ModelSerializer):
    class Meta:
        model = Solution
        fields = '__all__' 

class TestSerializer(ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__' 
        