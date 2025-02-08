import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useState } from "react";

const buyerFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    address: z.string().min(5, "Address must be at least 5 characters"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    profilePicture: z.instanceof(File, { message: "Profile picture is required" }).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const BuyerSignup = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const form = useForm<z.infer<typeof buyerFormSchema>>({
    resolver: zodResolver(buyerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof buyerFormSchema>) => {
    console.log("Form Submitted:", values);
    toast({
      title: "Account created successfully",
      description: "Welcome to our marketplace!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg md:p-8 transition duration-300 hover:shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-700">Create Buyer Account</h2>
          <p className="mt-2 text-gray-600">Join our marketplace and shop directly from farmers.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Soumya " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="soumya@sundar.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="9347447227" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div>
              <label className="font-medium text-gray-700">Profile Picture</label>
              <input type="file" onChange={(e) => setProfilePicture(e.target.files?.[0] || null)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>

            <Link to="/home">
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2 rounded-lg">
              Create Account
            </Button>
             </Link>

            
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/blogin" className="font-medium text-green-700 hover:text-green-600">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default BuyerSignup;
