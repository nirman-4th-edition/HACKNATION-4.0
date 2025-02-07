package com.example.nirmandemo.controller;


import com.example.nirmandemo.entities.AllDataDTO;
import com.example.nirmandemo.services.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    AdminServices adminServices;

    @Autowired
    AdminController(AdminServices adminServices){
        this.adminServices = adminServices;
    }

    @GetMapping("/get-details")
    public ResponseEntity<AllDataDTO> sendAdminData(){
        AllDataDTO forAdminPanel = adminServices.getForAdminPanel();

        System.out.println("Data in controller: " + forAdminPanel.toString());
        return new ResponseEntity<>(forAdminPanel, HttpStatus.OK);
    }
}
