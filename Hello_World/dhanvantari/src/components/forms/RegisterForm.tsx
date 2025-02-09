"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl
} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import React from "react";
import { PatientFormValidation } from "@/app/lib/validation";
import { PatientFormDefaultValues } from "@/constants";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup } from "../ui/radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "@radix-ui/react-label";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { IdentificationTypes } from "@/constants";
import FileUploader from "../FileUploader";
import { registerPatient } from "@/app/lib/actions/patient.actions";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData;

    if (values.identificationDocument && values.identificationDocument.length > 0) {
      formData = new FormData();
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
        InsurancePolicyNumber: values.InsurancePolicyNumber,  // Ensure correct casing
      }
      //@ts-ignore
      const patient = await registerPatient(patientData);
      if (patient) {
        console.log("Patient created successfully:", patient);
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (err) {
      console.log("Error during form submission:", err);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 ">
        <section className=" space-y-4">
          <h1>Welcome👋</h1>
          <p className="text-dark-700">Let Us Know more about yourself</p>
        </section>

        <section className=" space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-3xl">Personal Information</h2>
          </div>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
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
                  {GenderOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="Bhubaneswar,Odisha,754021"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="EmergencyContactName"
            placeholder="Guardian's name"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="EmergencyContactNumber"
            placeholder="+91 9348646900"
          />
        </div>

        <section className=" space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-3xl">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="PrimaryPhysician"
          placeholder="Select a Doctor"
        >
          {Doctors.map((option) => (
            <SelectItem
              key={option.name}
              value={option.name}
            >
              <div className="flex cursor-pointer ">
                <Image
                  src={option.image}
                  width={24}
                  height={24}
                  alt={option.name}
                  className="mr-2 rounded-full border-dark-500"
                />
                <p>{option.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="InsuranceProvider"
            placeholder="Life Insurance Policy (LIC)"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="InsurancePolicyNumber"  // Changed casing to match DB
            label="InsurancePolicyNumber"
            placeholder="ABC0123456789"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies"
            placeholder="Mushrooms , lemon , dust etc"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"  // Changed from currentMedications
            label="CurrentMedications"
            placeholder="Paracetamol 500mg etc"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="FamilyMedicalHistory"
            placeholder="Mother had a brain cancer and father had diabetis"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="PastMedicalHistory"
            placeholder="Appended hernia"
          />
        </div>

        <section className=" space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-3xl">Identification And Verification</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identificationtype"
          placeholder="Select a Identification Type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="IdentificationNumber"
          placeholder="ABC0123456789"
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned copy of Identification Document"
          placeholder="Select Gender"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className=" space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-3xl">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to treatment"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclouser of information"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />

        <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;