import type { Team, MCQ, DebuggingProblem, FinalProblem } from './types';

export const mockLeaderboard: Team[] = [
  { id: '1', rank: 1, name: 'The Bug Slayers', college: 'Tech University', score: 250, timeTaken: '00:45:12' },
  { id: '2', rank: 2, name: 'Code Wizards', college: 'State College of Engineering', score: 240, timeTaken: '00:50:34' },
  { id: '3', rank: 3, name: 'Syntax Savages', college: 'Institute of Technology', score: 225, timeTaken: '00:55:01' },
];

export const mockMcqSetA: MCQ[] = [
  { id: 'mcq-a-1', question: 'A program stores student marks in an array marks[100]. The program directly prints marks[45]. What is the time complexity of accessing this element?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], correctAnswerIndex: 2 },
  { id: 'mcq-a-2', question: 'A printer prints documents in the order they arrive. Which data structure best models this behavior?', options: ['Stack', 'Queue', 'Heap', 'Tree'], correctAnswerIndex: 1 },
  { id: 'mcq-a-3', question: 'While evaluating expressions like (A+B)*C, which data structure is mainly used?', options: ['Queue', 'Stack', 'Linked List', 'Graph'], correctAnswerIndex: 1 },
  { id: 'mcq-a-4', question: 'In a binary tree, the topmost node from which all nodes originate is called:', options: ['Leaf', 'Parent', 'Root', 'Edge'], correctAnswerIndex: 2 },
  { id: 'mcq-a-5', question: 'Unlike arrays, linked lists store elements:', options: ['Contiguously', 'Randomly without order', 'Using pointers to next node', 'Inside stacks'], correctAnswerIndex: 2 },
  { id: 'mcq-a-6', question: 'A programmer wants to apply binary search to an array. Which condition must be satisfied?', options: ['Array must be reversed', 'Array must be sorted', 'Array must contain duplicates', 'Array must be dynamic'], correctAnswerIndex: 1 },
  { id: 'mcq-a-7', question: 'Stack overflow occurs when:', options: ['Stack becomes empty', 'Stack becomes full and push is attempted', 'Stack size decreases', 'Stack contains one element'], correctAnswerIndex: 1 },
  { id: 'mcq-a-8', question: 'Breadth-First Search traversal uses which data structure internally?', options: ['Stack', 'Queue', 'Heap', 'Array only'], correctAnswerIndex: 1 },
  { id: 'mcq-a-9', question: 'Hash tables are primarily used to:', options: ['Traverse graphs', 'Perform fast searching', 'Sort elements', 'Store images'], correctAnswerIndex: 1 },
  { id: 'mcq-a-10', question: 'Insertion at the beginning of a linked list generally takes:', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswerIndex: 0 },
  { id: 'mcq-a-11', question: 'In a complete binary tree, nodes are filled:', options: ['Randomly', 'Left to right level-wise', 'Right to left', 'Only at last level'], correctAnswerIndex: 1 },
  { id: 'mcq-a-12', question: 'Which structure uses n × n matrix storage?', options: ['Adjacency list', 'Adjacency matrix', 'Heap', 'Stack'], correctAnswerIndex: 1 },
  { id: 'mcq-a-13', question: 'Binary heaps are commonly used to implement:', options: ['Stack', 'Priority Queue', 'Linked List', 'Graph traversal'], correctAnswerIndex: 1 },
  { id: 'mcq-a-14', question: 'Depth First Search primarily uses:', options: ['Queue', 'Stack', 'Heap', 'Matrix'], correctAnswerIndex: 1 },
  { id: 'mcq-a-15', question: 'Worst case search complexity in BST occurs when the tree becomes:', options: ['Balanced', 'Complete', 'Skewed', 'Heap shaped'], correctAnswerIndex: 2 },
  { id: 'mcq-a-16', question: 'push(10)\npush(20)\npush(30)\npop()\npush(40)\npop()\npush(50)\ntop()\nWhat will top() return?', options: ['10', '20', '40', '50'], correctAnswerIndex: 3 },
  { id: 'mcq-a-17', question: 'function f(n):\n   if n <= 1: return 1\n   return f(n-1) + f(n-2)\n\nprint(f(4)) Output?', options: ['3', '5', '8', '13'], correctAnswerIndex: 2 },
  { id: 'mcq-a-18', question: 'count = 0\nfor i = 1 to n:\n   for j = 1 to i*i:\n      count = count + 1\nTime complexity?', options: ['O(n²)', 'O(n³)', 'O(n log n)', 'O(n⁴)'], correctAnswerIndex: 1 },
  { id: 'mcq-a-19', question: 'enqueue(5)\nenqueue(10)\nenqueue(15)\ndequeue()\nenqueue(20)\ndequeue()\nfront()\nOutput?', options: ['5', '10', '15', '20'], correctAnswerIndex: 1 },
  { id: 'mcq-a-20', question: 'A binary tree has 127 nodes and is perfectly full. Height of the tree (root at level 1)?', options: ['6', '7', '8', '127'], correctAnswerIndex: 2 },
];

export const mockMcqSetB: MCQ[] = [
  { id: 'mcq-b-1', question: 'Array index access time complexity?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], correctAnswerIndex: 2 },
  { id: 'mcq-b-2', question: 'Which structure follows LIFO?', options: ['Queue', 'Stack', 'Tree', 'Heap'], correctAnswerIndex: 1 },
  { id: 'mcq-b-3', question: 'Deletion from queue is called:', options: ['Pop', 'Delete', 'Dequeue', 'Remove'], correctAnswerIndex: 2 },
  { id: 'mcq-b-4', question: 'Maximum children of binary tree node:', options: ['1', '2', '3', 'n'], correctAnswerIndex: 1 },
  { id: 'mcq-b-5', question: 'Linear search worst case:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctAnswerIndex: 2 },
  { id: 'mcq-b-6', question: 'Binary search requires:', options: ['Sorted array', 'Random array', 'Graph', 'Heap'], correctAnswerIndex: 0 },
  { id: 'mcq-b-7', question: 'DFS internally uses:', options: ['Queue', 'Stack', 'Array', 'Heap'], correctAnswerIndex: 1 },
  { id: 'mcq-b-8', question: 'Adjacency matrix size for n vertices:', options: ['n', 'n²', 'n log n', '2n'], correctAnswerIndex: 1 },
  { id: 'mcq-b-9', question: 'Heap is mainly used for:', options: ['Sorting', 'Priority queue', 'Searching', 'Traversal'], correctAnswerIndex: 1 },
  { id: 'mcq-b-10', question: 'Insertion at beginning of linked list complexity:', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswerIndex: 0 },
  { id: 'mcq-b-11', question: 'Recursion uses:', options: ['Heap', 'Stack', 'Queue', 'Array'], correctAnswerIndex: 1 },
  { id: 'mcq-b-12', question: 'Worst case BST search when tree becomes:', options: ['Balanced', 'Complete', 'Skewed', 'Heap'], correctAnswerIndex: 2 },
  { id: 'mcq-b-13', question: 'BFS traversal uses:', options: ['Stack', 'Queue', 'Heap', 'Matrix'], correctAnswerIndex: 1 },
  { id: 'mcq-b-14', question: 'Complete binary tree nodes filled:', options: ['Random', 'Left to right', 'Right to left', 'Bottom first'], correctAnswerIndex: 1 },
  { id: 'mcq-b-15', question: 'Hash table best search case:', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correctAnswerIndex: 2 },
  { id: 'mcq-b-16', question: 'push(10)\npush(20)\npush(30)\npop()\npush(40)\ntop()', options: ['10', '20', '30', '40'], correctAnswerIndex: 3 },
  { id: 'mcq-b-17', question: 'enqueue(1)\nenqueue(2)\nenqueue(3)\ndequeue()\nenqueue(4)\nfront()', options: ['1', '2', '3', '4'], correctAnswerIndex: 1 },
  { id: 'mcq-b-18', question: 'for i = 1 to n:\n  for j = 1 to i:\n    for k = 1 to n:\n      print()', options: ['O(n²)', 'O(n³)', 'O(n² log n)', 'O(n log n)'], correctAnswerIndex: 1 },
  { id: 'mcq-b-19', question: 'function f(n):\n  if n==0: return 1\n  return 2*f(n-1)\n\nprint(f(3))', options: ['6', '8', '4', '12'], correctAnswerIndex: 1 },
  { id: 'mcq-b-20', question: 'A perfect binary tree has 255 nodes. Height (root level = 1)?', options: ['7', '8', '9', '255'], correctAnswerIndex: 1 },
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
  { id: 'dbg-py-1', title: 'Student Grade Calculator', language: 'python', description: 'Fix the scope and return issue in the average calculation.', buggyCode: `class GradeCalculator:\n    def __init__(self):\n        self.grades = []\n    \n    def add_grade(self, grade):\n        self.grades.append(grade)\n    \n    def average(self):\n        total = sum(self.grades)\n        count = len(self.grades)\n        avg = total / count\n        print(avg)\n        avg = 85.0  # Shadowing\n        return avg\n\ncalc = GradeCalculator()\ncalc.add_grade(90)\ncalc.add_grade(80)\nprint(calc.average())`, solutionCode: `class GradeCalculator:\n    def __init__(self):\n        self.grades = []\n    \n    def add_grade(self, grade):\n        self.grades.append(grade)\n    \n    def average(self):\n        total = sum(self.grades)\n        count = len(self.grades)\n        avg = total / count\n        return avg\n\ncalc = GradeCalculator()\ncalc.add_grade(90)\ncalc.add_grade(80)\nprint(calc.average())`, buggyOutput: '85.0\n85.0' },
  { id: 'dbg-py-2', title: 'File Reader with Processing', language: 'python', description: 'Update the code to use embedded data instead of opening a missing file.', buggyCode: `def process_scores(filename):\n    scores = []\n    with open(filename, 'r') as f:  # File doesn't exist\n        for line in f:\n            score = float(line.strip())\n            scores.append(score)\n    avg = sum(scores) / len(scores)\n    return [s > avg for s in scores]\n\nprint(process_scores('nonexistent.txt'))`, solutionCode: `def process_scores(filename):\n    scores = [85, 92, 78, 95, 88]\n    avg = sum(scores) / len(scores)\n    return [s > avg for s in scores]\n\nprint(process_scores('demo'))\nprint(f"Average: {sum([85,92,78,95,88])/5:.1f}")`, buggyOutput: 'FileNotFoundError: [Errno 2] No such file or directory: \'nonexistent.txt\'' },
  { id: 'dbg-py-3', title: 'Data Pipeline Processor', language: 'python', description: 'Fix the IndexError caused by accessing the next item incorrectly.', buggyCode: `def process_pipeline(data_batches):\n    results = []\n    for batch in data_batches:\n        processed = []\n        for i, item in enumerate(batch):\n            if item > 100:  # Off-by-one access\n                processed.append(batch[i+1] * 2)  # IndexError on last item\n        results.append(processed)\n    return results\n\nbatches = [[50, 150, 75], [200, 300]]\nprint(process_pipeline(batches))`, solutionCode: `def process_pipeline(data_batches):\n    results = []\n    for batch in data_batches:\n        processed = []\n        for i, item in enumerate(batch):\n            if item > 100:\n                processed.append(item * 2)\n        results.append(processed)\n    return results\n\nbatches = [[50, 150, 75], [200, 300]]\nprint(process_pipeline(batches))`, buggyOutput: 'IndexError: list index out of range' },
  { id: 'dbg-py-4', title: 'Shopping Cart Total', language: 'python', description: 'Fix the mutable default argument bug in the cart initialization.', buggyCode: `def add_item(cart=[], name="", price=0):\n    cart.append({'name': name, 'price': price})\n    total = sum(item['price'] for item in cart)\n    print(f"Added {name}, Total: \${total:.2f}")\n    return cart\n\ncart1 = add_item(None, "Laptop", 999.99)\ncart2 = add_item(None, "Mouse", 25.99)`, solutionCode: `def add_item(cart=None, name="", price=0):\n    if cart is None:\n        cart = []\n    cart.append({'name': name, 'price': price})\n    total = sum(item['price'] for item in cart)\n    print(f"Added {name}, Total: \${total:.2f}")\n    return cart\n\ncart1 = add_item(None, "Laptop", 999.99)\ncart2 = add_item(None, "Mouse", 25.99)`, buggyOutput: 'Added Laptop, Total: $999.99\nAdded Mouse, Total: $1025.98' },
  { id: 'dbg-py-5', title: 'File Word Counter', language: 'python', description: 'Fix the logic to count words instead of characters and handle input correctly.', buggyCode: `def count_words(filename):\n    word_count = 0\n    with open(filename, 'r') as f:  # File doesn't exist\n        for line in f:\n            word_count += len(line)  # BUG: Counts chars, not words!\n    return word_count\n\nprint(f"Words in file: {count_words('nonexistent.txt')}")`, solutionCode: `def count_words(text):\n    word_count = 0\n    for line in text.split('\\n'):\n        word_count += len(line.split())\n    return word_count\n\nsample_text = """Hello world\\nThis is a test\\nPython debugging practice"""\nprint(f"Words in file: {count_words(sample_text)}")`, buggyOutput: 'FileNotFoundError: [Errno 2] No such file or directory: \'nonexistent.txt\'' },
  { id: 'dbg-py-6', title: 'URL Parser', language: 'python', description: 'Fix the URL splitting logic to handle missing protocols.', buggyCode: `def parse_url(url):\n    parts = url.split('/')\n    protocol = parts[0]  # BUG: Expects http:// first\n    domain = parts[2]\n    path = parts[3]\n    return f"{protocol}://{domain}/{path}"\n\ntest_url = "example.com/api/users"\nprint(parse_url(test_url))`, solutionCode: `def parse_url(url):\n    if url.startswith(('http://', 'https://')):\n        protocol, rest = url.split('://', 1)\n        domain, path = rest.split('/', 1)\n    else:\n        protocol = 'http'\n        domain, path = url.split('/', 1)\n    return f"{protocol}://{domain}/{path}"\n\ntest_url = "example.com/api/users"\nprint(parse_url(test_url))`, buggyOutput: 'IndexError: list index out of range' },
  { id: 'dbg-py-7', title: 'Battery Monitor', language: 'python', description: 'Fix the division by zero and incorrect status logic.', buggyCode: `def battery_status(charge_history):\n    current = charge_history[-1]\n    previous = charge_history[-2]\n    rate = (current - previous) / (time.time() - time.time())  # ZeroDivisionError!\n    \n    if rate < -0.01:\n        return "discharging"\n    elif rate > 0.01:\n        return "charging"\n    else:\n        return "stable"\n\nhistory = [85, 82, 80, 78]\nprint(battery_status(history))`, solutionCode: `def battery_status(charge_history):\n    if len(charge_history) < 2:\n        return "insufficient data"\n    \n    current = charge_history[-1]\n    previous = charge_history[-2]\n    rate = (current - previous) / 1.0\n    \n    if rate < -1:\n        return "discharging"\n    elif rate > 1:\n        return "charging"\n    else:\n        return "stable"\n\nhistory = [85, 82, 80, 78]\nprint(battery_status(history))`, buggyOutput: 'ZeroDivisionError: division by zero' },
  // Java Problems
  { id: 'dbg-java-1', title: 'Division by Zero', language: 'java', description: 'Fix the ArithmeticException caused by dividing by zero.', buggyCode: `public class Test {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 0;\n        System.out.println("Before");\n        int z = x / y;\n        System.out.println(z);\n    }\n}`, solutionCode: `public class Test {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 2;\n        System.out.println("Before");\n        int z = x / y;\n        System.out.println(z);\n    }\n}`, buggyOutput: 'Before\n5' },
  { id: 'dbg-java-2', title: 'Array Bounds Error', language: 'java', description: 'Fix the ArrayIndexOutOfBoundsException in the loop condition.', buggyCode: `public class Test {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3};\n        for (int i = 0; i <= 3; i++) {\n            System.out.print(arr[i]);\n        }\n    }\n}`, solutionCode: `public class Test {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3};\n        for (int i = 0; i < 3; i++) {\n            System.out.print(arr[i]);\n        }\n    }\n}`, buggyOutput: '123' },
  { id: 'dbg-java-3', title: 'Missing Return Statement', language: 'java', description: 'Ensure the max method always returns a value.', buggyCode: `public class Test {\n    static int max(int a, int b) {\n        if (a > b) return a;\n    }\n    public static void main(String[] args) {\n        System.out.println(max(10, 20));\n    }\n}`, solutionCode: `public class Test {\n    static int max(int a, int b) {\n        if (a > b) return a;\n        return b;\n    }\n    public static void main(String[] args) {\n        System.out.println(max(10, 20));\n    }\n}`, buggyOutput: '20' },
  { id: 'dbg-java-4', title: 'Wrong Loop Variable Scope', language: 'java', description: 'Fix the scope issue of variable i to print correctly after the loop.', buggyCode: `public class Test {\n    public static void main(String[] args) {\n        for(int i = 0; i < 3; i++) {\n            System.out.print(i);\n        }\n        System.out.println(i);\n    }\n}`, solutionCode: `public class Test {\n    public static void main(String[] args) {\n        int i;\n        for(i = 0; i < 3; i++) {\n            System.out.print(i);\n        }\n        System.out.println(i);\n    }\n}`, buggyOutput: '0123' },
  { id: 'dbg-java-5', title: 'Try-Catch Without Exception Handling', language: 'java', description: 'Properly catch the ArithmeticException with a parameter.', buggyCode: `public class Test {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch {\n            System.out.println("Error");\n        }\n    }\n}`, solutionCode: `public class Test {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println("Error");\n        }\n    }\n}`, buggyOutput: 'Error' },
  { id: 'dbg-java-6', title: 'Wrong Array Declaration', language: 'java', description: 'Fix the incorrect array initialization syntax.', buggyCode: `public class Test {\n    public static void main(String[] args) {\n        int arr[] = new int[3]{1, 2, 3};\n        System.out.println(arr[0]);\n    }\n}`, solutionCode: `public class Test {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3};\n        System.out.println(arr[0]);\n    }\n}`, buggyOutput: '1' },
  { id: 'dbg-java-7', title: 'Break Outside Loop', language: 'java', description: 'Remove the invalid break statement from outside the loop.', buggyCode: `public class Test {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            if (i == 3) break;\n            System.out.print(i);\n        }\n        break;\n    }\n}`, solutionCode: `public class Test {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            if (i == 3) break;\n            System.out.print(i);\n        }\n    }\n}`, buggyOutput: '012' },
  { id: 'dbg-java-8', title: 'Library Management System', language: 'java', description: 'Fix multiple bugs including ArrayIndexOutOfBounds, NullPointer, and infinite loop.', buggyCode: `import java.util.Scanner;\nimport java.util.ArrayList;\n\nclass Book {\n    String title;\n    boolean available;\n    Book(String t) { title = t; available = true; }\n    void display() { System.out.println(title + " - " + (available ? "Available" : "Issued")); }\n}\n\npublic class Library {\n    ArrayList<Book> books;\n    Library() {\n        books = new ArrayList<>();\n        books.add(new Book("Java Basics"));\n        books.add(new Book("Data Structures"));\n        books.add(new Book("Algorithms"));\n    }\n    void issueBook(int index) { if (index >= 0 && index < books.size()) books.get(index).available = false; }\n    void returnBook(int index) { if (index >= 0 && index < books.size()) books.get(index).available = true; }\n    void displayAll() {\n        for (int i = 0; i <= books.size(); i++) {\n            books.get(i).display();\n        }\n    }\n    public static void main(String[] args) {\n        Library lib = null;\n        Scanner sc = new Scanner(System.in);\n        int choice;\n        while (true) {\n            System.out.println("1. Display 2. Issue 3. Return 4. Exit");\n            choice = sc.nextInt();\n            switch (choice) {\n                case 1: lib.displayAll(); break;\n                case 2: lib.issueBook(sc.nextInt()); break;\n                case 3: lib.returnBook(sc.nextInt()); break;\n                case 4: \n                default: System.out.println("Invalid");\n            }\n        }\n    }\n}`, solutionCode: `import java.util.Scanner;\nimport java.util.ArrayList;\n\nclass Book {\n    String title;\n    boolean available;\n    Book(String t) { title = t; available = true; }\n    void display() { System.out.println(title + " - " + (available ? "Available" : "Issued")); }\n}\n\npublic class Library {\n    ArrayList<Book> books;\n    Library() {\n        books = new ArrayList<>();\n        books.add(new Book("Java Basics"));\n        books.add(new Book("Data Structures"));\n        books.add(new Book("Algorithms"));\n    }\n    void issueBook(int index) { if (index >= 0 && index < books.size()) books.get(index).available = false; }\n    void returnBook(int index) { if (index >= 0 && index < books.size()) books.get(index).available = true; }\n    void displayAll() {\n        for (int i = 0; i < books.size(); i++) {\n            books.get(i).display();\n        }\n    }\n    public static void main(String[] args) {\n        Library lib = new Library();\n        Scanner sc = new Scanner(System.in);\n        int choice;\n        while (true) {\n            System.out.println("1. Display 2. Issue 3. Return 4. Exit");\n            choice = sc.nextInt();\n            if (choice == 4) break;\n            switch (choice) {\n                case 1: lib.displayAll(); break;\n                case 2: System.out.print("Book index: "); lib.issueBook(sc.nextInt()); break;\n                case 3: System.out.print("Book index: "); lib.returnBook(sc.nextInt()); break;\n                default: System.out.println("Invalid");\n            }\n        }\n        sc.close();\n    }\n}`, buggyOutput: '1. Display 2. Issue 3. Return 4. Exit\n1\nJava Basics - Available\nData Structures - Available\nAlgorithms - Available\n1. Display 2. Issue 3. Return 4. Exit\n2\nBook index: 0\n1. Display 2. Issue 3. Return 4. Exit\n1\nJava Basics - Issued\nData Structures - Available\nAlgorithms - Available' }
];

export const mockFinalProblems: FinalProblem[] = [
  {
    id: 'fin-1',
    title: 'Final Challenge: Bank Account Simulation',
    language: 'python',
    problemStatement: `Implement a Bank Account simulation with deposit and withdrawal capabilities. Fix the syntax errors and ensure correct balance updates.

**Requirements:**
- Fix the missing colons in class/method definitions.
- Fix method names and attribute access (case-sensitivity).
- Ensure deposit and withdrawal logic is correct.
`,
    buggyCode: `class BankAccount\n    def _init_(self,name,balance)\n        self.name = Name\n        self.balance = balancee\n    def deposit(self,amount):\n        self.balance =+ amount\n        print("Deposited", amount)\n    def withdraw(self,amount):\n        if amount >= self.balance:\n            print("Insufficient balance")\n        else\n            self.balance = self.balance - amount\n            print("Withdraw:", amount)\n    def display(self)\n        print("Account Holder", self.Name)\n        print("Balance:", balance)\nacc = BankAccount("Enter Your Name",1000)\nacc.deposit("500")\nacc.withdraw(3000)\nacc.display`,
    solutionCode: `class BankAccount:\n    def __init__(self,name,balance):\n        self.name = name\n        self.balance = balance\n    def deposit(self,amount):\n        self.balance += amount\n        print("Deposited:", amount)\n    def withdraw(self,amount):\n        if amount > self.balance:\n            print("Insufficient balance")\n        else:\n            self.balance -= amount\n            print("Withdrawn:", amount)\n    def display(self):\n        print("Account Holder:", self.name)\n        print("Balance:", self.balance)\nacc = BankAccount("Enter Your Name",1000)\nacc.deposit(500)\nacc.withdraw(300)\nacc.display()`
  },
  {
    id: 'fin-2',
    title: 'Final Challenge: Library Book Management System',
    language: 'python',
    problemStatement: `Manage a library's book list. Fix the function definitions, variable names, and method logic.

**Requirements:**
- Fix missing colons and parentheses.
- Ensure correct variable referencing (books vs book).
- Fix function naming and calls.
`,
    buggyCode: `books = ["Python", "Java", "C++", "AI"]\ndef borrow_book(book_name)\n    if book_name in book\n        books.remove(bookname)\n        print(book_name "borrowed successfully")\n    else\n        print("Book not available"\ndef return_book(book_name):\n    books.append(bookname)\n    print(book_name, "returned sucessfully")\nborrowbook("Python")\nborrow_book("Javaa")\nprint("Available books", book)\nreturn_book("Python")\nprint("Available books:", books)\nbooks.remove("C")`,
    solutionCode: `books = ["Python", "Java", "C++", "AI"]\n\ndef borrow_book(book_name):\n    if book_name in books:\n        books.remove(book_name)\n        print(book_name, "borrowed successfully")\n    else:\n        print("Book not available")\n\ndef return_book(book_name):\n    books.append(book_name)\n    print(book_name, "returned successfully")\n\nborrow_book("Python")\nborrow_book("Java")\n\nprint("Available books:", books)\n\nreturn_book("Python")\n\nprint("Available books:", books)`
  },
  {
    id: 'fin-3',
    title: 'Final Challenge: Student Result Management Program',
    language: 'java',
    problemStatement: `Manage student grades. Fix the loop boundaries, array access, and output formatting.

**Requirements:**
- Fix class name (case sensitivity).
- Correct array length logic and indexing.
- Ensure standard output formatting for grades.
`,
    buggyCode: `public class studentResult\n    public static void main(String args)\n        String names[] = {"Enter Any Three Names"};\n        int marks[] = {85,72,91}\n        for(int i=0; i<=names.length; i++)\n            if(marks[i] => 90)\n                System.out.println(names + " Grade: A")\n            else if(marks[i] >= 75)\n                System.out.println(name[i] + " Grade B")\n            else\n                System.out.println(names[i] + " Grade: C")\n        System.out.println("Result Published")\n    }\n}`,
    solutionCode: `public class StudentResult {\n    public static void main(String[] args) {\n        String names[] = {"Enter Any Three Names"};\n        int marks[] = {85,72,91};\n        for(int i=0; i<names.length; i++){\n            if(marks[i] >= 90)\n                System.out.println(names[i] + " Grade: A");\n            else if(marks[i] >= 75)\n                System.out.println(names[i] + " Grade: B");\n            else\n                System.out.println(names[i] + " Grade: C");\n        }\n    }\n}`
  }
];

export const mockFinalProblem = mockFinalProblems[0];
