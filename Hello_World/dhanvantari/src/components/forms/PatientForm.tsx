"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form
} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import React from "react";
import SubmitButton from "../SubmitButton";
import { UserFormValidation as formSchema } from "@/app/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/lib/action/patient.action";
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
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Validation passed, now redirect
      // router.push(`/patients/register`);
      // User creation logic is commented for now
      const { name, email, phone } = values;
      const userData = { name, email, phone };
      const user = await createUser(userData);
      if (user) {
        console.log("User created successfully:", user);
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (err) {
      console.log("Error during form submission:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 ">
        <section className="mb-12 space-y-4">
          <h1>Hey there !!👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
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
        
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;





