import type { Team, MCQ, DebuggingProblem, FinalProblem } from './types';

export const mockLeaderboard: Team[] = [
  { id: '1', rank: 1, name: 'The Bug Slayers', college: 'Tech University', score: 250, timeTaken: '00:45:12' },
  { id: '2', rank: 2, name: 'Code Wizards', college: 'State College of Engineering', score: 240, timeTaken: '00:50:34' },
  { id: '3', rank: 3, name: 'Syntax Savages', college: 'Institute of Technology', score: 225, timeTaken: '00:55:01' },
  { id: '4', rank: 4, name: 'Runtime Terrors', college: 'Metropolitan University', score: 210, timeTaken: '01:02:19' },
  { id: '5', rank: 5, name: 'The Null Pointers', college: 'City Tech', score: 200, timeTaken: '01:05:55' },
  { id: '6', rank: 6, name: 'Kernel Krew', college: 'Engineering Institute', score: 195, timeTaken: '01:10:00' },
  { id: '7', rank: 7, name: 'Data Drivers', college: 'Science & Tech College', score: 180, timeTaken: '01:12:43' },
];

export const mockMcqSetA: MCQ[] = [
  {
    id: 'mcq-a-1',
    question: 'What is the time complexity of a binary search algorithm?',
    options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-2',
    question: 'In Python, which keyword is used to define a function?',
    options: ['function', 'def', 'fun', 'define'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-3',
    question: 'What does "null" represent in Java?',
    options: ['A value of zero', 'An empty string', 'A reference to no object', 'An uninitialized variable'],
    correctAnswerIndex: 2,
  },
];

export const mockDebuggingProblem: DebuggingProblem = {
  id: 'dbg-1',
  title: 'Find the Bug: Array Sum',
  language: 'python',
  description: 'The following Python function is supposed to calculate the sum of all elements in a list. However, it\'s returning an incorrect result. Find and fix the bug.',
  buggyCode: `def calculate_sum(numbers):
  sum = 0
  for i in range(len(numbers)):
    sum = numbers[i]
  return sum

# Example usage:
# print(calculate_sum([1, 2, 3, 4, 5]))
# Expected output: 15
# Actual output: 5`
};

export const mockFinalProblem: FinalProblem = {
    id: 'fin-1',
    title: 'Final Challenge: Palindrome Checker',
    problemStatement: `A palindrome is a word, phrase, number, or other sequence of characters that reads the same backward as forward.

**Task:**
You are given a buggy function that is intended to check if a given string is a palindrome. Your task is to fix the function so that it correctly identifies palindromes.

**Requirements:**
- The function should return \`True\` if the string is a palindrome and \`False\` otherwise.
- The comparison should be case-insensitive.
- Spaces should be ignored.
- An empty string should be considered a palindrome.

**Example Input/Output:**
- Input: "A man a plan a canal Panama" -> Output: \`True\`
- Input: "hello" -> Output: \`False\`
- Input: "racecar" -> Output: \`True\`
`,
    buggyCode: `def is_palindrome(s):
    s = s.lower().replace(' ', '')
    reversed_s = s.reverse()
    return s == reversed_s`
};
