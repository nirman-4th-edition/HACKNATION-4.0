from django.contrib import admin
from django.urls import path
from home import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',views.signin,name='signin'),
    path('index',views.index,name='index'),
    path('api/receive-status/', views.receive_status, name='receive_status'),
    path('signup',views.signup,name='signup'),
    path('dashboard',views.dashboard,name='dashboard'),
    path('student_dashboard',views.student_dashboard,name='student_dashboard'),
    path('setting',views.setting,name='setting'),
    path('forget-password',views.ForgetPassword,name='forget_password'),
    path('change-password/<token>/',views.ChangePassword,name='change_password'),
    path('question_form/', views.question_form, name="question_form"),
    path('verify-college/<int:profile_id>/', views.verify_college, name='verify_college'),
    path('delete/<int:question_id>/', views.delete_question, name="delete_question"),
    path('verification-success', views.verification_success, name='verification_success'),
    path('logout',views.logout,name='logout'),
    # path('process-frame/',views.process_frame, name='process-frame'),
    path('api/get-status/', views.get_status, name='get_status'),
    path('exam_set/',views.exam_set,name='exam_set'),
    path('answer_exam/', views.answer_exam, name='answer_exam'),
    path('take_exam/', views.take_exam, name='take_exam'),
    path('download/<str:filename>/', views.download_file, name='download_file'),
    path('result/<str:exam_code>/', views.result_view, name='result_view'),
]
if settings.DEBUG:
   urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)