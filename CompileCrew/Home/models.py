from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
import uuid
from datetime import datetime
from django.utils.timezone import now
from datetime import timedelta
from django.utils import timezone
from .helpers import *

User = get_user_model()
class Profile(models.Model):
    user_type = models.CharField(max_length=7, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    forget_password_token = models.CharField(max_length=100)
    id_user = models.IntegerField(blank=True, null=True) 
    is_verified = models.BooleanField(default=False)
    email = models.EmailField(blank=True)
    profileimg = models.ImageField(upload_to='profile_images', default='blank_profile.jpg', null=True)
    idimg = models.ImageField(upload_to='id_images', default='blank_profile.jpg', null=True)
    regid = models.CharField(max_length=100, blank=True,null=True)
    location = models.CharField(max_length=100, blank=True)
    college = models.CharField(max_length=100, blank=True)
    point =  models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.id_user:
            self.id_user = self.user.id  # Automatically set id_user to the User's ID
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username
    
class Question(models.Model):
    QUESTION_TYPES = [
        ('mcq', 'Multiple Choice'),
        ('truefalse', 'True/False'),
        ('shortanswer', 'Short Answer'),
        ('code', 'Code'),
    ]

    DIFFICULTY_LEVELS = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]

    PROGRAMMING_LANGUAGES = [
        ('python', 'Python'),
        ('javascript', 'JavaScript'),
        ('java', 'Java'),
        ('cpp', 'C++'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    exam_code = models.CharField(max_length=20)
    question_text = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_LEVELS)
    options = models.TextField(blank=True, null=True)  # Store options as comma-separated values
    correct_answer = models.TextField()
    programming_language = models.CharField(max_length=20, choices=PROGRAMMING_LANGUAGES, blank=True, null=True)
    code_template = models.TextField(blank=True, null=True)
    
    def get_options(self):
        """Convert stored options from text to list."""
        return self.options.split(',') if self.options else []

    def __str__(self):
        return f"{self.exam_code} - {self.question_text[:50]}"
    
class Result(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    exam_code = models.CharField(max_length=20)
    score = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    
class Exam(models.Model):
    exam_code = models.CharField(max_length=20,blank=True,null=True)
    recipient = models.TextField(blank=True,null=True )
    start_time = models.DateTimeField(default=now)
    duration = models.DurationField()  # Store duration as timedelta

    @property
    def end_time(self):
        return self.start_time + self.duration

    def __str__(self):
        return self.exam_code
    
class StudentAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.TextField()
    is_correct = models.BooleanField(default=False)
    is_attempted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.question.exam_code}"
    
