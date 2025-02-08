from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def adminprofile(request):
    return render(request, 'adminprofile.html')

def admindashboard(request):
    return render(request, 'home.html')

def adminnotification(request):
    return render(request, 'adminnotification.html')

def studentprofile(request):
    return render(request, 'studentprofile.html')

def studentprogress(request):
    return render(request, 'studentprogress.html')    

from django.shortcuts import render, redirect
from django.contrib import messages
import firebase_admin
from firebase_admin import auth

# Admin Signup
def admin_signup(request):
    if request.method == "POST":
        email = request.POST["email"]
        password = request.POST["password"]
        try:
            user = auth.create_user(email=email, password=password)
            messages.success(request, "Admin registered successfully!")
            return redirect("admin_login")
        except Exception as e:
            messages.error(request, str(e))
    
    return render(request, "admin_signup.html")


# Admin Login
def admin_login(request):
    if request.method == "POST":
        email = request.POST["email"]
        password = request.POST["password"]

        try:
            user = auth.get_user_by_email(email)
            messages.success(request, "Login successful!")
            return redirect('/')
        except Exception as e:
            messages.error(request, "Invalid email or password")
    
    return render(request, "admin_login.html")


# Admin Dashboard (Restricted Access)
def admin_dashboard(request):
    return render(request, "admin_dashboard.html")
