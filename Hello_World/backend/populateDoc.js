import axios from 'axios';
import { Doctor } from './Models/Models.js';

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";


const data = [
    {
      "name": "Dr. Aakash Verma",
      "department": "General Medicine",
      "specialization": "General Physician",
      "searchQuery": "general physician opd doctor"
    },
    {
      "name": "Dr. Priya Sharma",
      "department": "Pediatrics",
      "specialization": "Child Specialist",
      "searchQuery": "pediatrician child specialist opd"
    },
    {
      "name": "Dr. Rohan Mehta",
      "department": "Cardiology",
      "specialization": "Cardiologist",
      "searchQuery": "heart specialist cardiology opd"
    },
    {
      "name": "Dr. Sunita Kapoor",
      "department": "Orthopedics",
      "specialization": "Orthopedic Surgeon",
      "searchQuery": "bone doctor orthopedic opd"
    },
    {
      "name": "Dr. Amit Joshi",
      "department": "Neurology",
      "specialization": "Neurologist",
      "searchQuery": "brain specialist neurologist opd"
    },
    {
      "name": "Dr. Kavita Rao",
      "department": "Gynecology",
      "specialization": "Obstetrician & Gynecologist",
      "searchQuery": "women health gynecology opd"
    },
    {
      "name": "Dr. Vikram Singh",
      "department": "Dermatology",
      "specialization": "Skin Specialist",
      "searchQuery": "skin doctor dermatologist opd"
    },
    {
      "name": "Dr. Neha Bansal",
      "department": "ENT",
      "specialization": "Ear, Nose & Throat Specialist",
      "searchQuery": "ent doctor ear nose throat opd"
    },
    {
      "name": "Dr. Rajesh Khanna",
      "department": "Ophthalmology",
      "specialization": "Eye Specialist",
      "searchQuery": "eye doctor ophthalmologist opd"
    },
    {
      "name": "Dr. Sameer Malhotra",
      "department": "Psychiatry",
      "specialization": "Psychiatrist",
      "searchQuery": "mental health psychiatrist opd"
    },
    {
      "name": "Dr. Pooja Sethi",
      "department": "Endocrinology",
      "specialization": "Diabetes & Hormone Specialist",
      "searchQuery": "diabetes thyroid endocrinologist opd"
    },
    {
      "name": "Dr. Arvind Tiwari",
      "department": "Urology",
      "specialization": "Urologist",
      "searchQuery": "kidney bladder urology opd"
    },
    {
      "name": "Dr. Sneha Kapoor",
      "department": "Gastroenterology",
      "specialization": "Gastroenterologist",
      "searchQuery": "stomach digestive gastroenterology opd"
    },
    {
      "name": "Dr. Mohit Pandey",
      "department": "Pulmonology",
      "specialization": "Lung Specialist",
      "searchQuery": "lung doctor pulmonology opd"
    },
    {
      "name": "Dr. Anjali Nair",
      "department": "Nephrology",
      "specialization": "Kidney Specialist",
      "searchQuery": "kidney nephrology opd"
    },
    {
      "name": "Dr. Rakesh Menon",
      "department": "Oncology",
      "specialization": "Cancer Specialist",
      "searchQuery": "cancer oncologist opd"
    },
    {
      "name": "Dr. Divya Arora",
      "department": "Anesthesiology",
      "specialization": "Anesthetist",
      "searchQuery": "pain management anesthesiology"
    },
    {
      "name": "Dr. Harish Gupta",
      "department": "Radiology",
      "specialization": "Radiologist",
      "searchQuery": "x-ray mri radiology"
    },
    {
      "name": "Dr. Manisha Sharma",
      "department": "Pathology",
      "specialization": "Pathologist",
      "searchQuery": "blood test pathology"
    },
    {
      "name": "Dr. Kunal Deshmukh",
      "department": "Emergency Medicine",
      "specialization": "Emergency Physician",
      "searchQuery": "emergency doctor trauma care"
    },
    {
      "name": "Dr. Sakshi Anand",
      "department": "Hematology",
      "specialization": "Blood Disorder Specialist",
      "searchQuery": "blood specialist hematologist"
    },
    {
      "name": "Dr. Vijay Rathi",
      "department": "Plastic Surgery",
      "specialization": "Cosmetic & Reconstructive Surgeon",
      "searchQuery": "plastic surgery cosmetic reconstructive"
    },
    {
      "name": "Dr. Reema Yadav",
      "department": "Rheumatology",
      "specialization": "Arthritis & Autoimmune Disease Specialist",
      "searchQuery": "arthritis rheumatology opd"
    },
    {
      "name": "Dr. Amit Goyal",
      "department": "Geriatrics",
      "specialization": "Elderly Care Specialist",
      "searchQuery": "elderly health geriatric opd"
    },
    {
      "name": "Dr. Tanvi Mehta",
      "department": "Sports Medicine",
      "specialization": "Sports Injury Specialist",
      "searchQuery": "sports injury physiotherapy opd"
    },
    {
      "name": "Dr. Rohan Bhatt",
      "department": "Pain Management",
      "specialization": "Pain Specialist",
      "searchQuery": "chronic pain pain management opd"
    },
    {
      "name": "Dr. Snehal Patel",
      "department": "Allergy & Immunology",
      "specialization": "Allergy Specialist",
      "searchQuery": "allergy immunology opd"
    },
    {
      "name": "Dr. Jitendra Kumar",
      "department": "Occupational Medicine",
      "specialization": "Workplace Health Specialist",
      "searchQuery": "occupational health workplace doctor"
    },
    {
      "name": "Dr. Pritam Bansal",
      "department": "Forensic Medicine",
      "specialization": "Forensic Pathologist",
      "searchQuery": "forensic medicine autopsy specialist"
    },
    {
      "name": "Dr. Smita Chauhan",
      "department": "Sexual Health",
      "specialization": "Sexologist",
      "searchQuery": "sexual health sexologist opd"
    },
    {
      "name": "Dr. Nikhil Kapoor",
      "department": "Palliative Care",
      "specialization": "End-of-Life Care Specialist",
      "searchQuery": "palliative care pain management"
    },
    {
      "name": "Dr. Anupama Sethi",
      "department": "Rehabilitation Medicine",
      "specialization": "Rehabilitation Specialist",
      "searchQuery": "physical therapy rehabilitation opd"
    },
    {
      "name": "Dr. Yashwant Tiwari",
      "department": "Infectious Diseases",
      "specialization": "Infectious Disease Specialist",
      "searchQuery": "infection control infectious diseases opd"
    }
  ]
  
  
async function addDoctor(doctor) {
    try {
        const response = await axios.post('http://localhost:3001/doctor/add', doctor, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(`Added: ${doctor.name}`);
    } catch (error) {
        console.error(`Error adding ${doctor.name}:`, error);
    }
}

async function populateDoctors() {
    for (const doctor of data) {
        await addDoctor(doctor);
    }
}
populateDoctors()


async function searchDoctors(departments, specializations) {
    try {
        console.log("Searching for doctors...");
        
      const doctors = await Doctor.find({
        $or: [
          { department: { $in: departments } },
          { specialization: { $in: specializations } }
        ]
      });
  
      console.log("Doctors found:", doctors);
      
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }
  }

//   searchDoctors(["Pediatrics"], ["General Physician", "Child Specialist"])