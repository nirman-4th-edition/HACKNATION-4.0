import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const profileSchema = z.object({
  farmName: z.string().min(2, "Farm name must be at least 2 characters"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
  profilePicture: z.any().optional(),
});

const ProfileSetup = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      farmName: "",
      location: "",
      phone: "",
      profilePicture: null,
    },
  });

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log(values);
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("profilePicture", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg md:p-8">
        <h2 className="text-2xl font-bold text-center text-green-700">Profile Setup</h2>
        <p className="text-center text-gray-600">Complete your profile to get started</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <FormField
              control={form.control}
              name="farmName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Green Harvest Farm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Profile Picture Upload */}
            <FormItem>
              <FormLabel>Profile Picture (Optional)</FormLabel>
              <FormControl>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </FormControl>
              {preview && (
                <img src={preview} alt="Profile Preview" className="w-20 h-20 mt-2 rounded-full object-cover" />
              )}
            </FormItem>
            <Link to="/dashboard" className="text-green-700 underline">
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2 rounded-lg">
              Complete Profile
            </Button>
            </Link>

            
          </form>
        </Form>

        {submitted && (
          <div className="text-center mt-4">
            <Link to="/dashboard" className="text-green-700 underline">
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;
