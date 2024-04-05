from django.shortcuts import render
from django.http import HttpResponse

from .models import Assignment, Question
from .owner import OwnerListView, OwnerDetailView, OwnerCreateView, OwnerUpdateView, OwnerDeleteView

def index(request):
    assignments = Assignment.objects.order_by("id")
    context = {
        "assignments": assignments
    }
    return render(request, "nbauthor/assignment_list.html", context)

def assignment(request, assignment_id):
    return HttpResponse("You're looking at assignment %s." % assignment_id)

class AssignmentListView(OwnerListView):
    template_name = "nbauthor/assignment_list.html"

    def get(self, request) :
        assignment_list = Assignment.objects.all().order_by('id')
        ctx = {'assignment_list' : assignment_list}
        return render(request, self.template_name, ctx) 

class AssignmentDetailView(OwnerDetailView):
    model = Assignment
    template_name = "nbauthor/assignment_detail.html"
    
    def get(self, request, pk) :
        x = Assignment.objects.get(id=pk)
        question_list = Question.objects.filter(assignment=x).order_by('id')
        context = { 'assignment' : x, 'question_list': question_list}
        return render(request, self.template_name, context)


class AssignmentCreateView(OwnerCreateView):
    model = Assignment
    fields = ['description', 'stub', 'metadata_description', 'metadata_stub']


class AssignmentUpdateView(OwnerUpdateView):
    model = Assignment
    fields = ['description', 'stub', 'metadata_description', 'metadata_stub']


class AssignmentDeleteView(OwnerDeleteView):
    model = Assignment