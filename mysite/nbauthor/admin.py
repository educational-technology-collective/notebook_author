from django.contrib import admin

from .models import Assignment, Question, Solution, Test

# Register your models here.
admin.site.register(Assignment)
admin.site.register(Question)
admin.site.register(Solution)
admin.site.register(Test)
