from django.core.mail import send_mail,EmailMessage
import os
from django.conf import settings
from django.urls import reverse
dj_url = "http://127.0.0.1:8000"
def send_forget_password_mail(email,token):
    subject = 'Your forget password link by support@clearcheck'
    message = f'Hi , Please click on the link to reset your password {dj_url}/change-password/{token}/'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject,message,email_from,recipient_list)
    
def send_mail_user(email):
    subject = 'Your id has been verified successfully '
    message = (
        f'You have been verified successfully \n'
        f'Please click on the link to Download file 1 :-  {dj_url}/download/file1.exe  \n'
        f'Please click on the link to Download file 2 :-  {dj_url}/download/file2.exe  \n'
        
        )
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject,message,email_from,recipient_list)
    
def send_verification_email(profile):
    verification_link = f"{dj_url}/verify-college/{profile.id}/"
    subject = 'Verify College ID'
    recipient_list = ["kanishk.01kumar01@gmail.com"]  # Add campus ambassador's email here
    email_from = settings.EMAIL_HOST_USER

    # Email content
    message = (
        f"Please verify the college ID for {profile.user_type}. "
        f"The given registration ID is: {profile.regid}. "
        f"Click the link below to verify:\n\n{verification_link}"
    )
    email = EmailMessage(subject, message, email_from, recipient_list)

    if profile.idimg and profile.idimg.name != 'blank_profile.jpg':
        image_path = profile.idimg.path
        if os.path.exists(image_path):
            email.attach_file(image_path)
        else:
            print("File not found:", image_path)
    else:
        print("No custom image found, or using default image.")

    email.send(fail_silently=False)
    