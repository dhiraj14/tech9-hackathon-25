import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { resumeAPI } from '../services/api';
import config from '../config';
import type { UploadResumeResponse } from '../types';

interface ResumeUploadProps {
  onUploadSuccess: (resume: UploadResumeResponse['resume']) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file size
      if (selectedFile.size > config.MAX_FILE_SIZE) {
        setError(`File size must be less than ${(config.MAX_FILE_SIZE / 1024 / 1024).toFixed(1)}MB`);
        return;
      }
      
      // Check file type
      const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
      if (!config.ALLOWED_FILE_TYPES.includes(fileExtension)) {
        setError(`File type not supported. Allowed types: ${config.ALLOWED_FILE_TYPES.join(', ')}`);
        return;
      }
      
      setError(null);
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, '')); // Remove file extension
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    setError(null);

    try {
      const response = await resumeAPI.uploadResume({ title, file });
      onUploadSuccess(response.resume);
      
      // Reset form
      setTitle('');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload resume. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 rounded-2xl shadow-xl p-8 border border-white/20 backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <div className="relative">
          <Upload className="w-8 h-8 text-green-500 mr-3 drop-shadow-lg" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Upload Resume
          </h2>
          <p className="text-gray-600 text-sm mt-1">Add new talent to your database</p>
        </div>
      </div>
      
      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-2">
            📝 Resume Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="✨ Enter a descriptive title (e.g., Senior Full-Stack Developer)"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md"
            required
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-semibold text-gray-800 mb-2">
            📄 Resume File
          </label>
          <div className="mt-1">
            <input
              ref={fileInputRef}
              type="file"
              id="file"
              onChange={handleFileSelect}
              accept={config.ALLOWED_FILE_TYPES.join(',')}
              className="sr-only"
              required={!file}
            />
            
            {!file ? (
              <label
                htmlFor="file"
                className="group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-green-300 rounded-2xl cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="relative">
                    <Upload className="w-12 h-12 mb-4 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
                  </div>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">TXT, PDF, DOC, or DOCX (MAX. 10MB)</p>
                </div>
              </label>
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-300 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!file || !title || uploading}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors duration-200"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Resume
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;
