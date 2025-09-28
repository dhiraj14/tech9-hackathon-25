import React, { useState, useEffect } from 'react';
import { X, Download, FileText, User, Mail, Calendar } from 'lucide-react';
import { resumeAPI } from '../services/api';
import { downloadFile } from '../utils/helpers';
import type { ResumeMatch } from '../types';

interface ResumeModalProps {
  resume: ResumeMatch | null;
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ resume, isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !resume) return null;

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);
    
    try {
      const blob = await resumeAPI.downloadResume(resume.file_url);
      downloadFile(blob, resume.filename);
    } catch (err) {
      setError('Failed to download resume. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{resume.title}</h2>
              <p className="text-sm text-gray-600">{resume.filename}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded-md transition-colors duration-200"
            >
              {downloading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {downloading ? 'Downloading...' : 'Download'}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Resume Info */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <User className="w-4 h-4 text-gray-500 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">{resume.user_name}</div>
                <div className="text-xs text-gray-500">Candidate</div>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">{resume.user_email}</div>
                <div className="text-xs text-gray-500">Email</div>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {(resume.relevance_score * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">Match Score</div>
              </div>
            </div>
          </div>

          {/* Matching Chunks */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Relevant Experience & Skills
            </h3>
            <div className="space-y-4">
              {resume.matching_chunks.map((chunk, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Match #{index + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      Similarity: {(chunk.similarity_score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                    {chunk.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
