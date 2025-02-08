from django.urls import path
from .views import find_hotels


urlpatterns = [
    path('find_hotels/', find_hotels, name='find_hotels'),
]
