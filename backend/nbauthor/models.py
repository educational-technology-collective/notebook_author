from django.db import models

class Assignment(models.Model):
    course = models.CharField(max_length=32)
    description = models.TextField(null=True, blank=True)
    metadata_description = models.TextField(null=True, blank=True)
    stub = models.TextField(null=True, blank=True)
    metadata_stub = models.TextField(null=True, blank=True)
    seq = models.IntegerField()

    def __str__(self):
        return f"Assignment: {self.seq}"
    

class Question(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    metadata_description = models.TextField(null=True, blank=True)
    stub = models.TextField(null=True, blank=True)
    metadata_stub = models.TextField(null=True, blank=True)
    seq = models.IntegerField()
    
    def __str__(self):
        return f"Question: {self.seq}"

class Solution(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    stub = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=32)

    def __str__(self):
        return f"Solution: {self.stub}"
    
class Test(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    stub = models.TextField(null=True, blank=True)
    metadata_stub = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=32)
    seq = models.IntegerField()
    point = models.IntegerField()
    
    def __str__(self):
        return f"Test: {self.stub}"
