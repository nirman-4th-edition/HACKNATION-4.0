import React from 'react';
import { FileText, Calendar, Bell as BellIcon } from 'lucide-react';
import type { CaseDetail } from '../types';

interface CaseDetailsProps {
  caseDetails: CaseDetail;
  onUpdateProgress: (progress: string) => void;
  onAddReminder: (reminder: { title: string; date: string }) => void;
}

export function CaseDetails({ caseDetails, onUpdateProgress, onAddReminder }: CaseDetailsProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Case Progress</h2>
        <textarea
          value={caseDetails.progress}
          onChange={(e) => onUpdateProgress(e.target.value)}
          className="w-full p-3 border rounded-lg"
          rows={4}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Notices</h2>
        <div className="space-y-2">
          {caseDetails.notices.map((notice, index) => (
            <div key={index} className="p-3 bg-yellow-50 rounded-lg">
              <p>{notice}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <div className="space-y-2">
          {caseDetails.documents.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-gray-500">Uploaded: {doc.uploadedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Reminders</h2>
          <button
            onClick={() => {
              const title = prompt('Enter reminder title');
              const date = prompt('Enter reminder date (YYYY-MM-DD)');
              if (title && date) onAddReminder({ title, date });
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Reminder
          </button>
        </div>
        <div className="space-y-2">
          {caseDetails.reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <Calendar className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">{reminder.title}</p>
                <p className="text-sm text-gray-500">Due: {reminder.date}</p>
              </div>
              <input
                type="checkbox"
                checked={reminder.isCompleted}
                className="h-5 w-5 text-blue-600 rounded"
                onChange={() => {}}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}