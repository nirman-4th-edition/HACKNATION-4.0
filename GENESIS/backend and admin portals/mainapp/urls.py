from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('adminprofile/', views.adminprofile, name='adminprofile'),
    path('admindashboard/', views.admindashboard, name='admindashboard'),
    path('studentprofile/', views.studentprofile, name='studentprofile'),
    path('studentprogress/', views.studentprogress, name='studentprogress'),
    path('adminnotification/', views.adminnotification, name='adminnotification'),
    path("admin/signup/", views.admin_signup, name="admin_signup"),
    path("admin/login/", views.admin_login, name="admin_login"),
]
