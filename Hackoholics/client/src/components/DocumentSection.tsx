import React from 'react';
import { Document,DocumentSectionProps }  from "../types/index"


export const DocumentSection: React.FC<DocumentSectionProps> = ({ title, documents, showUpload }) => {
  return (
    <div className={`p-8 rounded-3xl ${showUpload ? 'bg-gray-200' : 'bg-[#E5F9FF]'}`}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.name} className="flex items-center justify-between bg-white rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00B6F0] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-medium">{doc.name}</span>
            </div>
            <button className="text-[#00B6F0] hover:text-[#008bc0]">
              {doc.editable ? 'Edit' : 'View'}
            </button>
          </div>
        ))}
      </div>
      {showUpload && (
        <button className="w-full mt-6 py-3 bg-[#00B6F0] text-white rounded-lg hover:bg-[#008bc0] transition-colors">
          Upload new document
        </button>
      )}
    </div>
  );
};
