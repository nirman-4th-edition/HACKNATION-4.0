"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl
} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import React from "react";
import SubmitButton from "../SubmitButton";
import { UserFormValidation as formSchema } from "@/app/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/lib/action/patient.action";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  PHONE_INPUT = 'phoneInput',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dob: new Date(),
      gender: "male",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Validation passed, now redirect
      // router.push(`/patients/register`);
      // User creation logic is commented for now
      const { name, email, phone, dob, gender } = values;
      const userData = { name, email, phone, dob, gender };
      const user = await createUser(userData);
      if (user) {
        console.log("User created successfully:", user);
        localStorage.setItem("user", JSON.stringify(user));
        router.push(`/patientAuth/${user.$id}/chatBox`);
      }
    } catch (err) {
      console.log("Error during form submission:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const GenderOptions = ["male", "female", "other"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 h-max ">
        <section className="mb-4 mt-4 space-y-4 text-center">
          <h1 className=" font-medium text-3xl">Hey there !!</h1>
          <p className=" text-lg">Schedule your first appointment</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Subhankar Patra"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="patrasubhankar@.com"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="+91 9938989405"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="birthDate"
          label="Date Of Birth"
          placeholder="+91 9938989405"
        />
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          label="Gender"
          placeholder="Select Gender"
          renderSkeleton={(field) => (
            <FormControl>
              <RadioGroup
                className="flex h-11 gap-6 xl:justify-between"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {GenderOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;





