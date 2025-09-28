import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import Header from '../components/Header';
import ResumeUpload from '../components/ResumeUpload';
import JobMatcher from '../components/JobMatcher';
import ResumeList from '../components/ResumeList';
import ResumeModal from '../components/ResumeModal';
import { resumeAPI } from '../services/api';
import { downloadFile } from '../utils/helpers';
import config from '../config';
import type { Resume, ResumeMatch, JobMatchResponse } from '../types';

const Dashboard: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [matchResults, setMatchResults] = useState<ResumeMatch[] | undefined>();
  const [selectedResume, setSelectedResume] = useState<ResumeMatch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      setLoading(true);
      const response = await resumeAPI.getAllResumes();
      setResumes(response.resumes);
    } catch (error) {
      console.error('Failed to load resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (newResume: Resume) => {
    setResumes(prev => [newResume, ...prev]);
    setActiveTab('browse');
  };

  const handleMatchResults = (results: JobMatchResponse) => {
    setMatchResults(results.matches);
    setActiveTab('browse');
  };

  const handleViewResume = (resume: ResumeMatch) => {
    setSelectedResume(resume);
    setIsModalOpen(true);
  };

  const handleDownloadResume = async (resume: Resume | ResumeMatch) => {
    try {
      const blob = await resumeAPI.downloadResume(resume.file_url);
      downloadFile(blob, resume.filename);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const clearMatchResults = () => {
    setMatchResults(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-700/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-4">
              {config.APP_NAME} Dashboard
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Upload resumes, find perfect matches with AI, and manage your talent pipeline efficiently.
            </p>
            <div className="flex justify-center mt-8 space-x-12">
              <div className="text-center animate-float hover-lift glass-effect p-4 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 text-shadow">🤖 AI-Powered</div>
                <div className="text-sm text-gray-600 font-medium">Intelligent Matching</div>
              </div>
              <div className="text-center animate-float hover-lift glass-effect p-4 rounded-xl" style={{animationDelay: '0.5s'}}>
                <div className="text-3xl font-bold text-purple-600 text-shadow">📊 Smart</div>
                <div className="text-sm text-gray-600 font-medium">Deep Analytics</div>
              </div>
              <div className="text-center animate-float hover-lift glass-effect p-4 rounded-xl" style={{animationDelay: '1s'}}>
                <div className="text-3xl font-bold text-indigo-600 text-shadow">⚡ Fast</div>
                <div className="text-sm text-gray-600 font-medium">Instant Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-2 border border-white/20">
            <TabsTrigger 
              value="upload" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold py-3 transition-all duration-300 hover:scale-105"
            >
              📄 Upload Resume
            </TabsTrigger>
            <TabsTrigger 
              value="match" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold py-3 transition-all duration-300 hover:scale-105"
            >
              🔍 Find Matches
            </TabsTrigger>
            <TabsTrigger 
              value="browse" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold py-3 transition-all duration-300 hover:scale-105"
            >
              👥 Browse Resumes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <ResumeUpload onUploadSuccess={handleUploadSuccess} />
          </TabsContent>

          <TabsContent value="match" className="space-y-6">
            <JobMatcher onMatchResults={handleMatchResults} />
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            {matchResults && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    {(() => {
                      const goodMatches = matchResults.filter(m => m.relevance_score < 0);
                      const totalResults = matchResults.length;
                      return (
                        <>
                          <h3 className="font-bold text-blue-900 text-lg">
                            🎯 Showing {goodMatches.length} quality matches from {totalResults} total results
                          </h3>
                          <p className="text-blue-700 text-sm mt-1">
                            Only showing matches with good relevance scores (negative values indicate better matches)
                          </p>
                          {goodMatches.length < totalResults && (
                            <p className="text-blue-600 text-xs mt-1">
                              {totalResults - goodMatches.length} poor matches hidden (positive scores indicate weak relevance)
                            </p>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <button
                    onClick={clearMatchResults}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                  >
                    Clear Results
                  </button>
                </div>
              </div>
            )}
            
            <ResumeList
              resumes={resumes}
              matchResults={matchResults}
              onViewResume={handleViewResume}
              onDownloadResume={handleDownloadResume}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </main>

      <ResumeModal
        resume={selectedResume}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
