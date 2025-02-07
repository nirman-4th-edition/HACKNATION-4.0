package com.example.nirmandemo.services;

import com.example.nirmandemo.FirebaseService;
import com.example.nirmandemo.entities.AllData;
import com.example.nirmandemo.entities.AllDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServices {

    FirebaseService firebaseService;

    @Autowired
    AdminServices(FirebaseService firebaseService){
        this.firebaseService = firebaseService;
    }

    public AllDataDTO getForAdminPanel(){
        AllData dat = firebaseService.getData();
        AllDataDTO datdto = new AllDataDTO(dat.getSos(), dat.getEnvTemp(), dat.getHumidity());
        System.out.println("Data recovered: " + datdto);
        return datdto;
    }

    public Integer getForBand(){
        AllData dat = firebaseService.getData();
        return dat.getLedStatus();
    }


}
