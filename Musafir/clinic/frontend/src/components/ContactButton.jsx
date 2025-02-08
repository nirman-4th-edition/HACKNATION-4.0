import React from 'react';
import { Phone } from 'lucide-react';

const ContactButton = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:right-8 z-[60]">
      <button className="bg-purple-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
        <Phone className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ContactButton;