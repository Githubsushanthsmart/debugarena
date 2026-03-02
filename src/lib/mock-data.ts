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


export const mockDebuggingProblems: DebuggingProblem[] = [
  // Python
  {
    id: 'dbg-py-1',
    title: 'Find the Bug: Binary Search',
    language: 'python',
    description: 'The following Python function is supposed to perform a binary search on a sorted array. However, it contains bugs that prevent it from working correctly. Find and fix the bugs.',
    buggyCode: `def binary_search(arr, x):
    low = 0
    high = len(arr)
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] < x:
            low = mid
        else:
            high = mid - 1
    return -1`,
    solutionCode: `def binary_search(arr, x):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] < x:
            low = mid + 1
        elif arr[mid] > x:
            high = mid - 1
        else:
            return mid
    return -1`,
    buggyOutput: 'Error: IndexError: list index out of range. The loop condition or array access is incorrect.'
  },
  {
    id: 'dbg-py-2',
    title: 'Find the Bug: Third Maximum Element',
    language: 'python',
    description: 'This function should find the third distinct maximum number in a list. If the third maximum does not exist, it should return the maximum number. It has bugs in handling duplicate values.',
    buggyCode: `def third_max(nums):
    first = second = third = float('-inf')
    for n in nums:
        if n > first:
            third = second
            second = first
            first = n
        elif n > second:
            third = second
            second = n
        elif n > third:
            third = n
    return third`,
    solutionCode: `def third_max(nums):
    nums = sorted(list(set(nums)), reverse=True)
    if len(nums) < 3:
        return nums[0]
    else:
        return nums[2]`,
    buggyOutput: 'Incorrect output. The logic does not handle duplicate numbers correctly, leading to a wrong third maximum.'
  },
  {
    id: 'dbg-py-3',
    title: 'Find the Bug: Validate Binary Search Tree',
    language: 'python',
    description: 'This function checks if a binary tree is a valid Binary Search Tree (BST). There is a logical error in the recursion. Note: TreeNode class definition is assumed to exist.',
    buggyCode: `def isValidBST(root):
    def helper(node, low, high):
        if node is None:
            return True
        if node.val <= low or node.val >= high:
            return False
        return helper(node.left, low, node.val) or helper(node.right, node.val, high)
    return helper(root, float('-inf'), float('inf'))`,
    solutionCode: `def isValidBST(root):
    def helper(node, low, high):
        if node is None:
            return True
        if node.val <= low or node.val >= high:
            return False
        return helper(node.left, low, node.val) and helper(node.right, node.val, high)
    return helper(root, float('-inf'), float('inf'))`,
    buggyOutput: 'Incorrect output. The recursive check uses "or" instead of "and", allowing invalid BSTs to pass.'
  },
  // Java
  {
    id: 'dbg-java-1',
    title: 'Find the Bug: Bubble Sort',
    language: 'java',
    description: 'The following Java method for Bubble Sort has a bug that causes an ArrayIndexOutOfBoundsException. Find and fix it.',
    buggyCode: `public static void bubbleSort(int arr[]) {
    for(int i=0; i<arr.length; i++){
        for(int j=0; j<arr.length-i; j++){
            if(arr[j] > arr[j+1]){
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
    solutionCode: `public static void bubbleSort(int arr[]) {
    for(int i=0; i<arr.length-1; i++){
        for(int j=0; j<arr.length-i-1; j++){
            if(arr[j] > arr[j+1]){
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
    buggyOutput: 'Error: java.lang.ArrayIndexOutOfBoundsException. Check the inner loop boundaries.'
  },
  {
    id: 'dbg-java-2',
    title: 'Find the Bug: Selection Sort',
    language: 'java',
    description: 'This Selection Sort implementation has a bug in how it tracks and uses the minimum element. Find and fix it.',
    buggyCode: `public static void selectionSort(int arr[]){
    for(int i=0; i<arr.length; i++){
        int min = arr[i];
        for(int j=i+1; j<arr.length; j++){
            if(arr[j] < min){
                min = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
}`,
    solutionCode: `public static void selectionSort(int arr[]){
    for(int i=0; i<arr.length-1; i++){
        int min_idx = i;
        for(int j=i+1; j<arr.length; j++){
            if(arr[j] < arr[min_idx]){
                min_idx = j;
            }
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
    buggyOutput: 'Error: java.lang.ArrayIndexOutOfBoundsException. The "min" variable stores a value, but is used as an index.'
  },
  {
    id: 'dbg-java-3',
    title: 'Find the Bug: Insertion Sort',
    language: 'java',
    description: 'This Insertion Sort method has a bug in its inner while loop that causes it to not sort correctly. Find and fix it.',
    buggyCode: `public static void insertionSort(int arr[]){
    for(int i=1; i<arr.length; i++){
        int key = arr[i];
        int j = i-1;
        while(j>=0 && arr[j] > key){
            arr[j+1] = arr[j];
            j++;
        }
        arr[j+1] = key;
    }
}`,
    solutionCode: `public static void insertionSort(int arr[]){
    for(int i=1; i<arr.length; i++){
        int key = arr[i];
        int j = i-1;
        while(j>=0 && arr[j] > key){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
}`,
    buggyOutput: 'Error: Infinite loop detected. The "j" variable is incremented instead of decremented in the while loop.'
  },
  {
    id: 'dbg-java-4',
    title: 'Find the Bug: Merge Sort Merge Function',
    language: 'java',
    description: 'The merge helper function for Merge Sort is incomplete. It initializes temporary arrays but never populates them with data. Fix the function.',
    buggyCode: `void merge(int arr[], int l, int m, int r){
    int n1 = m-l+1;
    int n2 = r-m;
    int L[] = new int[n1];
    int R[] = new int[n2];
    int i=0,j=0,k=l;
    while(i<n1 && j<n2){
        if(L[i]<=R[j]){
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
}`,
    solutionCode: `void merge(int arr[], int l, int m, int r){
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[] = new int[n1];
    int R[] = new int[n2];
    for (int i = 0; i < n1; ++i)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; ++j)
        R[j] = arr[m + 1 + j];
    int i = 0, j = 0;
    int k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`,
    buggyOutput: 'Incorrect Output. The temporary arrays L and R are not populated with data from the main array before merging.'
  },
  {
    id: 'dbg-java-5',
    title: 'Find the Bug: Quick Sort Partition',
    language: 'java',
    description: 'The partition logic for Quick Sort is incorrect, leading to a wrong sort. Fix the partitioning method.',
    buggyCode: `int partition(int arr[], int low, int high){
    int pivot = arr[high];
    int i = low;
    for(int j=low; j<=high; j++){
        if(arr[j] < pivot){
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    return i;
}`,
    solutionCode: `int partition(int arr[], int low, int high){
    int pivot = arr[high];
    int i = (low - 1);
    for(int j=low; j<high; j++){
        if(arr[j] < pivot){
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i+1];
    arr[i+1] = arr[high];
    arr[high] = temp;
    return (i+1);
}`,
    buggyOutput: 'Incorrect Output. The partition logic is flawed, leading to an improperly sorted array.'
  },
  {
    id: 'dbg-java-6',
    title: 'Find the Bug: Heap Sort Heapify',
    language: 'java',
    description: 'The heapify function for Heap Sort uses incorrect indexing for children and is missing a recursive call. Find and fix the bugs.',
    buggyCode: `void heapify(int arr[], int n, int i){
    int largest = i;
    int l = 2*i;
    int r = 2*i+1;
    if(l<n && arr[l]>arr[largest]) largest=l;
    if(r<n && arr[r]>arr[largest]) largest=r;
    if(largest!=i){
        int temp=arr[i];
        arr[i]=arr[largest];
        arr[largest]=temp;
    }
}`,
    solutionCode: `void heapify(int arr[], int n, int i){
    int largest = i;
    int l = 2*i + 1;
    int r = 2*i + 2;
    if(l<n && arr[l]>arr[largest]) largest=l;
    if(r<n && arr[r]>arr[largest]) largest=r;
    if(largest!=i){
        int temp=arr[i];
        arr[i]=arr[largest];
        arr[largest]=temp;
        heapify(arr, n, largest);
    }
}`,
    buggyOutput: 'Incorrect Output. The heapify function is missing the recursive call to heapify the affected subtree.'
  },
    {
    id: 'dbg-java-7',
    title: 'Find the Bug: Counting Sort',
    language: 'java',
    description: 'This Counting Sort implementation is buggy and incomplete. It fails to find the correct maximum value and doesn\'t construct the sorted output. Fix the logic.',
    buggyCode: `int[] countSort(int arr[]){
    int max = arr[0];
    for(int i=0;i<arr.length;i++)
        if(arr[i]>max) max=i;

    int count[] = new int[max];
    for(int i=0;i<arr.length;i++)
        count[arr[i]]++;
    return count;
}`,
    solutionCode: `int[] countSort(int arr[]){
    if (arr.length == 0) return new int[0];
    int max = arr[0];
    for(int i=1; i<arr.length; i++)
        if(arr[i]>max) max=arr[i];

    int count[] = new int[max + 1];
    for(int i=0; i<arr.length; i++)
        count[arr[i]]++;
    
    int sortedIndex = 0;
    for(int i = 0; i < count.length; i++) {
        while(count[i] > 0) {
            arr[sortedIndex++] = i;
            count[i]--;
        }
    }
    return arr;
}`,
    buggyOutput: 'Error: java.lang.ArrayIndexOutOfBoundsException. The maximum value in the array is not calculated correctly, leading to an incorrectly sized count array.'
  }
];


export const mockFinalProblem: FinalProblem = {
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
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE, third = Integer.MIN_VALUE;
        for (int n : nums) {
            if (n > first) {
                third = second;
                second = first;
                first = n;
            } else if (n > second) {
                third = second;
                second = n;
            } else if (n > third) {
                third = n;
            }
        }
        return (third == Integer.MIN_VALUE) ? first : third;
    }
}`,
    solutionCode: `public class ThirdMax {
    public static int thirdMax(int[] nums) {
        Integer first = null, second = null, third = null;

        for (int n : nums) {
            if (n == first || (first != null && n == first.intValue()) || 
                (second != null && n == second.intValue()) || 
                (third != null && n == third.intValue())) continue;

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
    buggyOutput: 'Error: Output mismatch. The logic fails to handle duplicates (e.g., [2, 2, 3, 1] returns 2 instead of 1) and does not correctly differentiate between the initial value and a real Integer.MIN_VALUE in the array.'
};
