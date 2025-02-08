import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import React, { useRef } from "react";

const farmerFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    farmName: z.string().min(3, "Farm Name must be at least 3 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/\d{10}/, "Phone number must be 10 digits"),
    farmSize: z.string().min(3, "Please select a farm size"),
    crops: z.string().min(3, "Enter at least one crop type"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const FarmerSignup = () => {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      farmerFormSchema.parse(data);
      console.log("Form Submitted Successfully", data);
    } catch (error) {
      console.error("Validation Errors", error.errors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg md:p-8 transition duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-center text-green-700">
          Create Farmer Account
        </h2>
        <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input type="text" name="name" placeholder="Full Name" required />
          <Input type="text" name="farmName" placeholder="Farm Name" required />
          <Input type="text" name="address" placeholder="Address" required />
          <Input type="email" name="email" placeholder="Email" required />
          <Input type="text" name="phone" placeholder="Phone" required />
          <select name="farmSize" required>
            <option value="">Select Farm Size</option>
            <option value="Small">Small (1-5 acres)</option>
            <option value="Medium">Medium (5-20 acres)</option>
            <option value="Large">Large (20+ acres)</option>
          </select>
          <Input type="text" name="crops" placeholder="Type of Crops" required />
          <Input type="file" name="profilePicture" />
          <Input type="password" name="password" placeholder="Password" required />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          />
           <Link to="/dashboard">
           <Button type="submit" className="w-full bg-green-700 text-white">
            Create Account
          </Button>
            </Link>
          
        </form>
        <div className="text-center mt-4">
          <Link to="/slogin" className="text-green-700 hover:underline">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FarmerSignup;
