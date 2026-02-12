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

export const currentTeam: Team =  { id: '1', rank: 1, name: 'The Bug Slayers', college: 'Tech University', score: 250, timeTaken: '00:45:12' };

export const mockMcqSetA: MCQ[] = [
  {
    id: 'mcq-a-1',
    question: 'A program stores student marks in an array marks[100]. The program directly prints marks[45]. What is the time complexity of accessing this element?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-a-2',
    question: 'A printer prints documents in the order they arrive. Which data structure best models this behavior?',
    options: ['Stack', 'Queue', 'Heap', 'Tree'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-3',
    question: 'While evaluating expressions like (A+B)*C, which data structure is mainly used?',
    options: ['Queue', 'Stack', 'Linked List', 'Graph'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-4',
    question: 'In a binary tree, the topmost node from which all nodes originate is called:',
    options: ['Leaf', 'Parent', 'Root', 'Edge'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-a-5',
    question: 'Unlike arrays, linked lists store elements:',
    options: ['Contiguously', 'Randomly without order', 'Using pointers to next node', 'Inside stacks'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-a-6',
    question: 'A programmer wants to apply binary search to an array. Which condition must be satisfied?',
    options: ['Array must be reversed', 'Array must be sorted', 'Array must contain duplicates', 'Array must be dynamic'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-7',
    question: 'Stack overflow occurs when:',
    options: ['Stack becomes empty', 'Stack becomes full and push is attempted', 'Stack size decreases', 'Stack contains one element'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-8',
    question: 'Breadth-First Search traversal uses which data structure internally?',
    options: ['Stack', 'Queue', 'Heap', 'Array only'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-9',
    question: 'Hash tables are primarily used to:',
    options: ['Traverse graphs', 'Perform fast searching', 'Sort elements', 'Store images'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-10',
    question: 'Insertion at the beginning of a linked list generally takes:',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 0,
  },
  {
    id: 'mcq-a-11',
    question: 'In a complete binary tree, nodes are filled:',
    options: ['Randomly', 'Left to right level-wise', 'Right to left', 'Only at last level'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-12',
    question: 'Which structure uses n × n matrix storage?',
    options: ['Adjacency list', 'Adjacency matrix', 'Heap', 'Stack'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-13',
    question: 'Binary heaps are commonly used to implement:',
    options: ['Stack', 'Priority Queue', 'Linked List', 'Graph traversal'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-14',
    question: 'Depth First Search primarily uses:',
    options: ['Queue', 'Stack', 'Heap', 'Matrix'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-15',
    question: 'Worst case search complexity in BST occurs when the tree becomes:',
    options: ['Balanced', 'Complete', 'Skewed', 'Heap shaped'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-a-16',
    question: 'Consider the following pseudocode: \npush(10) \npush(20) \npush(30) \npop() \npush(40) \npop() \npush(50) \ntop() \nWhat will top() return?',
    options: ['10', '20', '40', '50'],
    correctAnswerIndex: 3,
  },
  {
    id: 'mcq-a-17',
    question: 'function f(n): \n   if n <= 1: return 1 \n   return f(n-1) + f(n-2) \n\nprint(f(4)) Output?',
    options: ['3', '5', '8', '13'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-a-18',
    question: 'count = 0 \nfor i = 1 to n: \n   for j = 1 to i*i: \n      count = count + 1 \nTime complexity?',
    options: ['O(n²)', 'O(n³)', 'O(n log n)', 'O(n⁴)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-19',
    question: 'enqueue(5) \nenqueue(10) \nenqueue(15) \ndequeue() \nenqueue(20) \ndequeue() \nfront() \nOutput?',
    options: ['5', '10', '15', '20'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-20',
    question: 'A binary tree has 127 nodes and is perfectly full. Height of the tree (root at level 1)?',
    options: ['6', '7', '8', '127'],
    correctAnswerIndex: 2,
  },
];


export const mockMcqSetB: MCQ[] = [
  {
    id: 'mcq-b-1',
    question: 'What is the time complexity for accessing an element in an array by its index?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-b-2',
    question: 'Which data structure follows the Last-In, First-Out (LIFO) principle?',
    options: ['Queue', 'Stack', 'Tree', 'Heap'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-3',
    question: 'The operation to remove an element from a queue is called:',
    options: ['Pop', 'Delete', 'Dequeue', 'Remove'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-b-4',
    question: 'What is the maximum number of children a node can have in a binary tree?',
    options: ['1', '2', '3', 'n'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-5',
    question: 'What is the worst-case time complexity for a linear search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-b-6',
    question: 'What is a mandatory prerequisite for performing a binary search on an array?',
    options: ['The array must be sorted', 'The array must be random', 'The data must be a graph', 'The data must be in a heap'],
    correctAnswerIndex: 0,
  },
  {
    id: 'mcq-b-7',
    question: 'Depth-First Search (DFS) internally uses which data structure to keep track of vertices?',
    options: ['Queue', 'Stack', 'Array', 'Heap'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-8',
    question: 'For a graph with n vertices, what is the size of its adjacency matrix?',
    options: ['n', 'n²', 'n log n', '2n'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-9',
    question: 'A heap data structure is primarily used to implement which of the following?',
    options: ['Sorting', 'Priority queue', 'Searching', 'Traversal'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-10',
    question: 'What is the time complexity of inserting an element at the beginning of a singly linked list?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 0,
  },
  {
    id: 'mcq-b-11',
    question: 'Function recursion relies on which data structure to store state for each function call?',
    options: ['Heap', 'Stack', 'Queue', 'Array'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-12',
    question: 'The worst-case search time in a Binary Search Tree (BST) occurs when the tree becomes:',
    options: ['Perfectly balanced', 'A complete tree', 'Skewed (like a linked list)', 'A heap'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-b-13',
    question: 'Breadth-First Search (BFS) traversal uses which data structure internally?',
    options: ['Stack', 'Queue', 'Heap', 'Matrix'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-14',
    question: 'In a complete binary tree, all levels are completely filled except possibly the last level, which is filled from:',
    options: ['Randomly', 'Left to right', 'Right to left', 'Bottom first'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-15',
    question: 'What is the best-case time complexity for searching in a hash table?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-b-16',
    question: 'Given the stack operations: \npush(10), push(20), push(30), pop(), push(40), top(). What is the result of top()?',
    options: ['10', '20', '30', '40'],
    correctAnswerIndex: 3,
  },
  {
    id: 'mcq-b-17',
    question: 'Given the queue operations: \nenqueue(1), enqueue(2), enqueue(3), dequeue(), enqueue(4), front(). What does front() return?',
    options: ['1', '2', '3', '4'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-18',
    question: 'What is the time complexity of the following loops? \nfor i=1 to n: \n  for j=1 to i: \n    for k=1 to n: \n      print()',
    options: ['O(n²)', 'O(n³)', 'O(n² log n)', 'O(n log n)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-19',
    question: 'What is the output of f(3) for the recursive function? \nfunction f(n): \n  if n==0: return 1 \n  return 2*f(n-1)',
    options: ['6', '8', '4', '12'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-20',
    question: 'A perfect binary tree has 255 nodes. What is its height (assuming the root is at level 1)?',
    options: ['7', '8', '9', '255'],
    correctAnswerIndex: 1,
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
