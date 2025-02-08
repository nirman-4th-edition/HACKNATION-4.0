"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const therapists = [
  {
    name: "Dr. Emily Johnson",
    specialty: "Cognitive Behavioral Therapy",
    phone: "123-456-7890",
    email: "emily.johnson@example.com",
  },
  {
    name: "Dr. Mark Stevens",
    specialty: "Family and Relationship Counseling",
    phone: "234-567-8901",
    email: "mark.stevens@example.com",
  },
  {
    name: "Dr. Sarah Lee",
    specialty: "Anxiety and Depression Specialist",
    phone: "345-678-9012",
    email: "sarah.lee@example.com",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Trauma and PTSD Treatment",
    phone: "456-789-0123",
    email: "michael.chen@example.com",
  },
  {
    name: "Dr. Olivia Martinez",
    specialty: "Mindfulness-Based Therapy",
    phone: "567-890-1234",
    email: "olivia.martinez@example.com",
  },
]

const hospitals = [
  {
    name: "Serenity General Hospital",
    address: "123 Main St, Cityville",
    phone: "456-789-0123",
    emergencyNumber: "911",
  },
  {
    name: "Tranquil Mind Medical Center",
    address: "456 Oak Ave, Townsburg",
    phone: "567-890-1234",
    emergencyNumber: "911",
  },
  {
    name: "Healing Hearts Hospital",
    address: "789 Pine Rd, Villageton",
    phone: "678-901-2345",
    emergencyNumber: "911",
  },
  { name: "Mindful Care Clinic", address: "101 Elm St, Hamletville", phone: "789-012-3456", emergencyNumber: "911" },
  {
    name: "Wellness Recovery Center",
    address: "202 Maple Dr, Boroughton",
    phone: "890-123-4567",
    emergencyNumber: "911",
  },
]

export default function MedicalAssistancePage() {
  const [activeTab, setActiveTab] = useState("therapists")

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Medical Assistance</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="therapists">Recommended Therapists</TabsTrigger>
                <TabsTrigger value="hospitals">Nearby Hospitals</TabsTrigger>
              </TabsList>
              <TabsContent value="therapists">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Therapists</CardTitle>
                    <CardDescription>Contact information for professional therapists in your area.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {therapists.map((therapist, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold">{therapist.name}</h3>
                          <p className="text-sm text-gray-600">{therapist.specialty}</p>
                          <p className="text-sm">Phone: {therapist.phone}</p>
                          <p className="text-sm">Email: {therapist.email}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="hospitals">
                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Hospitals</CardTitle>
                    <CardDescription>Information about hospitals and emergency care in your vicinity.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {hospitals.map((hospital, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold">{hospital.name}</h3>
                          <p className="text-sm">{hospital.address}</p>
                          <p className="text-sm">Phone: {hospital.phone}</p>
                          <p className="text-sm font-semibold text-red-600">Emergency: {hospital.emergencyNumber}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

