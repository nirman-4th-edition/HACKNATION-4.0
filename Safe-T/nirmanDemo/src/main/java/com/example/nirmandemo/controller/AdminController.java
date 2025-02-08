package com.example.nirmandemo.controller;


import com.example.nirmandemo.entities.AllData;
import com.example.nirmandemo.entities.AllDataDTO;
import com.example.nirmandemo.services.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    AdminServices adminServices;

    @Autowired
    AdminController(AdminServices adminServices){
        this.adminServices = adminServices;
    }

    @GetMapping("/get-details")
    public ResponseEntity<AllData> sendAdminData(){
        AllData forAdminPanel = adminServices.getForAdminPanel();
        return new ResponseEntity<>(forAdminPanel, HttpStatus.OK);
    }
}
