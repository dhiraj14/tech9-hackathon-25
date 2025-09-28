export interface Resume {
  id: number;
  title: string;
  filename: string;
  created_at: string;
  file_url: string;
  chunks_count: number;
}

export interface ResumeMatch {
  resume_id: number;
  title: string;
  filename: string;
  user_name: string;
  user_email: string;
  relevance_score: number;
  file_url: string;
  matching_chunks: MatchingChunk[];
}

export interface MatchingChunk {
  content: string;
  similarity_score: number;
}

export interface JobMatchResponse {
  job_description: string;
  total_matches: number;
  matches: ResumeMatch[];
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface UploadResumeRequest {
  title: string;
  file: File;
}

export interface UploadResumeResponse {
  message: string;
  resume: Resume;
}
