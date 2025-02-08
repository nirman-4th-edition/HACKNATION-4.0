import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile?: File;
}

const FileUpload = ({ onFileSelect, selectedFile }: FileUploadProps) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        id="solution"
        accept=".js,.py,.cpp,.java"
        className="hidden"
        onChange={onFileSelect}
      />
      <label
        htmlFor="solution"
        className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
      >
        <Upload className="w-5 h-5 mr-2" />
        {selectedFile ? 'Change File' : 'Upload Solution'}
      </label>
      {selectedFile && (
        <p className="text-sm text-gray-600">
          Selected file: {selectedFile.name}
        </p>
      )}
    </div>
  );
};

export default FileUpload;