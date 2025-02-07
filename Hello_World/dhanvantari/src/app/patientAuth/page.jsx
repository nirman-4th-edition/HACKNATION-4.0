import Image from "next/image";
import {Button} from '@/components/ui/button'
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";



export default function Home() {
  return (

    <div className="flex h-screen max-h-screen ">
     {/*TODO: OTP Verification | PasskeyModal*/}


      <section className="remove-scrollbar container my-auto ">
        <div className="sub-container max-w-[496px]">
          <Image
            className="mb-12 h-10 w-fit rounded-md"
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
          />
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
          © 2025 Aayush Bharat. All rights reserved
          </p>
          <Link href="/?admin=true">Admin</Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="image"
        className="side-img max-w-[50%] object-cover rounded-lg"
      />
    </div>
  );
}