"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Bell, ChevronRight, Pause, X, Heart, Thermometer, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { motion, useAnimation } from 'framer-motion';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  image: string;
  heartRate: number;
  temperature: number;
  glucose: number;
}

export default function DoctorDashboard() {
  const initialPatients: Patient[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 28,
      gender: 'Female',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      heartRate: 80,
      temperature: 36.5,
      glucose: 100,
    },
    {
      id: 2,
      name: 'Michael Brown',
      age: 45,
      gender: 'Male',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      heartRate: 75,
      temperature: 37.0,
      glucose: 95,
    },
    {
      id: 3,
      name: 'Emily Davis',
      age: 34,
      gender: 'Female',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      heartRate: 85,
      temperature: 36.8,
      glucose: 110,
    },
    {
      id: 4,
      name: 'John Wilson',
      age: 50,
      gender: 'Male',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      heartRate: 90,
      temperature: 37.2,
      glucose: 120,
    },
    {
      id: 5,
      name: 'Linda Martinez',
      age: 29,
      gender: 'Female',
      image: 'https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg',
      heartRate: 78,
      temperature: 36.7,
      glucose: 105,
    },
    {
      id: 6,
      name: 'David Anderson',
      age: 40,
      gender: 'Male',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      heartRate: 82,
      temperature: 36.9,
      glucose: 115,
    },
    {
      id: 7,
      name: 'Sophia Thomas',
      age: 27,
      gender: 'Female',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      heartRate: 88,
      temperature: 37.1,
      glucose: 125,
    },
    {
      id: 8,
      name: 'James Jackson',
      age: 55,
      gender: 'Male',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      heartRate: 77,
      temperature: 36.6,
      glucose: 98,
    },
    {
      id: 9,
      name: 'Olivia White',
      age: 33,
      gender: 'Female',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      heartRate: 83,
      temperature: 37.0,
      glucose: 108,
    },
    {
      id: 10,
      name: 'Daniel Harris',
      age: 38,
      gender: 'Male',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      heartRate: 79,
      temperature: 36.8,
      glucose: 102,
    },
  ];

  const [queue, setQueue] = useState<Patient[]>(initialPatients);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(queue[0]);
  const [isOnBreak, setIsOnBreak] = useState<boolean>(false);
  const controls = useAnimation();
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  // Update currentPatient whenever queue changes
  useEffect(() => {
    setCurrentPatient(queue[0] || null);
  }, [queue]);

  const handleNext = async () => {
    if (queue.length > 1) {
      await controls.start({ x: '-100%', opacity: 0, transition: { duration: 0.3 } });
      setQueue((prevQueue) => prevQueue.slice(1)); // Remove the first patient
      controls.set({ x: '100%', opacity: 0 });
      await controls.start({ x: 0, opacity: 1, transition: { duration: 0.3 } });
    } else {
      alert('No more patients in the queue!');
    }
  };

  const handleBreak = () => {
    setIsOnBreak((prev) => !prev);
    alert(isOnBreak ? 'Break ended. Resuming appointments.' : 'Taking a break. Pausing appointments.');
  };

  const handleEnd = async () => {
    if (queue.length > 0) {
      await controls.start({ x: '100%', opacity: 0, transition: { duration: 0.3 } });
      setQueue((prevQueue) => prevQueue.slice(1)); // Remove the first patient
      controls.set({ x: '-100%', opacity: 0 });
      await controls.start({ x: 0, opacity: 1, transition: { duration: 0.3 } });
    }
  };

  const handleSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    const touch = 'touches' in e ? e.touches[0] : e;
    swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleSwipeMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!swipeStart.current) return;
    const touch = 'touches' in e ? e.touches[0] : e;
    const deltaX = touch.clientX - swipeStart.current.x;
    const deltaY = touch.clientY - swipeStart.current.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      controls.set({ x: deltaX, opacity: 1 - Math.abs(deltaX) / 200 });
    }
  };

  const handleSwipeEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!swipeStart.current) return;
    const touch = 'changedTouches' in e ? e.changedTouches[0] : e;
    const deltaX = touch.clientX - swipeStart.current.x;

    if (Math.abs(deltaX) > 100) {
      if (deltaX > 0) {
        handleEnd(); // Swipe right to end
      } else {
        handleNext(); // Swipe left to next
      }
    } else {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.2 } }); // Reset position
    }
    swipeStart.current = null;
  };

  return (
    <AuroraBackground className="min-h-screen bg-black">
      <div className="container mx-auto p-6 text-white">
        <header className="mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
            <p className="text-muted-foreground">Manage your patient queue and appointments</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-xs">3</span>
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://images.pexels.com/photos/433635/pexels-photo-433635.jpeg"
                  alt="Dr. Alex Hess"
                />
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">Dr. Alex Hess</span>
                <span className="text-sm text-muted-foreground">Cardiologist</span>
              </div>
            </div>
            <Badge variant="secondary" className="ml-2">
              {queue.length} in queue
            </Badge>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Doctor Information Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="https://images.pexels.com/photos/433635/pexels-photo-433635.jpeg"
                    alt="Dr. Alex Hess"
                    className="object-cover"
                  />
                  <AvatarFallback>AH</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>Dr. Alex Hess</CardTitle>
              <CardDescription>Cardiologist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">10 years</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Qualification</span>
                    <span className="font-medium">MD, MBBS</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Speciality</span>
                    <span className="font-medium">Cardiology</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Current Patient Card */}
            <Card>
              <CardHeader>
                <CardTitle>Current Patient</CardTitle>
                <CardDescription>Currently in consultation</CardDescription>
              </CardHeader>
              <CardContent>
                {currentPatient ? (
                  <motion.div
                    initial={{ x: 0, opacity: 1 }}
                    animate={controls}
                    onTouchStart={handleSwipeStart}
                    onTouchMove={handleSwipeMove}
                    onTouchEnd={handleSwipeEnd}
                    onMouseDown={handleSwipeStart}
                    onMouseMove={handleSwipeMove}
                    onMouseUp={handleSwipeEnd}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={currentPatient.image} alt={currentPatient.name} />
                        <AvatarFallback>{currentPatient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{currentPatient.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentPatient.age} years • {currentPatient.gender}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={handleNext}>
                        <ChevronRight className="mr-2 h-4 w-4" />
                        Next
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleBreak}
                        className={isOnBreak ? "text-yellow-500" : ""}
                      >
                        <Pause className="mr-2 h-4 w-4" />
                        {isOnBreak ? 'Resume' : 'Break'}
                      </Button>
                      <Button variant="destructive" onClick={handleEnd}>
                        <X className="mr-2 h-4 w-4" />
                        End
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <p className="text-center text-muted-foreground">No patients in the queue</p>
                )}
              </CardContent>
            </Card>

            {/* Patient Queue */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Patient Queue</CardTitle>
                  <Badge variant="secondary">{queue.length} waiting</Badge>
                </div>
                <CardDescription>Upcoming appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex space-x-4 p-4">
                    {queue.map((patient, index) => (
                      <motion.div
                        key={patient.id}
                        className="flex-shrink-0 w-[250px]"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={patient.image} alt={patient.name} />
                                <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{patient.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {patient.age} years • {patient.gender}
                                </p>
                              </div>
                            </div>
                            <Badge variant="secondary" className="mt-4">
                              {index === 0 ? 'In Progress' : `${index} in queue`}
                            </Badge>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Patient Vitals */}
            {currentPatient && (
              <Card>
                <CardHeader>
                  <CardTitle>Patient Vitals</CardTitle>
                  <CardDescription>Current patient's vital signs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Heart className="h-8 w-8 text-red-500 mb-2" />
                          <p className="text-sm text-muted-foreground">Heart Rate</p>
                          <p className="text-2xl font-bold">
                            {currentPatient.heartRate}
                            <span className="text-sm font-normal text-muted-foreground"> bpm</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Thermometer className="h-8 w-8 text-orange-500 mb-2" />
                          <p className="text-sm text-muted-foreground">Temperature</p>
                          <p className="text-2xl font-bold">
                            {currentPatient.temperature}
                            <span className="text-sm font-normal text-muted-foreground">°C</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Activity className="h-8 w-8 text-blue-500 mb-2" />
                          <p className="text-sm text-muted-foreground">Glucose</p>
                          <p className="text-2xl font-bold">
                            {currentPatient.glucose}
                            <span className="text-sm font-normal text-muted-foreground"> mg/dl</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}