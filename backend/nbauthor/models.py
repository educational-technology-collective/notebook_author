from django.db import models

class Assignment(models.Model):
    description = models.TextField(blank=True)
    metadata_description = models.TextField(blank=True)
    stub = models.TextField(blank=True)
    metadata_stub = models.TextField(blank=True)

    def __str__(self):
        return f"Assignment: {self.description}"
    

class Question(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    description = models.TextField()
    metadata_description = models.TextField()
    stub = models.TextField()
    metadata_stub = models.TextField()
    seq = models.IntegerField()

class Solution(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    stub = models.TextField()
    category = models.CharField(max_length=10)
    
class Test(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    stub = models.TextField()
    metadata_stub = models.TextField()
    category = models.CharField(max_length=10)
    seq = models.IntegerField()
    point = models.IntegerField()
