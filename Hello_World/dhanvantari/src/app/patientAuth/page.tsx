"use client"

import React from 'react'
import Image from 'next/image'
import { ArrowLeft, Bell, Heart, Thermometer, Activity, FileText, Clipboard } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card'
export default function PatientDashboard() {
  return (
    <div className="p-6">
      <header className="mb-8 flex items-center justify-between">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Button>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-07%20202751-qyUvMO53BghzMM91eC1xjHj1ctxEKO.png"
                alt="Doctor profile"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-medium">Dr. Alex Hess</span>
          </div>
        </div>
      </header>

      <h1 className="mb-6 text-2xl font-bold">Current Appointment</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-07%20202751-qyUvMO53BghzMM91eC1xjHj1ctxEKO.png"
                  alt="Patient profile"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mb-1 text-xl font-semibold">Roger Curtis</h2>
              <p className="mb-4 text-muted-foreground">Age: 36</p>
              <Button className="bg-emerald-500 hover:bg-emerald-600">Update</Button>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 font-semibold">Information:</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Gender:</dt>
                  <dd>Male</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Blood Type:</dt>
                  <dd>O+ (Positive)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Allergies:</dt>
                  <dd>Milk, Penicilin</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Diseases:</dt>
                  <dd>Diabetes, Blood Disorders</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Height:</dt>
                  <dd>178m</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Weight:</dt>
                  <dd>65 kg</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Patient ID:</dt>
                  <dd>208898786</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Last Visit:</dt>
                  <dd>25th October 2019</dd>
                </div>
              </dl>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <div className="mb-2 rounded-full bg-red-100 p-3">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <p className="text-muted-foreground">Heart Rate</p>
                <p className="text-2xl font-bold">
                  80<span className="text-sm font-normal text-muted-foreground">bpm</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <div className="mb-2 rounded-full bg-orange-100 p-3">
                  <Thermometer className="h-6 w-6 text-orange-500" />
                </div>
                <p className="text-muted-foreground">Body Temperature</p>
                <p className="text-2xl font-bold">
                  36.5<span className="text-sm font-normal text-muted-foreground">°C</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <div className="mb-2 rounded-full bg-blue-100 p-3">
                  <Activity className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-muted-foreground">Glucose</p>
                <p className="text-2xl font-bold">
                  100<span className="text-sm font-normal text-muted-foreground">mg/dl</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Test Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Creatine Kinase T</h4>
                    <p className="text-sm text-muted-foreground">12th February 2020</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-red-100 p-3">
                    <FileText className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Eye Fluorescein Test</h4>
                    <p className="text-sm text-muted-foreground">12th February 2020</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Prescriptions</CardTitle>
              <Button variant="ghost" className="text-emerald-500 hover:text-emerald-600">
                + Add a prescription
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-amber-100 p-3">
                    <Clipboard className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Heart Diseases</h4>
                    <p className="text-sm text-muted-foreground">25th October 2019</p>
                  </div>
                </div>
                <Badge variant="secondary">3 months</Badge>
              </div>

              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-purple-100 p-3">
                    <Clipboard className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Skin Care</h4>
                    <p className="text-sm text-muted-foreground">8th August 2019</p>
                  </div>
                </div>
                <Badge variant="secondary">2 months</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
