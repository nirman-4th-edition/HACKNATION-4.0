package com.example.nirmandemo;

import com.example.nirmandemo.entities.AllData;
import com.google.firebase.FirebaseApp;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class FirebaseService {

    public static AllData allData = AllData
            .builder()
            .heartRate(null)
            .spo2(null)
            .bodyTemp(null)
            .sos(null)
            .envTemp(null)
            .humidity(null)
//            .aqi(null)
            .build();

    private final DatabaseReference databaseReference;

    public AllData getData(){
        return allData;
    }

    @Autowired
    public FirebaseService(FirebaseApp firebaseApp) {
        FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance(firebaseApp);
        this.databaseReference = firebaseDatabase.getReference();
    }

    @PostConstruct
    public void initRealTimeUpdates() {
        getRealTimeUpdates();
    }

    private void updateAllData(DataSnapshot dataSnapshot) {

        switch (dataSnapshot.getKey()) {
            case "BandData"-> {
                for (DataSnapshot child : dataSnapshot.getChildren()) {
                    switch (child.getKey()) {
                        case "heartRate"->{
                            allData.setHeartRate(child.getValue(Double.class));
                        }

                        case "spo2"->{
                            allData.setSpo2(child.getValue(Double.class));
                        }

                        case "temperature"->{
                            allData.setBodyTemp(child.getValue(Double.class));
                        }
                    }
                }
            }

            case "sos"->{
                allData.setSos(dataSnapshot.getValue(Boolean.class));
            }
            case "ledStatus"->{
                allData.setLedStatus(dataSnapshot.getValue(Integer.class));
            }

            case "FactorySensor"-> {
                for (DataSnapshot child : dataSnapshot.getChildren()) {
                    switch (child.getKey()) {
                        case "Humidity"->{
                            allData.setHumidity(child.getValue(Double.class));
                        }
                        case "Temperature"->{
                            allData.setEnvTemp(child.getValue(Double.class));
                        }
                    }
                }
            }
            default->{
                System.out.println("Unknown key: " + dataSnapshot.getKey());
            }
        }

        System.out.println("Updated AllData Object: " + allData.toString());
    }

    public void getRealTimeUpdates() {
        databaseReference.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String previousChildName) {
                updateAllData(dataSnapshot);
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String previousChildName) {
                updateAllData(dataSnapshot);
            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {
                System.out.println("Data Deleted: " + dataSnapshot.getValue());
            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String previousChildName) {
                System.out.println("Data Moved: " + dataSnapshot.getValue());
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                System.err.println("Database Error: " + databaseError.getMessage());
            }
        });
    }
}
