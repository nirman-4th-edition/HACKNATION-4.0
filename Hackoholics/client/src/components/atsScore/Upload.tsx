import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, fileInputRef }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFileName(uploadedFile.name);
      onFileUpload(uploadedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFileName(droppedFile.name);
      onFileUpload(droppedFile);
    }
  };

  return (
    <div
      className="mt-4 sm:mt-8 flex justify-center px-4 sm:px-0"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="w-full max-w-xl">
        <label
          htmlFor="file-upload"
          className="relative block p-6 sm:p-12 border-4 border-blue-200 border-dashed rounded-xl cursor-pointer hover:border-blue-300 focus:outline-none transition-colors duration-200 bg-white shadow-sm"
        >
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx"
          />
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-blue-400" />
            <div className="mt-4 sm:mt-6">
              <span className="text-base sm:text-lg font-medium text-blue-600">
                Upload a file
              </span>
              <span className="text-base sm:text-lg text-gray-500">
                {' '}
                or drag and drop
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Supported formats: PDF, DOC, or DOCX (max 10MB)
            </p>
            {fileName && (
              <p className="mt-2 text-xs sm:text-sm text-gray-500">
                Uploaded file: {fileName}
              </p>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};