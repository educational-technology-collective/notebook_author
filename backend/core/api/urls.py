from rest_framework.routers import DefaultRouter
from nbauthor.api.urls import nbauthor_router
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(nbauthor_router.registry)

urlpatterns = [
    path('', include(router.urls))
]

