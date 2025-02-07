"use client";

import React from "react";
import Image from "next/image"; // Correct import for the Image component from Next.js
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { set } from "zod";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

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

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomProp;
}) => {
  const { fieldType, iconSrc, iconAlt, placeholder, disabled,showTimeSelect,renderSkeleton } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              width={24}
              height={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
          <Input
            {...field}
            placeholder={placeholder}
            
            className="shad-input border-0"
          />
          </FormControl>
        </div>
      );
    case FormFieldType.CHECKBOX:
     return (<FormControl>
      <div className="flex items-center gap-4">
      <Checkbox
      id={props.name}
      checked={field.value}
      onCheckedChange={field.onChange}
      disabled={disabled}
      />
      <label htmlFor={props.name}
      className="checkbox-label"
      >
       {props.label}
         
      </label>
      
      
      </div>
     </FormControl> 
     )
      case FormFieldType.PHONE_INPUT:
        return (
          <FormControl>
            <PhoneInput
            defaultCountry="IN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
            />
          </FormControl>
        )

        case FormFieldType.DATE_PICKER:
           return (
            <div className="flex rounded-md border border-dark-500">
              <Image
              src='/assets/icons/calendar.svg'
              width={24}
              height={24}
              alt="calender"
              className="ml-2"
              />
              <FormControl>
                <DatePicker
                  className="shad-input border-0"
                  selected={field.value}
                  onChange={(date)=>field.onChange(date)}
                  showTimeSelect={showTimeSelect}
                  dateFormat={props.dateFormat}
                  timeInputLabel="Time:"
                  wrapperClassName="date-picker-wrapper"
                />
              </FormControl>
            </div>
           )

           case FormFieldType.SKELETON:
            return (
              renderSkeleton ? renderSkeleton(field) : null
            )

            case FormFieldType.SELECT:
              return (
                <FormControl>
                  <Select onValueChange={field.onChange}
                  defaultValue={field.value}
                  
                  >
                    <FormControl className='shad-select-trigger'>
                    <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    </FormControl>
                  <SelectContent className="shad-select-content">
                    {props.children}
                  </SelectContent>
                  </Select>
                </FormControl>

              )

              case FormFieldType.TEXTAREA:
                return (
                  <FormControl>
                   <Textarea placeholder={placeholder}
                   {...field}
                   className="shad-textArea"
                   disabled={props.disabled}
                   >

                   </Textarea>
                  </FormControl>
                )
    default:
      break;
  }
};

const CustomFormField = (props: CustomProp) => {
  const { control, fieldType, name, label } = props;

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )}

            <RenderField field={field} props={props} />

            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    </>
  );
};

export default CustomFormField;


