package com.example.nirmandemo.services;

import com.example.nirmandemo.FirebaseService;
import com.example.nirmandemo.entities.AllData;
import com.example.nirmandemo.entities.AllDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AdminServices {

    FirebaseService firebaseService;

    @Autowired
    AdminServices(FirebaseService firebaseService){
        this.firebaseService = firebaseService;
    }

    public AllData getForAdminPanel(){
        return firebaseService.getData();
    }

    public Integer getForBand(){
        AllData dat = firebaseService.getData();
        return dat.getLedStatus();
    }


}
