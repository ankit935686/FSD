from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Student(AbstractUser):
    student_id = models.CharField(max_length=20, unique=True, null=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    github_username = models.CharField(max_length=100, null=True, blank=True)
    github_url = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return self.username
