"use client";
import React from "react";
import Image from "next/image";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { User } from "lucide-react"

interface CustomProp {
  fieldType: FormFieldType;
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProp }) => {
  const { fieldType, iconSrc, iconAlt, placeholder, disabled, showTimeSelect, renderSkeleton } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center gap-2 py-1 px-2 bg-white/10 rounded-full text-gray-200 border-none outline-none focus:border-none focus:ring-0">
          <FormControl>
            <Input {...field} placeholder={placeholder} className="w-full border-none ring-0 bg-transparent focus:ring-0 placeholder:text-gray-200 outline-none focus:outline-none focus:border-none" />
          </FormControl>
        </div>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-2">
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
            <label htmlFor={props.name} className="text-gray-700">{props.label}</label>
          </div>
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <input type="number" className=" bg-white/10 w-full border-none ring-0 px-5 py-2 rounded-full focus:ring-0 placeholder:text-gray-200 outline-none focus:outline-none focus:border-none placeholder:text-sm" placeholder="Enter your phone number" />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100 p-2">
          <Image src='/assets/icons/calendar.svg' width={24} height={24} alt="calendar" />
          <FormControl>
            <DatePicker
              className="w-full bg-transparent focus:ring-0"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={showTimeSelect}
              dateFormat={props.dateFormat}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-300 bg-white shadow-lg">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea {...field} placeholder={placeholder} className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2 focus:ring-0" disabled={props.disabled} />
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProp) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel className="font-medium">{label}</FormLabel>}
          <RenderField field={field} props={props} />
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;



