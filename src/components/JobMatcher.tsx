import React, { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import { resumeAPI } from '../services/api';
import config from '../config';
import type { JobMatchResponse } from '../types';

interface JobMatcherProps {
  onMatchResults: (results: JobMatchResponse) => void;
}

const JobMatcher: React.FC<JobMatcherProps> = ({ onMatchResults }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setSearching(true);
    setError(null);

    try {
      if (config.ENABLE_DEBUG_MODE) {
        console.log('🔍 Searching for:', jobDescription);
      }
      const results = await resumeAPI.matchJobDescription(jobDescription);
      if (config.ENABLE_DEBUG_MODE) {
        console.log('✅ Match results:', results);
      }
      onMatchResults(results);
    } catch (err) {
      if (config.ENABLE_DEBUG_MODE) {
        console.error('❌ Match error:', err);
      }
      setError(`Failed to find matches: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setSearching(false);
    }
  };

  const sampleJobs = [
    "Looking for a Ruby on Rails developer with PostgreSQL experience and 5+ years in software development",
    "Need a React developer with TypeScript experience for a modern web application", 
    "Seeking a DevOps engineer with Docker and Kubernetes experience for cloud deployment",
    "Full-stack JavaScript developer needed with Node.js and MongoDB experience"
  ];

  const handleSampleClick = (sample: string) => {
    setJobDescription(sample);
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 rounded-2xl shadow-xl p-8 border border-white/20 backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <div className="relative">
          <Zap className="w-8 h-8 text-yellow-500 mr-3 drop-shadow-lg" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Job Matching
          </h2>
          <p className="text-gray-600 text-sm mt-1">Find the perfect candidates with intelligent matching</p>
        </div>
      </div>
      
      <form onSubmit={handleSearch} className="space-y-6">
        <div>
          <label htmlFor="job-description" className="block text-sm font-semibold text-gray-800 mb-2">
            📝 Job Description
          </label>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="✨ Paste or type the job description here. Be specific about required skills, experience level, and technologies to get the best AI matches..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-md"
            rows={6}
            required
          />
        </div>

        {error && (
          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-xl text-red-700 text-sm shadow-sm">
            <div className="flex items-center">
              <div className="text-red-500 mr-2">❌</div>
              {error}
            </div>
          </div>
        )}

        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl text-blue-800 text-sm shadow-sm">
          <div className="flex items-start">
            <div className="text-blue-500 mr-2 mt-0.5">ℹ️</div>
            <div>
              <strong>Current Status:</strong> Search results may be limited as some uploaded resumes are still being processed for AI matching. 
              Only fully processed resumes will appear in search results.
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!jobDescription.trim() || searching}
          className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
        >
          {searching ? (
            <>
              <div className="relative">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                <div className="absolute inset-0 w-5 h-5 border-2 border-transparent border-t-white rounded-full animate-ping" />
              </div>
              <span className="text-lg">🔍 Finding matches...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-3" />
              <span className="text-lg">🚀 Find Matching Resumes</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          ✨ Try these sample job descriptions:
        </h3>
        <div className="grid gap-3">
          {sampleJobs.map((sample, index) => (
            <button
              key={index}
              onClick={() => handleSampleClick(sample)}
              className="group text-left p-4 text-sm text-gray-700 bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] transform"
            >
              <div className="flex items-start">
                <div className="text-purple-500 mr-3 group-hover:scale-110 transition-transform duration-300">
                  {index === 0 && '💎'} {index === 1 && '⚛️'} {index === 2 && '🐳'} {index === 3 && '🚀'}
                </div>
                <div className="flex-1">
                  {sample}
                  <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to use this sample
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {config.ENABLE_DEBUG_MODE && (
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-xl shadow-sm">
            <div className="flex items-start">
              <div className="text-yellow-500 text-lg mr-3">🔍</div>
              <div>
                <p className="text-sm text-yellow-800 font-medium">Debug Mode Active</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Click on the Docker sample (🐳) above to test matching. Open browser console (F12) to see detailed API logs.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatcher;
