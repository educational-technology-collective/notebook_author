from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import AssignmentViewSet, QuestionViewSet, SolutionViewSet, TestViewSet, FileViewSet

nbauthor_router = DefaultRouter()
nbauthor_router.register(r'assignment', AssignmentViewSet)
nbauthor_router.register(r'question', QuestionViewSet)
nbauthor_router.register(r'solution', SolutionViewSet)
nbauthor_router.register(r'test', TestViewSet)
nbauthor_router.register(r'file', FileViewSet, basename="file")


