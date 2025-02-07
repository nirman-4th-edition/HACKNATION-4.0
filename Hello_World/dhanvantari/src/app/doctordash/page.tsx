"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Bell, ChevronRight, Pause, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DoctorDashboard() {
  // Hardcoded patient data
  const initialPatients = [
    { id: 1, name: 'Sarah Johnson', age: 28, gender: 'Female', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
    { id: 2, name: 'Michael Brown', age: 45, gender: 'Male', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' },
    { id: 3, name: 'Emily Davis', age: 34, gender: 'Female', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
    { id: 4, name: 'John Wilson', age: 50, gender: 'Male', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
    { id: 5, name: 'Linda Martinez', age: 29, gender: 'Female', image: 'https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg' },
    { id: 6, name: 'David Anderson', age: 40, gender: 'Male', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg' },
    { id: 7, name: 'Sophia Thomas', age: 27, gender: 'Female', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg' },
    { id: 8, name: 'James Jackson', age: 55, gender: 'Male', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
    { id: 9, name: 'Olivia White', age: 33, gender: 'Female', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
    { id: 10, name: 'Daniel Harris', age: 38, gender: 'Male', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' },
  ];

  // State for managing the queue
  const [queue, setQueue] = useState(initialPatients);
  const [currentPatient, setCurrentPatient] = useState(queue[0]);
  const [isOnBreak, setIsOnBreak] = useState(false);

  // Function to handle the "Next" button
  const handleNext = () => {
    if (queue.length > 1) {
      setQueue((prevQueue) => prevQueue.slice(1)); // Remove the first patient
      setCurrentPatient(queue[1]); // Set the next patient as current
    } else {
      alert('No more patients in the queue!');
    }
  };

  // Function to handle the "Break" button
  const handleBreak = () => {
    setIsOnBreak((prev) => !prev); // Toggle break state
    alert(isOnBreak ? 'Break ended. Resuming appointments.' : 'Taking a break. Pausing appointments.');
  };

  // Function to handle the "End" button
  const handleEnd = () => {
    if (queue.length > 0) {
      setQueue((prevQueue) => prevQueue.slice(1)); // Remove the first patient
      setCurrentPatient(queue[1] || null); // Set the next patient as current or null if queue is empty
    }
  };

  return (
    <div className="p-6 bg-black text-white">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-green-500 hover:bg-green-500/10">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Image
                src="https://images.pexels.com/photos/433635/pexels-photo-433635.jpeg?cs=srgb&dl=man-person-portrait-433635.jpg&fm=jpg"
                alt="Doctor profile"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-medium">Dr. Alex Hess</span>
          </div>
          {/* Queue Count Badge */}
          <Badge variant="outline" className="text-green-500 border-green-500">
            Patients in Queue: {queue.length}
          </Badge>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Doctor Information Card */}
        <Card className="lg:col-span-1 bg-green-900 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/433635/pexels-photo-433635.jpeg?cs=srgb&dl=man-person-portrait-433635.jpg&fm=jpg"
                  alt="Doctor profile"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mb-1 text-xl font-semibold">Dr. Alex Hess</h2>
              <p className="mb-4 text-muted-foreground">Cardiologist</p>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 font-semibold">Information:</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Experience:</dt>
                  <dd>10 years</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Patients Treated:</dt>
                  <dd>1,200+</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Qualification:</dt>
                  <dd>MD, MBBS</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Contact:</dt>
                  <dd>alex.hess@hospital.com</dd>
                </div>
              </dl>
            </div>
          </CardContent>
        </Card>

        {/* Patient Queue and Management */}
        <div className="lg:col-span-3 space-y-6">
          {/* Current Patient Card */}
          <Card className="bg-green-900 text-white">
            <CardHeader>
              <CardTitle>Current Patient</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              {currentPatient ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={currentPatient.image}
                        alt="Patient profile"
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{currentPatient.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Age: {currentPatient.age} | {currentPatient.gender}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="text-green-500 border-green-500 hover:bg-green-500/10"
                      onClick={handleNext}
                    >
                      <ChevronRight className="h-4 w-4 mr-2" /> Next
                    </Button>
                    <Button
                      variant="outline"
                      className="text-yellow-500 border-yellow-500 hover:bg-yellow-500/10"
                      onClick={handleBreak}
                    >
                      <Pause className="h-4 w-4 mr-2" /> {isOnBreak ? 'Resume' : 'Break'}
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-500 border-red-500 hover:bg-red-500/10"
                      onClick={handleEnd}
                    >
                      <X className="h-4 w-4 mr-2" /> End
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">No patients in the queue.</p>
              )}
            </CardContent>
          </Card>

          {/* Patient Queue */}
          <Card className="bg-green-900 text-white">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Patient Queue</CardTitle>
              {/* Queue Count in the Card Header */}
              <Badge variant="outline" className="text-green-500 border-green-500">
                Patients in Queue: {queue.length}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {queue.map((patient, index) => (
                <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={patient.image}
                        alt="Patient profile"
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{patient.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Age: {patient.age} | {patient.gender}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{index === 0 ? 'In Progress' : 'Waiting'}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}