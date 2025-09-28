import React from 'react';
import { FileText, Eye, Download, Calendar, Users } from 'lucide-react';
import { formatDate, formatScore, getScoreColor } from '../utils/helpers';
import type { Resume, ResumeMatch } from '../types';

type DisplayItem = ResumeMatch | (Resume & {
  resume_id: number;
  user_name: string;
  user_email: string;
  relevance_score: number;
  matching_chunks: never[];
});

interface ResumeListProps {
  resumes: Resume[];
  matchResults?: ResumeMatch[];
  onViewResume: (resume: ResumeMatch) => void;
  onDownloadResume: (resume: Resume | ResumeMatch) => void;
  loading?: boolean;
}

const ResumeList: React.FC<ResumeListProps> = ({
  resumes,
  matchResults,
  onViewResume,
  onDownloadResume,
  loading = false
}) => {
  // Filter match results to only show good matches (negative scores)
  const filteredMatchResults = matchResults?.filter(result => result.relevance_score < 0);
  
  const displayItems: DisplayItem[] = filteredMatchResults || resumes.map(resume => ({
    ...resume,
    resume_id: resume.id,
    user_name: 'Development User',
    user_email: 'dev@example.com',
    relevance_score: 0,
    matching_chunks: []
  }));

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-gray-600">Loading resumes...</span>
        </div>
      </div>
    );
  }

  if (displayItems.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="text-center py-8">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-6 animate-float" />
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {matchResults ? '🔍 No Quality Matches Found' : '📄 No Resumes Yet'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            {matchResults 
              ? 'No resumes with good relevance scores were found. Try adjusting your job description to be more specific, or upload more diverse resumes to expand your talent pool.'
              : 'Upload your first resume to get started with AI-powered talent matching.'
            }
          </p>
          {matchResults && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              💡 <strong>Tip:</strong> Only matches with negative scores (indicating good relevance) are shown. Positive scores indicate poor matches and are filtered out.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/30 rounded-2xl shadow-xl border border-white/20 backdrop-blur-sm">
      <div className="p-8 border-b border-gradient-to-r from-indigo-200/50 to-blue-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <Users className="w-8 h-8 text-indigo-500 mr-3 drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                {matchResults ? `🎯 Match Results (${displayItems.length})` : `📋 All Resumes (${displayItems.length})`}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {matchResults ? 'AI-powered talent matching results' : 'Your talent database'}
              </p>
            </div>
          </div>
          {matchResults && (
            <div className="flex items-center bg-indigo-100 px-4 py-2 rounded-full">
              <div className="text-sm text-indigo-700 font-medium">
                📊 Sorted by relevance score
              </div>
            </div>
          )}
        </div>
        
        {!matchResults && resumes.some(r => r.chunks_count === 0) && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-xl shadow-sm">
            <div className="flex items-start">
              <div className="text-yellow-500 text-lg mr-3">⚠️</div>
              <div>
                <p className="text-sm text-yellow-800 font-medium">Processing in Progress</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Some resumes are still being processed for AI search. They will appear in search results once processing is complete.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="divide-y divide-indigo-100/50">
        {displayItems.map((item) => (
          <div key={item.resume_id} className="group p-6 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-blue-50/50 transition-all duration-300 hover:shadow-md rounded-lg mx-2 mb-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-3">
                  <div className="relative">
                    <FileText className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 truncate group-hover:text-indigo-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  {matchResults && (
                    <div className={`ml-3 px-4 py-2 rounded-full text-sm font-bold ${getScoreColor(item.relevance_score)} bg-gradient-to-r from-white to-gray-50 shadow-md border-2 ${item.relevance_score > -0.3 ? 'border-green-300' : item.relevance_score > -0.6 ? 'border-yellow-300' : 'border-red-300'} group-hover:scale-105 transition-all duration-300`}>
                      🎯 {formatScore(item.relevance_score)} match
                    </div>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{'created_at' in item ? formatDate(item.created_at) : 'N/A'}</span>
                  <span className="mx-2">•</span>
                  <span>{item.filename}</span>
                  {'chunks_count' in item && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{item.chunks_count} chunks</span>
                      {item.chunks_count === 0 && (
                        <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Processing for search...
                        </span>
                      )}
                    </>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">{item.user_name}</span>
                  <span className="mx-2">•</span>
                  <span>{item.user_email}</span>
                </div>
                
                {matchResults && 'matching_chunks' in item && item.matching_chunks.length > 0 && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-400 shadow-sm">
                    <div className="flex items-start">
                      <div className="text-blue-500 text-sm mr-2 mt-0.5">🔍</div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium mb-1">Key Match Found:</p>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {item.matching_chunks[0].content.substring(0, 150)}...
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3 ml-4">
                {matchResults && (
                  <button
                    onClick={() => onViewResume(item as ResumeMatch)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    👁️ View
                  </button>
                )}
                <button
                  onClick={() => onDownloadResume(item)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform border border-gray-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  📥 Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeList;
