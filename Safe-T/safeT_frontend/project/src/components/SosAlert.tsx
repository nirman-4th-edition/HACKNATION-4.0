import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SosAlertProps {
  isActive: boolean;
  message: string;
}

export function SosAlert({ isActive, message }: SosAlertProps) {
  if (!isActive) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg animate-blink flex items-center gap-3">
      <AlertTriangle className="w-6 h-6" />
      <span className="font-semibold">{message}</span>
    </div>
  );
}