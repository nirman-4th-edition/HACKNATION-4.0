from django.contrib import admin
from django.urls import path
from home import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns =  [
    path('',views.signin,name='signin'),
    path('index',views.index,name='index'),
    path('signup',views.signup,name='signup'),
    path('setting',views.setting,name='setting'),
    path('dashboard',views.dashboard,name='dashboard'),
    path('question_form/', views.question_form, name="question_form"),
    path('forget-password',views.ForgetPassword,name='forget_password'),
    path('change-password/<token>/',views.ChangePassword,name='change_password'),
    path('verify-college/<int:profile_id>/', views.verify_college, name='verify_college'),
    path('delete/<int:question_id>/', views.delete_question, name="delete_question"),
    path('verification-success', views.verification_success, name='verification_success'),
    path('logout',views.logout,name='logout'),
]
if settings.DEBUG:
   urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)