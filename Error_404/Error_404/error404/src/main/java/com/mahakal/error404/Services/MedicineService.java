package com.mahakal.error404.Services;

import com.mahakal.error404.Model.Medicine;
import com.mahakal.error404.Repo.MedicineRepo;
import com.mahakal.error404.Repo.MedicineRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    MedicineRepo medicineRepo;


    public List<Medicine> getMedicineTimesByEmail(String email) {
        List<Medicine> medicines = medicineRepo.findByUserEmail(email);

        System.out.println("Number of medicines retrieved: " + medicines.size());

        return medicines;
    }


    public Medicine saveMedicine(Medicine medicine)
    {
        Medicine save = medicineRepository.save(medicine);
        return save;
    }


    private final JavaMailSender mailSender;

    public MedicineService(MedicineRepository medicineRepository, JavaMailSender mailSender) {
        this.medicineRepository = medicineRepository;
        this.mailSender = mailSender;
    }

    public List<Medicine> getMedicinesWithinNextHour() {
        LocalTime now = LocalTime.now();
        LocalTime oneHourLater = now.plusHours(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a");

        return medicineRepository.findAll().stream()
                .filter(medicine -> medicine.getTimes().stream()
                        .map(time -> LocalTime.parse(time, formatter))
                        .anyMatch(time -> time.isAfter(now) && time.isBefore(oneHourLater)))
                .collect(Collectors.toList());
    }

    @Scheduled(fixedRate = 300000)
    public void checkAndSendReminders() {
        List<Medicine> upcomingMedicines = getMedicinesWithinNextHour();
        if (!upcomingMedicines.isEmpty()) {
            upcomingMedicines.forEach(this::sendEmailReminder);
        }
    }

    private void sendEmailReminder(Medicine medicine) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(medicine.getUser().getEmail());
            helper.setSubject("Medicine Reminder: " + medicine.getName());
            helper.setText("Hello " + medicine.getUser().getUserName() + ",\n\n" +
                    "This is a reminder to take your medicine: " + medicine.getName() + " (" + medicine.getDosage() + ") at " + medicine.getTimes() + "\n\n" +
                    "Stay healthy!\nYour Medical Assistant", false);

            mailSender.send(message);
            System.out.println("Email sent to: " + medicine.getUser().getEmail());
        } catch (MessagingException e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }


}
