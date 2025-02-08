package com.mahakal.error404.Services;

import com.mahakal.error404.Model.Otp;
import com.mahakal.error404.Repo.OtpRepo;
import com.mahakal.error404.Services.OtpServices;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServices {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    OtpRepo otpRepo;

    @Autowired
    OtpServices otpServices;


    // Method to send OTP email
    public boolean EmailSend(String to, String otps) {
        try {
            Otp otp = new Otp();
            otp.setOtp(otps);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            String url = "https://i0.wp.com/bestanimations.com/Flags/Asia/india/indian-flag-waving-gif-animation-7.gif?resize=650,400";
            helper.setTo(to);
            helper.setSubject("🔑 Your One-Time Password (OTP) Code By Code X");
            helper.setText(
                    "<!DOCTYPE html>" +
                            "<html lang='en'>" +
                            "<head>" +
                            "    <style>" +
                            "        .email-container {" +
                            "            font-family: Arial, sans-serif;" +
                            "            color: #333;" +
                            "            padding: 20px;" +
                            "            background-color: #f9f9f9;" +
                            "        }" +
                            "        .otp-box {" +
                            "            background-color: #f1f1f1;" +
                            "            border: 2px dashed #4caf50;" +
                            "            color: #4caf50;" +
                            "            font-size: 18px;" +
                            "            font-weight: bold;" +
                            "            text-align: center;" +
                            "            padding: 10px;" +
                            "            margin: 20px 0;" +
                            "            border-radius: 8px;" +
                            "            cursor: pointer;" +
                            "        }" +
                            "        .otp-box:hover {" +
                            "            background-color: #e8f5e9;" +
                            "        }" +
                            "    </style>" +
                            "</head>" +
                            "<body>" +
                            "    <div class='email-container'>" +
                            "        <div class='image-section'>" +
                            "            <img src='"+url+"' alt='Your Logo'>" +
                            "        </div>" +
                            "        <p>Dear User,</p>" +
                            "        <p>Thank you for using our service. Your One-Time Password (OTP) is:</p>" +
                            "        <div class='otp-box' onclick=\"copyToClipboard('" + otps + "')\">🔒 " + otps + "</div>" +
                            "        <p>Please enter this code within the next few minutes to complete your verification.</p>" +
                            "        <p>If you didn’t request this OTP, please ignore this email.</p>" +
                            "        <p>Best regards,</p>" +
                            "        <p>Your Service Team</p>" +
                            "    </div>" +
                            "</body>" +
                            "</html>",
                    true

            );


            javaMailSender.send(mimeMessage);
            otpServices.saveOtp(otp);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
