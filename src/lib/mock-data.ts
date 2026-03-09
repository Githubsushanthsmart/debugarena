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
    question:
      'A program stores student marks in an array marks[100]. The program directly prints marks[45]. What is the time complexity of accessing this element?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-a-2',
    question:
      'A printer prints documents in the order they arrive. Which data structure best models this behavior?',
    options: ['Stack', 'Queue', 'Heap', 'Tree'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-3',
    question:
      'While evaluating expressions like (A+B)*C, which data structure is mainly used?',
    options: ['Queue', 'Stack', 'Linked List', 'Graph'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-4',
    question:
      'In a binary tree, the topmost node from which all nodes originate is called:',
    options: ['Leaf', 'Parent', 'Root', 'Edge'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-a-5',
    question: 'Unlike arrays, linked lists store elements:',
    options: [
      'Contiguously',
      'Randomly without order',
      'Using pointers to next node',
      'Inside stacks',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-a-6',
    question:
      'A programmer wants to apply binary search to an array. Which condition must be satisfied?',
    options: [
      'Array must be reversed',
      'Array must be sorted',
      'Array must contain duplicates',
      'Array must be dynamic',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-7',
    question: 'Stack overflow occurs when:',
    options: [
      'Stack becomes empty',
      'Stack becomes full and push is attempted',
      'Stack size decreases',
      'Stack contains one element',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-8',
    question:
      'Breadth-First Search traversal uses which data structure internally?',
    options: ['Stack', 'Queue', 'Heap', 'Array only'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-9',
    question: 'Hash tables are primarily used to:',
    options: [
      'Traverse graphs',
      'Perform fast searching',
      'Sort elements',
      'Store images',
    ],
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
    options: [
      'Randomly',
      'Left to right level-wise',
      'Right to left',
      'Only at last level',
    ],
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
    question:
      'Worst case search complexity in BST occurs when the tree becomes:',
    options: ['Balanced', 'Complete', 'Skewed', 'Heap shaped'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-a-16',
    question:
      'Consider the following pseudocode: \npush(10) \npush(20) \npush(30) \npop() \npush(40) \npop() \npush(50) \ntop() \nWhat will top() return?',
    options: ['10', '20', '40', '50'],
    correctAnswerIndex: 3,
  },
  {
    id: 'mcq-a-17',
    question:
      'function f(n): \n   if n <= 1: return 1 \n   return f(n-1) + f(n-2) \n\nprint(f(4)) Output?',
    options: ['3', '5', '8', '13'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-a-18',
    question:
      'count = 0 \nfor i = 1 to n: \n   for j = 1 to i*i: \n      count = count + 1 \nTime complexity?',
    options: ['O(n²)', 'O(n³)', 'O(n log n)', 'O(n⁴)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-19',
    question:
      'enqueue(5) \nenqueue(10) \nenqueue(15) \ndequeue() \nenqueue(20) \ndequeue() \nfront() \nOutput?',
    options: ['5', '10', '15', '20'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-a-20',
    question:
      'A binary tree has 127 nodes and is perfectly full. Height of the tree (root at level 1)?',
    options: ['6', '7', '8', '127'],
    correctAnswerIndex: 2,
  },
];

export const mockMcqSetB: MCQ[] = [
  {
    id: 'mcq-b-1',
    question: 'Array index access time complexity?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-b-2',
    question: 'Which structure follows LIFO?',
    options: ['Queue', 'Stack', 'Tree', 'Heap'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-3',
    question: 'Deletion from queue is called:',
    options: ['Pop', 'Delete', 'Dequeue', 'Remove'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-b-4',
    question: 'Maximum children of binary tree node:',
    options: ['1', '2', '3', 'n'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-5',
    question: 'Linear search worst case:',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-b-6',
    question: 'Binary search requires:',
    options: ['Sorted array', 'Random array', 'Graph', 'Heap'],
    correctAnswerIndex: 0,
  },
  {
    id: 'mcq-b-7',
    question: 'DFS internally uses:',
    options: ['Queue', 'Stack', 'Array', 'Heap'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-8',
    question: 'Adjacency matrix size for n vertices:',
    options: ['n', 'n²', 'n log n', '2n'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-9',
    question: 'Heap is mainly used for:',
    options: ['Sorting', 'Priority queue', 'Searching', 'Traversal'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-10',
    question: 'Insertion at beginning of linked list complexity:',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswerIndex: 0,
  },
  {
    id: 'mcq-b-11',
    question: 'Recursion uses:',
    options: ['Heap', 'Stack', 'Queue', 'Array'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-12',
    question: 'Worst case BST search when tree becomes:',
    options: ['Balanced', 'Complete', 'Skewed', 'Heap'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-b-13',
    question: 'BFS traversal uses:',
    options: ['Stack', 'Queue', 'Heap', 'Matrix'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-14',
    question: 'Complete binary tree nodes filled:',
    options: ['Random', 'Left to right', 'Right to left', 'Bottom first'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-15',
    question: 'Hash table best search case:',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    correctAnswerIndex: 2,
  },
  {
    id: 'mcq-b-16',
    question:
      'Stack Trace \npush(10) \npush(20) \npush(30) \npop() \npush(40) \ntop()',
    options: ['10', '20', '30', '40'],
    correctAnswerIndex: 3,
  },
  {
    id: 'mcq-b-17',
    question:
      'Queue Trace \nenqueue(1) \nenqueue(2) \nenqueue(3) \ndequeue() \nenqueue(4) \nfront()',
    options: ['1', '2', '3', '4'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-18',
    question:
      'Loop Complexity \nfor i = 1 to n: \n  for j = 1 to i: \n    for k = 1 to n: \n      print()',
    options: ['O(n²)', 'O(n³)', 'O(n² log n)', 'O(n log n)'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-19',
    question:
      'Recursive Output \nfunction f(n): \n  if n==0: return 1 \n  return 2*f(n-1) \n\nprint(f(3))',
    options: ['6', '8', '4', '12'],
    correctAnswerIndex: 1,
  },
  {
    id: 'mcq-b-20',
    question:
      'A perfect binary tree has 255 nodes. Height (root level = 1)?',
    options: ['7', '8', '9', '255'],
    correctAnswerIndex: 1,
  },
];

export const mockMcqSetC: MCQ[] = [
  { id: 'mcq-c-1', question: 'Which data structure uses FIFO (First In First Out) principle?', options: ['Stack', 'Queue', 'Tree', 'Heap'], correctAnswerIndex: 1 },
  { id: 'mcq-c-2', question: 'Which traversal method visits root → left → right?', options: ['Inorder', 'Preorder', 'Postorder', 'Level order'], correctAnswerIndex: 1 },
  { id: 'mcq-c-3', question: 'In a stack, insertion operation is called:', options: ['Enqueue', 'Push', 'Insert', 'Append'], correctAnswerIndex: 1 },
  { id: 'mcq-c-4', question: 'Which structure represents hierarchical data?', options: ['Array', 'Tree', 'Stack', 'Queue'], correctAnswerIndex: 1 },
  { id: 'mcq-c-5', question: 'Worst case complexity of linear search:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctAnswerIndex: 2 },
  { id: 'mcq-c-6', question: 'Binary search tree property:', options: ['Left child > parent', 'Right child < parent', 'Left child < parent < right child', 'All nodes equal'], correctAnswerIndex: 2 },
  { id: 'mcq-c-7', question: 'Which traversal uses a queue?', options: ['BFS', 'DFS', 'Inorder', 'Postorder'], correctAnswerIndex: 0 },
  { id: 'mcq-c-8', question: 'Stack overflow occurs when:', options: ['Stack empty', 'Stack full', 'Stack half full', 'Stack reversed'], correctAnswerIndex: 1 },
  { id: 'mcq-c-9', question: 'Best case complexity of binary search:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctAnswerIndex: 0 },
  { id: 'mcq-c-10', question: 'Heap is a type of:', options: ['Binary Tree', 'Graph', 'Linked List', 'Array only'], correctAnswerIndex: 0 },
  { id: 'mcq-c-11', question: 'Recursion mainly uses:', options: ['Queue', 'Stack', 'Heap', 'Array'], correctAnswerIndex: 1 },
  { id: 'mcq-c-12', question: 'In adjacency matrix representation of graph with n vertices:', options: ['n', 'n²', 'n log n', '2n'], correctAnswerIndex: 1 },
  { id: 'mcq-c-13', question: 'Insertion at end of linked list takes:', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswerIndex: 1 },
  { id: 'mcq-c-14', question: 'Hash tables mainly help in:', options: ['Searching', 'Sorting', 'Traversal', 'Deleting'], correctAnswerIndex: 0 },
  { id: 'mcq-c-15', question: 'Worst case search in BST occurs when tree becomes:', options: ['Balanced', 'Complete', 'Skewed', 'Perfect'], correctAnswerIndex: 2 },
  { id: 'mcq-c-16', question: 'push(5)\npush(10)\npush(15)\npop()\npush(20)\ntop()\nOutput?', options: ['5', '10', '15', '20'], correctAnswerIndex: 3 },
  { id: 'mcq-c-17', question: 'enqueue(4)\nenqueue(8)\nenqueue(12)\ndequeue()\nenqueue(16)\nfront()\nOutput?', options: ['4', '8', '12', '16'], correctAnswerIndex: 1 },
  { id: 'mcq-c-18', question: 'for i = 1 to n:\n   for j = 1 to n:\n       print(i,j)\nTime complexity?', options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(n³)'], correctAnswerIndex: 1 },
  { id: 'mcq-c-19', question: 'function f(n):\n    if n==1:\n        return 1\n    return n * f(n-1)\n\nprint(f(4))\nOutput?', options: ['12', '16', '24', '32'], correctAnswerIndex: 2 },
  { id: 'mcq-c-20', question: 'Maximum nodes at level k in a binary tree:', options: ['k', '2^k', 'k²', 'n'], correctAnswerIndex: 1 },
];

export const mockMcqSetD: MCQ[] = [
  { id: 'mcq-d-1', question: 'Which data structure follows LIFO principle?', options: ['Stack', 'Queue', 'Graph', 'Tree'], correctAnswerIndex: 0 },
  { id: 'mcq-d-2', question: 'Which node has no children in a tree?', options: ['Root', 'Parent', 'Leaf', 'Edge'], correctAnswerIndex: 2 },
  { id: 'mcq-d-3', question: 'Queue insertion operation is called:', options: ['Push', 'Enqueue', 'Insert', 'Append'], correctAnswerIndex: 1 },
  { id: 'mcq-d-4', question: 'Binary tree maximum children:', options: ['1', '2', '3', 'n'], correctAnswerIndex: 1 },
  { id: 'mcq-d-5', question: 'Average complexity of binary search:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctAnswerIndex: 1 },
  { id: 'mcq-d-6', question: 'DFS uses:', options: ['Queue', 'Stack', 'Heap', 'Array'], correctAnswerIndex: 1 },
  { id: 'mcq-d-7', question: 'Graph traversal using queue:', options: ['DFS', 'BFS', 'Inorder', 'Postorder'], correctAnswerIndex: 1 },
  { id: 'mcq-d-8', question: 'Height of tree with single node:', options: ['0', '1', '2', 'n'], correctAnswerIndex: 1 },
  { id: 'mcq-d-9', question: 'Priority queue is implemented using:', options: ['Heap', 'Stack', 'Linked list', 'Queue'], correctAnswerIndex: 0 },
  { id: 'mcq-d-10', question: 'Worst case complexity of quicksort:', options: ['O(n log n)', 'O(n²)', 'O(log n)', 'O(n)'], correctAnswerIndex: 1 },
  { id: 'mcq-d-11', question: 'Hash table collision occurs when:', options: ['Two keys map to same index', 'Array full', 'Hash empty', 'Graph full'], correctAnswerIndex: 0 },
  { id: 'mcq-d-12', question: 'Traversal that gives sorted order in BST:', options: ['Preorder', 'Inorder', 'Postorder', 'Level order'], correctAnswerIndex: 1 },
  { id: 'mcq-d-13', question: 'Balanced tree search complexity:', options: ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'], correctAnswerIndex: 0 },
  { id: 'mcq-d-14', question: 'Space complexity of adjacency matrix:', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'], correctAnswerIndex: 1 },
  { id: 'mcq-d-15', question: 'Queue removal operation:', options: ['Pop', 'Dequeue', 'Delete', 'Remove'], correctAnswerIndex: 1 },
  { id: 'mcq-d-16', question: 'push(2)\npush(4)\npush(6)\npop()\npush(8)\npop()\ntop()\nOutput?', options: ['2', '4', '6', '8'], correctAnswerIndex: 1 },
  { id: 'mcq-d-17', question: 'enqueue(7)\nenqueue(14)\nenqueue(21)\ndequeue()\nenqueue(28)\ndequeue()\nfront()\nOutput?', options: ['7', '14', '21', '28'], correctAnswerIndex: 2 },
  { id: 'mcq-d-18', question: 'for i=1 to n:\n   for j=1 to i:\n       for k=1 to i:\n            print()\nTime complexity?', options: ['O(n²)', 'O(n³)', 'O(n log n)', 'O(n⁴)'], correctAnswerIndex: 1 },
  { id: 'mcq-d-19', question: 'function f(n):\n   if n==0:\n       return 0\n   return 1 + f(n-1)\n\nprint(f(5))\nOutput?', options: ['4', '5', '6', '10'], correctAnswerIndex: 1 },
  { id: 'mcq-d-20', question: 'A perfect binary tree with 63 nodes has height:', options: ['5', '6', '7', '8'], correctAnswerIndex: 1 },
];

export const mockDebuggingProblems: DebuggingProblem[] = [
  // Python Problems
  {
    id: 'dbg-py-1',
    title: 'Student Grade Calculator',
    language: 'python',
    description: 'Fix the scope and return issue in the average calculation.',
    buggyCode: `class GradeCalculator:
    def __init__(self):
        self.grades = []
    
    def add_grade(self, grade):
        self.grades.append(grade)
    
    def average(self):
        total = sum(self.grades)
        count = len(self.grades)
        avg = total / count
        print(avg)
        avg = 85.0  # Shadowing
        return avg

calc = GradeCalculator()
calc.add_grade(90)
calc.add_grade(80)
print(calc.average())`,
    solutionCode: `class GradeCalculator:
    def __init__(self):
        self.grades = []
    
    def add_grade(self, grade):
        self.grades.append(grade)
    
    def average(self):
        total = sum(self.grades)
        count = len(self.grades)
        avg = total / count
        return avg

calc = GradeCalculator()
calc.add_grade(90)
calc.add_grade(80)
print(calc.average())`,
    buggyOutput: '85.0\n85.0'
  },
  {
    id: 'dbg-py-2',
    title: 'File Reader with Processing',
    language: 'python',
    description: 'Update the code to use embedded data instead of opening a missing file.',
    buggyCode: `def process_scores(filename):
    scores = []
    with open(filename, 'r') as f:
        for line in f:
            score = float(line.strip())
            scores.append(score)
    avg = sum(scores) / len(scores)
    return [s > avg for s in scores]

print(process_scores('nonexistent.txt'))`,
    solutionCode: `def process_scores(filename):
    scores = [85, 92, 78, 95, 88]
    avg = sum(scores) / len(scores)
    return [s > avg for s in scores]

print(process_scores('demo'))
print(f"Average: {sum([85,92,78,95,88])/5:.1f}")`,
    buggyOutput: 'FileNotFoundError: [Errno 2] No such file or directory: \'nonexistent.txt\''
  },
  {
    id: 'dbg-py-3',
    title: 'Data Pipeline Processor',
    language: 'python',
    description: 'Fix the IndexError caused by accessing the next item incorrectly.',
    buggyCode: `def process_pipeline(data_batches):
    results = []
    for batch in data_batches:
        processed = []
        for i, item in enumerate(batch):
            if item > 100:
                processed.append(batch[i+1] * 2)
        results.append(processed)
    return results

batches = [[50, 150, 75], [200, 300]]
print(process_pipeline(batches))`,
    solutionCode: `def process_pipeline(data_batches):
    results = []
    for batch in data_batches:
        processed = []
        for i, item in enumerate(batch):
            if item > 100:
                processed.append(item * 2)
        results.append(processed)
    return results

batches = [[50, 150, 75], [200, 300]]
print(process_pipeline(batches))`,
    buggyOutput: 'IndexError: list index out of range'
  },
  {
    id: 'dbg-py-4',
    title: 'Shopping Cart Total',
    language: 'python',
    description: 'Fix the mutable default argument bug in the cart initialization.',
    buggyCode: `def add_item(cart=[], name="", price=0):
    cart.append({'name': name, 'price': price})
    total = sum(item['price'] for item in cart)
    print(f"Added {name}, Total: \${total:.2f}")
    return cart

cart1 = add_item(None, "Laptop", 999.99)
cart2 = add_item(None, "Mouse", 25.99)`,
    solutionCode: `def add_item(cart=None, name="", price=0):
    if cart is None:
        cart = []
    cart.append({'name': name, 'price': price})
    total = sum(item['price'] for item in cart)
    print(f"Added {name}, Total: \${total:.2f}")
    return cart

cart1 = add_item(None, "Laptop", 999.99)
cart2 = add_item(None, "Mouse", 25.99)`,
    buggyOutput: 'Added Laptop, Total: $999.99\nAdded Mouse, Total: $1025.98'
  },
  {
    id: 'dbg-py-5',
    title: 'File Word Counter',
    language: 'python',
    description: 'Fix the logic to count words instead of characters and handle input correctly.',
    buggyCode: `def count_words(filename):
    word_count = 0
    with open(filename, 'r') as f:
        for line in f:
            word_count += len(line)
    return word_count

print(f"Words in file: {count_words('nonexistent.txt')}")`,
    solutionCode: `def count_words(text):
    word_count = 0
    for line in text.split('\\n'):
        word_count += len(line.split())
    return word_count

sample_text = """Hello world
This is a test
Python debugging practice"""
print(f"Words in file: {count_words(sample_text)}")`,
    buggyOutput: 'FileNotFoundError: [Errno 2] No such file or directory: \'nonexistent.txt\''
  },
  {
    id: 'dbg-py-6',
    title: 'URL Parser',
    language: 'python',
    description: 'Fix the URL splitting logic to handle missing protocols.',
    buggyCode: `def parse_url(url):
    parts = url.split('/')
    protocol = parts[0]
    domain = parts[2]
    path = parts[3]
    return f"{protocol}://{domain}/{path}"

test_url = "example.com/api/users"
print(parse_url(test_url))`,
    solutionCode: `def parse_url(url):
    if url.startswith(('http://', 'https://')):
        protocol, rest = url.split('://', 1)
        domain, path = rest.split('/', 1)
    else:
        protocol = 'http'
        domain, path = url.split('/', 1)
    return f"{protocol}://{domain}/{path}"

test_url = "example.com/api/users"
print(parse_url(test_url))`,
    buggyOutput: 'IndexError: list index out of range'
  },
  {
    id: 'dbg-py-7',
    title: 'Battery Monitor',
    language: 'python',
    description: 'Fix the division by zero and incorrect status logic.',
    buggyCode: `def battery_status(charge_history):
    current = charge_history[-1]
    previous = charge_history[-2]
    rate = (current - previous) / (time.time() - time.time())
    
    if rate < -0.01:
        return "discharging"
    elif rate > 0.01:
        return "charging"
    else:
        return "stable"

history = [85, 82, 80, 78]
print(battery_status(history))`,
    solutionCode: `def battery_status(charge_history):
    if len(charge_history) < 2:
        return "insufficient data"
    
    current = charge_history[-1]
    previous = charge_history[-2]
    rate = (current - previous) / 1.0
    
    if rate < -1:
        return "discharging"
    elif rate > 1:
        return "charging"
    else:
        return "stable"

history = [85, 82, 80, 78]
print(battery_status(history))`,
    buggyOutput: 'ZeroDivisionError: division by zero'
  },
  // Java Problems
  {
    id: 'dbg-java-1',
    title: 'Division by Zero',
    language: 'java',
    description: 'Fix the ArithmeticException caused by dividing by zero.',
    buggyCode: `public class Test {
    public static void main(String[] args) {
        int x = 10;
        int y = 0;
        System.out.println("Before");
        int z = x / y;
        System.out.println(z);
    }
}`,
    solutionCode: `public class Test {
    public static void main(String[] args) {
        int x = 10;
        int y = 2;
        System.out.println("Before");
        int z = x / y;
        System.out.println(z);
    }
}`,
    buggyOutput: 'Before\nException in thread "main" java.lang.ArithmeticException: / by zero'
  },
  {
    id: 'dbg-java-2',
    title: 'Array Bounds Error',
    language: 'java',
    description: 'Fix the ArrayIndexOutOfBoundsException in the loop condition.',
    buggyCode: `public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        for (int i = 0; i <= 3; i++) {
            System.out.print(arr[i]);
        }
    }
}`,
    solutionCode: `public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        for (int i = 0; i < 3; i++) {
            System.out.print(arr[i]);
        }
    }
}`,
    buggyOutput: '123Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3'
  },
  {
    id: 'dbg-java-3',
    title: 'Missing Return Statement',
    language: 'java',
    description: 'Ensure the max method always returns a value.',
    buggyCode: `public class Test {
    static int max(int a, int b) {
        if (a > b) return a;
    }
    public static void main(String[] args) {
        System.out.println(max(10, 20));
    }
}`,
    solutionCode: `public class Test {
    static int max(int a, int b) {
        if (a > b) return a;
        return b;
    }
    public static void main(String[] args) {
        System.out.println(max(10, 20));
    }
}`,
    buggyOutput: 'Error: Compilation failed. Missing return statement.'
  },
  {
    id: 'dbg-java-4',
    title: 'Wrong Loop Variable Scope',
    language: 'java',
    description: 'Fix the scope issue of variable i to print correctly after the loop.',
    buggyCode: `public class Test {
    public static void main(String[] args) {
        for(int i = 0; i < 3; i++) {
            System.out.print(i);
        }
        System.out.println(i);
    }
}`,
    solutionCode: `public class Test {
    public static void main(String[] args) {
        int i;
        for(i = 0; i < 3; i++) {
            System.out.print(i);
        }
        System.out.println(i);
    }
}`,
    buggyOutput: 'Error: Compilation failed. Cannot find symbol: variable i.'
  },
  {
    id: 'dbg-java-5',
    title: 'Try-Catch Without Exception Handling',
    language: 'java',
    description: 'Properly catch the ArithmeticException with a parameter.',
    buggyCode: `public class Test {
    public static void main(String[] args) {
        try {
            int x = 10 / 0;
        } catch {
            System.out.println("Error");
        }
    }
}`,
    solutionCode: `public class Test {
    public static void main(String[] args) {
        try {
            int x = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error");
        }
    }
}`,
    buggyOutput: 'Error: Compilation failed. Catch block must have a parameter.'
  },
  {
    id: 'dbg-java-6',
    title: 'Wrong Array Declaration',
    language: 'java',
    description: 'Fix the incorrect array initialization syntax.',
    buggyCode: `public class Test {
    public static void main(String[] args) {
        int arr[] = new int[3]{1, 2, 3};
        System.out.println(arr[0]);
    }
}`,
    solutionCode: `public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        System.out.println(arr[0]);
    }
}`,
    buggyOutput: 'Error: Compilation failed. Illegal array initialization.'
  },
  {
    id: 'dbg-java-7',
    title: 'Break Outside Loop',
    language: 'java',
    description: 'Remove the invalid break statement from outside the loop.',
    buggyCode: `public class Test {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            if (i == 3) break;
            System.out.print(i);
        }
        break;
    }
}`,
    solutionCode: `public class Test {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            if (i == 3) break;
            System.out.print(i);
        }
    }
}`,
    buggyOutput: 'Error: Compilation failed. Break statement outside of loop.'
  },
  {
    id: 'dbg-java-8',
    title: 'Library Management System',
    language: 'java',
    description: 'Fix multiple bugs including ArrayIndexOutOfBounds, NullPointer, and infinite loop.',
    buggyCode: `import java.util.Scanner;
import java.util.ArrayList;

class Book {
    String title;
    boolean available;
    Book(String t) { title = t; available = true; }
    void display() { System.out.println(title + " - " + (available ? "Available" : "Issued")); }
}

public class Library {
    ArrayList<Book> books;
    Library() {
        books = new ArrayList<>();
        books.add(new Book("Java Basics"));
        books.add(new Book("Data Structures"));
        books.add(new Book("Algorithms"));
    }
    void issueBook(int index) { if (index >= 0 && index < books.size()) books.get(index).available = false; }
    void returnBook(int index) { if (index >= 0 && index < books.size()) books.get(index).available = true; }
    void displayAll() {
        for (int i = 0; i <= books.size(); i++) {
            books.get(i).display();
        }
    }
    public static void main(String[] args) {
        Library lib = null;
        Scanner sc = new Scanner(System.in);
        int choice;
        while (true) {
            System.out.println("1. Display 2. Issue 3. Return 4. Exit");
            choice = sc.nextInt();
            switch (choice) {
                case 1: lib.displayAll(); break;
                case 2: lib.issueBook(sc.nextInt()); break;
                case 3: lib.returnBook(sc.nextInt()); break;
                case 4: 
                default: System.out.println("Invalid");
            }
        }
    }
}`,
    solutionCode: `import java.util.Scanner;
import java.util.ArrayList;

class Book {
    String title;
    boolean available;
    Book(String t) { title = t; available = true; }
    void display() { System.out.println(title + " - " + (available ? "Available" : "Issued")); }
}

public class Library {
    ArrayList<Book> books;
    Library() {
        books = new ArrayList<>();
        books.add(new Book("Java Basics"));
        books.add(new Book("Data Structures"));
        books.add(new Book("Algorithms"));
    }
    void issueBook(int index) { if (index >= 0 && index < books.size()) books.get(index).available = false; }
    void returnBook(int index) { if (index >= 0 && index < books.size()) books.get(index).available = true; }
    void displayAll() {
        for (int i = 0; i < books.size(); i++) {
            books.get(i).display();
        }
    }
    public static void main(String[] args) {
        Library lib = new Library();
        Scanner sc = new Scanner(System.in);
        int choice;
        while (true) {
            System.out.println("1. Display 2. Issue 3. Return 4. Exit");
            choice = sc.nextInt();
            if (choice == 4) break;
            switch (choice) {
                case 1: lib.displayAll(); break;
                case 2: System.out.print("Book index: "); lib.issueBook(sc.nextInt()); break;
                case 3: System.out.print("Book index: "); lib.returnBook(sc.nextInt()); break;
                default: System.out.println("Invalid");
            }
        }
        sc.close();
    }
}`,
    buggyOutput: 'Exception in thread "main" java.lang.NullPointerException at Library.main'
  }
];

export const mockFinalProblems: FinalProblem[] = [
  {
    id: 'fin-1',
    title: 'Final Challenge: Third Maximum Number',
    problemStatement: `Given an integer array, return the third distinct maximum number. If it does not exist, return the maximum number.

**Task:**
The provided code is buggy and fails to correctly identify the third distinct maximum, especially when handling duplicate values or null initializations.

**Requirements:**
- Fix the logic to handle distinct maximums.
- Return the absolute maximum if fewer than three distinct maximums exist.
- Ensure the code handles large integer values correctly.

**Example Input/Output:**
- Input: \`[3, 2, 1]\` -> Output: \`1\`
- Input: \`[1, 2]\` -> Output: \`2\`
- Input: \`[2, 2, 3, 1]\` -> Output: \`1\`
`,
    buggyCode: `public class ThirdMax {
    public static int thirdMax(int[] nums) {
        Integer first = null, second = null, third = null;

        for (int n : nums) {
            if (n == first || n == second || n == third) continue;

            if (first == null || n > first) {
                third = second;
                second = first;
                first = n;
            } else if (second == null || n > second) {
                third = second;
                second = n;
            } else if (third == null || n > third) {
                third = n;
            }
        }

        return third == null ? first : third;
    }
}`,
    solutionCode: `public class ThirdMax {
    public static int thirdMax(int[] nums) {
        Integer first = null, second = null, third = null;

        for (int n : nums) {
            if (first != null && n == first.intValue()) continue;
            if (second != null && n == second.intValue()) continue;
            if (third != null && n == third.intValue()) continue;

            if (first == null || n > first) {
                third = second;
                second = first;
                first = n;
            } else if (second == null || n > second) {
                third = second;
                second = n;
            } else if (third == null || n > third) {
                third = n;
            }
        }

        return third == null ? (first == null ? 0 : first) : third;
    }
}`,
    buggyOutput: 'Error: Compilation issue or Output mismatch. In Java, primitives and objects can sometimes behave unexpectedly during comparison.'
  },
  {
    id: 'fin-2',
    title: 'Final Challenge: Detect Cycle in Linked List',
    problemStatement: `Given head, the head of a linked list, determine if the linked list has a cycle in it. 
There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.

**Task:**
Find and fix the bug in the provided Floyd's Cycle Detection implementation. The code crashes on certain inputs.

**Requirements:**
- Implement the Tortoise and Hare algorithm correctly.
- Ensure the code handles empty lists or lists with a single node safely.
- Do not use extra memory (O(1) space complexity).
`,
    buggyCode: `class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast.next != null && fast != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
}`,
    solutionCode: `class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
}`,
    buggyOutput: 'Error: java.lang.NullPointerException. The loop condition is checking fast.next before checking if fast itself is null.'
  },
  {
    id: 'fin-3',
    title: 'Final Challenge: Maximum Subarray Sum',
    problemStatement: `Given an integer array nums, find the subarray with the largest sum and return its sum.

**Task:**
The provided implementation of Kadane's algorithm fails for arrays containing only negative numbers.

**Requirements:**
- Fix the logic to correctly handle arrays with negative integers.
- The algorithm should have O(n) time complexity.
`,
    buggyCode: `public class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = 0;
        int currentMax = 0;
        for (int x : nums) {
            currentMax += x;
            if (currentMax < 0) currentMax = 0;
            if (maxSoFar < currentMax) maxSoFar = currentMax;
        }
        return maxSoFar;
    }
}`,
    solutionCode: `public class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }
}`,
    buggyOutput: 'Incorrect Output. For an input of [-1], the output is 0, but it should be -1.'
  }
];

export const mockFinalProblem = mockFinalProblems[0];
