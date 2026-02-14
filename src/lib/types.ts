export type Team = {
  id: string;
  rank: number;
  name: string;
  college: string;
  score: number;
  timeTaken: string; // e.g., "01:23:45"
  members?: string[];
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
