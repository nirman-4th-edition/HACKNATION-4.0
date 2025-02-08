from django.shortcuts import get_object_or_404, render,redirect
from django.http import HttpResponse, HttpResponseNotFound,JsonResponse
from django.contrib import messages
from django.contrib.auth.models import User,auth,Group
from .models import *
from django.contrib.auth.decorators import login_required,user_passes_test
from itertools import chain
from django.views.decorators.csrf import csrf_exempt
import  random
import datetime 
import uuid
from django.utils import timezone
from django.core.files.storage import default_storage
from django.conf import settings
import json
from django.http import FileResponse
import os
from .helpers import *
import os
import pickle
import numpy as np
from django.utils.dateparse import parse_datetime
from datetime import timedelta
from PIL import Image
import io


# Create your views here.
@login_required(login_url='signin')
def index(request):
    return render(request,'index.html')

@login_required(login_url='signin')
def dashboard(request):
    return render(request,'dashboard.html')


@login_required(login_url='signin')
def student_dashboard(request):
    """Displays the student dashboard and allows students to enter an exam code."""
    profile_obj = Profile.objects.get(user=request.user)
    
    if request.method == 'POST':
        exam_code = request.POST.get('exam_code')
        print(f"Exam code: {exam_code}")
        
        if not exam_code:
            messages.error(request, "Please provide an exam code.")
            return redirect('student_dashboard')

        questions = Question.objects.filter(exam_code=f"EXAM - {exam_code}")
        
        if not questions.exists():
            messages.error(request, "No exam found with the provided code.")
            return redirect('student_dashboard')
       
            
        request.session['exam_code'] = exam_code  # Store the exam code in the session
        
        if profile_obj.user_type == 'student':
            return redirect('take_exam')
        elif profile_obj:
            return redirect('take_exam')
        
        else:
            messages.error(request, "Run file2.exe First the try again")
            return redirect('student_dashboard') # Redirect without passing questions directly
    
   
    return render(request, 'student_dashboard.html')



@login_required(login_url='signin')
def take_exam(request):
    """Handles the actual exam-taking process."""
    exam_code = request.session.get('exam_code')
    
    if not exam_code:
        messages.error(request, "No active exam session found. Please try again.")
        return redirect('student_dashboard')

    questions = Question.objects.filter(exam_code=f"EXAM - {exam_code}")
    print(questions)
    
    if request.method == "POST":
        answers = {}
        for question in questions:
            answer = request.POST.get(f"answer_{question.id}")
            if answer:
                is_correct = answer.strip().lower() == question.correct_answer.strip().lower()
                
                # Save the student's answer
                StudentAnswer.objects.update_or_create(
                    user=request.user,
                    question=question,
                    is_attempted = True,
                    defaults={"answer": answer, "is_correct": is_correct}
                )
                answers[question.id] = is_correct
        attempt = StudentAnswer.objects.filter(is_attempted=True)
        correct_answers = sum(answers.values())
        total_questions = questions.count()
        score = int((correct_answers / total_questions) * 100) if total_questions > 0 else 0
        attempted_questions = StudentAnswer.objects.filter(
            user=request.user,
            question__exam_code=f"EXAM - {exam_code}",
            is_attempted=True
        ).count()

        Result.objects.create(user=request.user, exam_code=exam_code, score=score)
        
        messages.success(request, f"Exam submitted! Successfully ")
        del request.session['exam_code']  # Clear the session after submission
        return render(request,'thank_you.html',{"total":total_questions,"attempt":attempted_questions})

    return render(request, "take_exam.html", {"questions": questions})


@login_required(login_url='signin')
def answer_exam(request):
    """Deprecated: This view can be merged with take_exam."""
    messages.info(request, "This functionality is now part of 'take_exam'.")
    return redirect('student_dashboard')

def generate_exam_code():
    return "EXAM - "+str(uuid.uuid4())[:8]

def question_form(request):
    """Render the form and handle question submission."""
    if request.method == "POST":
        question_text = request.POST.get("questionText")
        question_type = request.POST.get("questionType")
        difficulty = request.POST.get("difficulty")
        correct_answer = request.POST.get("correctAnswer")
        
        # Check if the exam code is already stored in the session
        if "exam_code" not in request.session:
            exam_code = generate_exam_code()  # Generate a new exam code
            request.session["exam_code"] = exam_code  # Store it in the session
        else:
            exam_code = request.session["exam_code"]  # Use the stored exam code

        # Handle options
        options = request.POST.getlist("options")
        options_text = ",".join(options) if options else ""

        # Handle code-related fields
        programming_language = request.POST.get("programmingLanguage", "")
        code_template = request.POST.get("codeTemplate", "")

        # Save to the database
        Question.objects.create(
            user = request.user,
            exam_code=exam_code,
            question_text=question_text,
            question_type=question_type,
            difficulty=difficulty,
            options=options_text,
            correct_answer=correct_answer,
            programming_language=programming_language if question_type == "code" else None,
            code_template=code_template if question_type == "code" else None
        )

        return redirect("question_form")  # Redirect to the form after submission

    # Fetch all questions to display in the frontend
    questions = Question.objects.all()
    return render(request, "question.html", {"questions": questions})

def delete_question(request, question_id):
    """Delete a specific question."""
    question = Question.objects.get(id=question_id)
    question.delete()
    return redirect("question_form")

def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('pass')
        password_confirm = request.POST.get('pass1')
        college = request.POST.get('uni')
        reg = request.POST.get('reg')
        user_type = request.POST.get('pro')
        # Check if passwords match
        if password != password_confirm:
            messages.info(request, 'Passwords do not match')
            return redirect('signup')
        
        if len(password)<8:
            messages.info(request, 'Password is Too Small should be greater than 7')
            return redirect('signup')
        
        
        # Check if email is already taken
        if User.objects.filter(email=email).exists():
            messages.info(request, 'Email is already taken')
            return redirect('signup')

        # Check if username is already taken
        if User.objects.filter(username=username).exists():
            messages.info(request, 'Username is already taken')
            return redirect('signup')

        # Validate 'reg' input
        if not reg.isdigit():
            messages.info(request, 'Registration ID must be a valid integer')
            return redirect('signup')

        reg_int = int(reg)
        if not (1000000000 <= reg_int <= 2999999999):
            messages.info(request, 'Registration ID is out of the valid range')
            return redirect('signup')

        # Create the user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        # Authenticate and log in the user
        user_login = auth.authenticate(username=username, password=password)
        if user_login is not None:
            auth.login(request, user_login)
        else:
            messages.info(request, 'Authentication failed')
            return redirect('signup')

        # Create the Profile with all required fields
        try:
            new_profile = Profile.objects.create(
                user_type = user_type,
                user=user,
                email=email,
                id_user=user.id,
                regid=reg_int,
                college=college,
                location='',
                point=5,
            )
            new_profile.save()
        except Exception as e:
            messages.info(request, f'Error creating profile: {e}')
            return redirect('signup')

        return redirect('setting')

    else:
        return render(request, 'signup.html')
    

def signin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        p = request.POST.get('pass')
        user = auth.authenticate(username=username, password=p)

        if user is not None:
            try:
                profile_obj = Profile.objects.get(user=user)
                auth.login(request, user)
                request.session['profile_id'] = profile_obj.id

                if profile_obj.user_type == 'Student':
                    return redirect('student_dashboard')
                else:
                    exam_codes = Question.objects.filter(user=request.user).values_list('exam_code', flat=True).distinct()
                    questions = Question.objects.filter(user=request.user)

                    context = {
                        'exam_codes': exam_codes,
                        'questions': questions,
                        'profile_obj': profile_obj,
                    }
                    return render(request, 'dashboard.html', context)

            except Profile.DoesNotExist:
                messages.error(request, "Profile not found. Please contact support.")
                return redirect('signin')
        else:
            messages.error(request, "Invalid credentials.")
            return redirect('signin')
    else:
        return render(request, 'signin.html')

# Create your views here.

def ChangePassword(request, token):
    context = {}
    try:
        profile_obj = Profile.objects.filter(forget_password_token=token).first()

        if profile_obj is None:
            messages.error(request, 'Invalid or expired token.')
            return redirect('forget-password')  # Redirect to forget password page or any relevant page

        context = {'user_id': profile_obj.user.id}

        if request.method == 'POST':
            new_password = request.POST.get('pass')
            confirm_password = request.POST.get('pass1')
            user_id = request.POST.get('user_id')

            if user_id is None:
                messages.warning(request, 'No user ID found.')
                return redirect(f'/change-password/{token}/')

            if new_password != confirm_password:
                messages.warning(request, 'Passwords do not match.')
                return redirect(f'/change-password/{token}/')

            user_obj = User.objects.get(id=user_id)
            user_obj.set_password(new_password)
            user_obj.save()

            # Clear the token after successful password reset
            profile_obj.forget_password_token = None
            profile_obj.save()

            messages.success(request, 'Password changed successfully. Please sign in.')
            return redirect('signin')

    except Exception as e:
        print(e)
        messages.error(request, 'Something went wrong. Please try again.')
        return redirect('forget-password')  # Redirect to forget password page or any relevant page

    return render(request, 'change-password.html', context)

@login_required(login_url='signin')
def setting(request):
    user_profile, created = Profile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        location = request.POST.get('location')

        pimage = request.FILES.get('pimage')
        if pimage:
            user_profile.profileimg = pimage

        cimage = request.FILES.get('cimage')
        if cimage:
            user_profile.idimg = cimage
            user_profile.save()  # Save before sending email to get profile ID
            send_verification_email(user_profile)
            
            

        user_profile.location = location
        user_profile.id_user = request.user.id  # Set id_user to the user's ID
        user_profile.save()
        
        return redirect('setting')

    return render(request, 'setting.html', {'user_profile': user_profile})

def ForgetPassword(request):
    try:
        if request.method == 'POST':
            username = request.POST.get('username')

            if not User.objects.filter(username=username).exists():
                messages.warning(request, 'No user found with this username.')
                return redirect('/forget-password')

            user_obj = User.objects.get(username=username)
            token = str(uuid.uuid4())

            profile_obj, created = Profile.objects.get_or_create(user=user_obj)
            profile_obj.forget_password_token = token
            profile_obj.save()

            send_forget_password_mail(user_obj.email, token)
            messages.success(request, 'A link has been sent to your registered email.')
            return redirect('/forget-password')

    except Exception as e:
        print(e)
        messages.error(request, 'Something went wrong. Please try again.')
    
    return render(request, 'forget-password.html')

def verification_success(request):
    user_object = User.objects.get(username=request.user)
    profile = Profile.objects.get(user=user_object)
    profile.point += 200
    profile.save()
    return render(request, 'verification_success.html')

def verify_college(request, profile_id):
    profile = get_object_or_404(Profile, id=profile_id)
    profile.is_verified = True
    profile.save()
    messages.success(request, 'College ID verified successfully.')
    return redirect('verification_success')

@login_required(login_url='signin')
def result_view(request, exam_code):
    """Displays the results for a specific exam."""
    exam_questions = Question.objects.filter(exam_code=f"EXAM - {exam_code}")
    print(exam_questions)
    
    if not exam_questions.exists():
        messages.error(request, "Exam not found.")
        return redirect('student_dashboard')
    
    # Fetching results for the given exam code
    results = Result.objects.filter(exam_code=exam_code)
    # Preparing the result data
    result_data = [
        {
            "student_name": result.user.username if result.user else "Unknown",
            "student_id": result.user.id if result.user else "N/A",
            "score": result.score,
            "status": "Pass" if result.score >= 50 else "Fail",  # Pass if score is 50 or higher
            "timestamp": result.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        }
        for result in results
    ]
    
    context = {
        "exam_code": exam_code,
        "exam": exam_questions.first(),  # Passing the first question as a reference to the exam
        "results": result_data,
    }
    return render(request, "results.html", context)


# @login_required(login_url='signin')
# def answer_exam(request):
#     if request.method == "POST":
#         exam_code = request.POST.get("exam_code")

#         if not exam_code:
#             messages.error(request, "Please provide an exam code.")
#             return redirect('student_dashboard')

#         questions = Question.objects.filter(exam_code=exam_code)

#         if not questions.exists():
#             messages.error(request, "No exam found with the provided code.")
#             return redirect('student_dashboard')

#         request.session['exam_code'] = exam_code
#         return render(request, "take_exam.html",{"questions":questions})

#     return render(request, "answer_exam.html")


# @login_required(login_url='signin')
# def take_exam(request):
#     exam_code = request.POST.get('exam_code')

#     if not exam_code:
#         messages.error(request, "Invalid exam session. Please try again.")
#         return redirect('student_dashboard')

#     questions = Question.objects.filter(exam_code=exam_code)
    
#     if request.method == "POST":
#         answers = {}
#         for question in questions:
#             answer = request.POST.get(f"answer_{question.id}")
#             if answer:  # Check if the answer is provided
#                 is_correct = answer.strip().lower() == question.correct_answer.strip().lower()
                
#                 # Save the student's answer
#                 StudentAnswer.objects.create(
#                     user=request.user,
#                     question=question,
#                     answer=answer,
#                     is_correct=is_correct
#                 )
#                 answers[question.id] = is_correct

#         # Calculate the score
#         correct_answers = sum(answers.values())
#         total_questions = questions.count()
#         score = int((correct_answers / total_questions) * 100) if total_questions > 0 else 0

#         # Save the result
#         Result.objects.create(user=request.user, exam_code=exam_code, score=score)

#         messages.success(request, f"Exam submitted! Your score: {score}%")
#         del request.session['exam_code']
#         return redirect('student_dashboard')

#     return render(request, "take_exam.html")
latest_status = {}
@csrf_exempt  # Disable CSRF protection for this endpoint (only if necessary)
def receive_status(request):
    global latest_status
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))

            # Extract data from the request
            monitors = data.get('monitors', [])
            devices = data.get('devices', [])
            webcams = data.get('webcams', [])
            print(f"Monitors: {monitors}")
            print(f"Devices: {devices}")
            print(f"Webcams: {webcams}")

            # Condition to trigger an action (replace this with your custom logic)
            if check_condition(monitors, devices, webcams):
                print("resume")
                latest_status = {'status': 'resume', 'message': 'Condition met. Resuming exam.'}
                # return JsonResponse({'status': 'resume', 'message': 'Condition met. Resuming exam.'})
            else:
                print("alert")
                latest_status = {'status': 'alert', 'message': 'External Insertion Has Been Detected.'}
                # return JsonResponse({'status': 'alert', 'message': 'Condition failed. Alert triggered!'})


            # return JsonResponse({'status': 'success', 'message': 'Data received successfully'})

        except json.JSONDecodeError:
            print("error1")
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    print("error2")
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

def get_status(request):
    return JsonResponse(latest_status)

def download_file(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, 'executables', filename)
    if os.path.exists(file_path):
        return FileResponse(open(file_path, 'rb'), as_attachment=True, filename=filename)
    else:
        return HttpResponseNotFound('File not found')

def check_condition(monitors, devices, webcams):
    if len(webcams)> 1 or len(monitors)>1:
        return False
    if any(device['type'] == 'external' for device in devices):
        return False
    else :
        return True
    
def exam_set(request):
    if request.method == 'POST':
        exam_code = request.POST.get('exam_code')
        recipient = request.POST.get('recipient')
        start_time = parse_datetime(request.POST.get('start_time'))
        duration_minutes = request.POST.get('duration')

        if not start_time or not duration_minutes:
            return render(request, 'set_exam.html', {'error': 'All fields are required!'})
        exam = Exam.objects.create(
            exam_code=exam_code,
            recipient=recipient,
            start_time=start_time,
           duration=timedelta(minutes=int(duration_minutes))
        )
        # Extract emails from the recipient string
        send_to_recipient(recipient,exam)
        return render(request, 'set_exam.html', {'success': 'Exam created successfully!'})
    return render(request, 'set_exam.html')
        
def logout(request):
    auth.logout(request)
    return redirect('signin')

# extra

        
    