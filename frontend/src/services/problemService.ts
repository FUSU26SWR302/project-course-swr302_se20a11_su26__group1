export interface CodingProblem {
  id: string;
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  score: number;
  acceptance: string;
  totalSolved: string;
  descriptionMarkdown: string;
  templates: {
    [key: string]: string; // python, cpp, java, javascript, go
  };
  sampleTestcases: { input: string; output: string }[];
}

export const mockProblems: CodingProblem[] = [
  {
    id: 'p1',
    number: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['Array', 'Hash Table'],
    score: 10,
    acceptance: '53.4%',
    totalSolved: '13,425,123',
    descriptionMarkdown: `Cho một mảng số nguyên \`nums\` và một số nguyên \`target\`, hãy tìm chỉ số của hai số sao cho tổng của chúng bằng \`target\`.

Bạn có thể giả định rằng mỗi đầu vào sẽ có **đúng một giải pháp** và bạn không được sử dụng cùng một phần tử hai lần.

Bạn có thể trả lời câu trả lời theo bất kỳ thứ tự nào.

### Ví dụ 1:
**Đầu vào:** \`nums = [2,7,11,15]\`, \`target = 9\`
**Đầu ra:** \`[0,1]\`
**Giải thích:** Vì \`nums[0] + nums[1] == 9\`, chúng tôi trả về \`[0, 1]\`.

### Ví dụ 2:
**Đầu vào:** \`nums = [3,2,4]\`, \`target = 6\`
**Đầu ra:** \`[1,2]\``,
    templates: {
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Code của bạn ở đây\n        return []`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Code của bạn ở đây\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Code của bạn ở đây\n        return new int[0];\n    }\n}`,
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Code của bạn ở đây\n    return [];\n};`,
      go: `func twoSum(nums []int, target int) []int {\n    // Code của bạn ở đây\n    return nil\n}`
    },
    sampleTestcases: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ]
  },
  {
    id: 'p2',
    number: 2,
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    category: 'Linked List',
    tags: ['Linked List', 'Math'],
    score: 20,
    acceptance: '43.2%',
    totalSolved: '8,342,912',
    descriptionMarkdown: `Bạn được cung cấp hai danh sách liên kết không rỗng đại diện cho hai số nguyên không âm. Các chữ số được lưu trữ theo **thứ tự đảo ngược** và mỗi nút của chúng chứa một chữ số duy nhất. Cộng hai số và trả lại dưới dạng một danh sách liên kết.

Bạn có thể giả định hai số không chứa bất kỳ số 0 nào ở đầu, ngoại trừ chính số 0.

### Ví dụ 1:
**Đầu vào:** \`l1 = [2,4,3]\`, \`l2 = [5,6,4]\`
**Đầu ra:** \`[7,0,8]\`
**Giải thích:** 342 + 465 = 807.`,
    templates: {
      python: `# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        return None`,
      cpp: `/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        return nullptr;\n    }\n};`,
      java: `class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        return null;\n    }\n}`,
      javascript: `var addTwoNumbers = function(l1, l2) {\n    return null;\n};`,
      go: `func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {\n    return nil\n}`
    },
    sampleTestcases: [
      { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]' }
    ]
  },
  {
    id: 'p3',
    number: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'String',
    tags: ['Hash Table', 'Sliding Window', 'String'],
    score: 20,
    acceptance: '35.1%',
    totalSolved: '7,812,045',
    descriptionMarkdown: `Cho một chuỗi \`s\`, hãy tìm chiều dài của **chuỗi con dài nhất** mà không lặp lại các ký tự.

### Ví dụ 1:
**Đầu vào:** \`s = "abcabcbb"\`
**Đầu ra:** \`3\`
**Giải thích:** Đáp án là "abc", với chiều dài là 3.`,
    templates: {
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        return 0`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        return 0;\n    }\n}`,
      javascript: `var lengthOfLongestSubstring = function(s) {\n    return 0;\n};`,
      go: `func lengthOfLongestSubstring(s string) int {\n    return 0\n}`
    },
    sampleTestcases: [
      { input: 's = "abcabcbb"', output: '3' }
    ]
  },
  {
    id: 'p4',
    number: 4,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Arrays',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    score: 30,
    acceptance: '40.5%',
    totalSolved: '3,542,109',
    descriptionMarkdown: `Cho hai mảng đã sắp xếp \`nums1\` và \`nums2\` có kích thước tương ứng là \`m\` và \`n\`, hãy trả về **trung vị** của hai mảng đã sắp xếp đó.

Độ phức tạp thời gian chạy tổng thể phải là \`O(log (m+n))\`.

### Ví dụ 1:
**Đầu vào:** \`nums1 = [1,3]\`, \`nums2 = [2]\`
**Đầu ra:** \`2.00000\`
**Giải thích:** Mảng gộp = [1,2,3] và trung vị là 2.`,
    templates: {
      python: `class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        return 0.0`,
      cpp: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        return 0.0;\n    }\n};`,
      java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        return 0.0;\n    }\n}`,
      javascript: `var findMedianSortedArrays = function(nums1, nums2) {\n    return 0.0;\n};`,
      go: `func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {\n    return 0.0\n}`
    },
    sampleTestcases: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000' }
    ]
  }
];

export const getProblemById = async (id: string): Promise<CodingProblem | undefined> => {
  return mockProblems.find(p => p.id === id);
};
export const getProblemByNumber = async (num: number): Promise<CodingProblem | undefined> => {
  return mockProblems.find(p => p.number === num);
};
