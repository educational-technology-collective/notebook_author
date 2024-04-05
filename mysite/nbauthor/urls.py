from django.urls import path, reverse_lazy

from . import views

app_name = 'nbauthor'
urlpatterns = [
    path('', views.AssignmentListView.as_view(), name='all'),
    path('assignment/<int:pk>', views.AssignmentDetailView.as_view(), name='assignment_detail'),
    path('assignment/create', 
        views.AssignmentCreateView.as_view(success_url=reverse_lazy('nbauthor:all')), name='assignment_create'),
    path('assignment/<int:pk>/update', 
        views.AssignmentUpdateView.as_view(success_url=reverse_lazy('nbauthor:all')), name='assignment_update'),
    path('assignment/<int:pk>/delete', 
        views.AssignmentDeleteView.as_view(success_url=reverse_lazy('nbauthor:all')), name='assignment_delete'),
]