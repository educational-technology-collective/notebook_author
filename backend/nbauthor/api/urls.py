from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import AssignmentViewSet

nbauthor_router = DefaultRouter()
nbauthor_router.register(r'nbauthor', AssignmentViewSet)


