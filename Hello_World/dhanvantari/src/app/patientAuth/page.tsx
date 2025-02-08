// page.tsx
import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";

export default function Home() {
  return (
    // <AuroraBackground>
      <div className="flex h-screen overflow-hidden bg-gradient-to-tr from-gray-900 via-green-900 to-emerald-900 text-white ">
        <section className="flex-1 overflow-auto px-4 py-5 md:px-8 lg:px-12 relative">
          <div className="max-w-lg mx-auto">

            <PatientForm />

            <div className="mt-10 flex justify-between items-center text-sm text-gray-600">
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
      </div>
    // </AuroraBackground>
  );
}