"use client"
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Calendar, Clock, MapPin, User } from 'lucide-react';
import { log } from 'console';

function page() {
  return (
    <AuroraBackground>
       <div className='h-full w-full flex items-center justify-center'>
            <BookingCard />
      </div>
    </AuroraBackground>
  )
}

export default page

const BookingCard = () => {

    console.log(localStorage.getItem("boo"));
    
    const [consultation,setConsultation] = useState<any>(null)
   useEffect(()=>{
    try {
        setConsultation(JSON.parse(localStorage.getItem("boo")??"{}"))
    } catch (error) {
        console.log(error);
        
    }
   },[])

    if(!consultation){
        return <div>No data found</div>
    }
    

    const bookAppointmet = ()=>{
        fetch('http://localhost:3001/appointment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.userId,
                doctorId: consultation.doctors.id,
                problemSummary: JSON.stringify(consultation)
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-900">Medical Consultation</CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {consultation.data.patientData.severity.toUpperCase()}
              </Badge>
            </div>
            <CardDescription className="text-gray-500">
              {consultation.data.department} Department
            </CardDescription>
          </CardHeader>
  
          <CardContent className="space-y-6">
            {/* Doctor Info */}
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{consultation.doctors.name}</h3>
                <p className="text-sm text-gray-500">{consultation.doctors.specialization}</p>
              </div>
            </div>
  
            {/* Symptoms & Recommendations */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
                <p className="text-gray-600">{consultation.data.patientData.symptoms}</p>
              </div>
  
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Recommended Treatment</h4>
                </div>
                <p className="text-gray-600 text-sm">{consultation.data.patientData.recommendation.otcMedicine}</p>
              </div>
            </div>
  
            {/* Warning */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-800">
                {consultation.data.patientData.recommendation.warning}
              </p>
            </div>
          </CardContent>
  
          <CardFooter className="bg-gray-50 p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
            </div>
            <Button onClick={bookAppointmet} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Book Appointment
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
