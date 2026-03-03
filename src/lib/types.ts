export type Team = {
  id: string;
  rank: number;
  name: string;
  college: string;
  score: number; // Total score
  timeTaken: string; // Aggregate or tie-breaker time (last submission timestamp)
  members?: string[];
  round1Score?: number;
  round1Time?: string;
  round2Score?: number;
  round2Time?: string;
  round3Score?: number;
  round3Time?: string;
};

export type MCQ = {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
};

export type DebuggingProblem = {
  id:string;
  title: string;
  language: 'java' | 'python';
  buggyCode: string;
  description: string;
  solutionCode: string;
  buggyOutput?: string;
};

export type FinalProblem = {
  id: string;
  title: string;
  problemStatement: string;
  buggyCode: string;
  solutionCode: string;
  buggyOutput?: string;
};
