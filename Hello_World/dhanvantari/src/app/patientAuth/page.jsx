// page.tsx
import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <section className="flex-1 overflow-auto px-4 py-8 md:px-8 lg:px-12">
        <div className="max-w-lg mx-auto">
          <Image
            className="h-12 w-auto mb-16"
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            priority
          />
          
          <PatientForm />

          <div className="mt-16 flex justify-between items-center text-sm text-gray-600">
            <p>© 2025 Aayush Bharat. All rights reserved</p>
            <Link 
              href="/?admin=true"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </section>

      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="/assets/images/onboarding-img.png"
          fill
          objectFit="cover"
          alt="Onboarding"
          className="rounded-l-3xl"
          priority
        />
      </div>
    </div>
  );
}