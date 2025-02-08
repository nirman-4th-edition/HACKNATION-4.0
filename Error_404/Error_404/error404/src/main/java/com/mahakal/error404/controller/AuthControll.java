package com.mahakal.error404.controller;

import com.mahakal.error404.Jwt.JwtUtil;
import com.mahakal.error404.Model.Medicine;
import com.mahakal.error404.Model.Otp;
import com.mahakal.error404.Model.Register;
import com.mahakal.error404.Model.User;
import com.mahakal.error404.Services.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class AuthControll {

    @Autowired
    SingupLogin singupLogin;
    @Autowired
    OtpUtil otpUtil;

    @Autowired
    OtpServices otpServices;

    @Autowired
    UserServices userServices;

    @Autowired
    EmailServices emailServices;
    @Autowired
    JwtUtil jwtUtil;



    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestParam String name,
                                         @RequestParam String email, @RequestParam String password,
                                         @RequestParam String validOtp) {
        boolean userExists = singupLogin.exist(email);
        if (userExists) {
            return ResponseEntity.ok("Email already taken");
        }


        if (validOtp.isEmpty() || validOtp.isBlank()) {

            String generatedOtp = otpUtil.generateOtp();

            Otp otp = new Otp();
            otp.setOtp(String.valueOf(generatedOtp));
            otp.setEmail(email);
            otp.setCreatedAt(LocalDateTime.now());

            boolean isEmailSent = emailServices.EmailSend(email, String.valueOf(generatedOtp));
            if (!isEmailSent) {
                return ResponseEntity.status(500).body("Failed to send OTP. Please try again.");
            }

            otpServices.saveOtp(otp);
            return ResponseEntity.ok("OTP sent successfully. Please validate it.");
        }

        Otp storedOtp = otpServices.getOtp(email);
        if (storedOtp != null && storedOtp.getOtp().equals(validOtp)) {
            LocalDateTime createdAt = storedOtp.getCreatedAt();
            if (createdAt != null && Duration.between(createdAt, LocalDateTime.now()).compareTo(Duration.ofMinutes(1)) <= 0) {
                Register register = new Register();
                register.setEmail(email);
                register.setName(name);
                register.setPassword(password);
                register.setImageUrl("https://api.dicebear.com/9.x/initials/svg?seed=" + name);

                try {
                    singupLogin.register(register);
                    return ResponseEntity.ok("User registered successfully");
                } catch (Exception e) {
                    return ResponseEntity.status(500).body("Failed to save user data");
                }
            } else {
                otpServices.deleteOtp(email);
                return ResponseEntity.ok("OTP has expired. Please request a new one.");
            }
        }

        return ResponseEntity.ok("Invalid OTP. Please try again.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password)
    {

        if(singupLogin.exist(email))
        {
            Optional<Register> login = singupLogin.login(email);
            Register getvalue = login.get();
            if(getvalue.getEmail().equals(email) && getvalue.getPassword().equals(password))
            {

                String token = jwtUtil.createToken(getvalue.getName());
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.SET_COOKIE, String.format(
                        "CodeXShubhojit=%s; HttpOnly; Secure; Path=/; Max-Age=%d",
                        token, 3600*24
                ));


                return ResponseEntity.ok().body("Login successfully " + token );
            }
            else {
                return ResponseEntity.ok().body("Wrong password");
            }
        }
        else {
            return ResponseEntity.badRequest().body("User Not exist");
        }
    }



    @PostMapping("/info")
    public ResponseEntity<String> dashBoard(@RequestParam String token, @RequestBody User user) {
        if (token == null || !jwtUtil.validToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token. Login again.");
        }

        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }

        Optional<Register> login = singupLogin.login(user.getEmail());

        if (login.isEmpty()) {
            return ResponseEntity.badRequest().body("User does not exist");
        }

        Register getvalue = login.get();
        user.setUserName(getvalue.getName());
        user.setEmail(getvalue.getEmail());

        user.setRegister(getvalue);

        if (user.getMedicines() != null && !user.getMedicines().isEmpty()) {
            for (Medicine medicine : user.getMedicines()) {
                medicine.setUser(user);
                medicineService.saveMedicine(medicine);
            }
        }

        userServices.saveData(user);
        return ResponseEntity.ok("User data & medicines saved successfully!");
    }

    @Autowired
    private MedicineService medicineService;

    @GetMapping("/times")
    public ResponseEntity<List<Medicine>> getMedicineTimes(@RequestParam String email) {
        List<Medicine> medicineTimes = medicineService.getMedicineTimesByEmail(email);

        if (medicineTimes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(medicineTimes);
    }

    @GetMapping("/load")
    public Optional<Register> getImage(@RequestParam String email) {
        Optional<Register> user = singupLogin.login(email);
        return user;
    }


}
