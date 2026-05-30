export interface ContestStanding {
  rank: number;
  username: string;
  score: number;
  solvedCount: number;
  totalTime: number; // in minutes
  problemsSolved: { problemId: string; timeSolved: number; attempts: number }[];
}

export interface Contest {
  id: string;
  title: string;
  status: 'active' | 'upcoming' | 'past';
  startTime: string;
  duration: string;
  participants: number;
  rules: string[];
  problems: string[]; // Problem IDs
  standings: ContestStanding[];
}

export const mockContests: Contest[] = [
  {
    id: 'cnt1',
    title: 'Nonstop Weekly Code Challenge #42',
    status: 'active',
    startTime: '2026-05-24 20:00',
    duration: '2 hours',
    participants: 1342,
    rules: [
      'Cuộc thi diễn ra trong vòng 2 tiếng với 4 bài tập khác nhau.',
      'Điểm số được tính dựa trên số lượng testcase chạy đúng và thời gian nộp bài.',
      'Mỗi lần nộp sai (Wrong Answer, Runtime Error) sẽ bị phạt 10 phút cộng thêm vào thời gian giải.',
      'Mọi hành vi gian lận sao chép mã nguồn sẽ bị hủy kết quả lập tức.'
    ],
    problems: ['p1', 'p2', 'p3'],
    standings: [
      {
        rank: 1,
        username: 'coder_pro_99',
        score: 300,
        solvedCount: 3,
        totalTime: 42,
        problemsSolved: [
          { problemId: 'p1', timeSolved: 5, attempts: 1 },
          { problemId: 'p2', timeSolved: 15, attempts: 1 },
          { problemId: 'p3', timeSolved: 22, attempts: 2 }
        ]
      },
      {
        rank: 2,
        username: 'fptu_king',
        score: 300,
        solvedCount: 3,
        totalTime: 58,
        problemsSolved: [
          { problemId: 'p1', timeSolved: 8, attempts: 1 },
          { problemId: 'p2', timeSolved: 22, attempts: 2 },
          { problemId: 'p3', timeSolved: 28, attempts: 1 }
        ]
      },
      {
        rank: 3,
        username: 'hungnv',
        score: 200,
        solvedCount: 2,
        totalTime: 32,
        problemsSolved: [
          { problemId: 'p1', timeSolved: 12, attempts: 1 },
          { problemId: 'p2', timeSolved: 20, attempts: 1 }
        ]
      }
    ]
  },
  {
    id: 'cnt2',
    title: 'FPT University Tech Cup 2026',
    status: 'upcoming',
    startTime: '2026-06-01 09:00',
    duration: '3 hours',
    participants: 450,
    rules: [
      'Dành riêng cho sinh viên Đại học FPT.',
      'Sử dụng các ngôn ngữ lập trình được hỗ trợ: C++, Java, Python, Go, JS.',
      'Bao gồm 5 bài toán thuật toán từ dễ đến siêu khó.',
      'Giải thưởng tiền mặt lên đến 10,000,000đ dành cho nhà vô địch!'
    ],
    problems: ['p1', 'p2', 'p3', 'p4'],
    standings: []
  },
  {
    id: 'cnt3',
    title: 'Warmup Coding Arena #10',
    status: 'past',
    startTime: '2026-05-18 19:00',
    duration: '1.5 hours',
    participants: 890,
    rules: [
      'Cuộc thi khởi động nhẹ nhàng chuẩn bị cho giải mùa hè.',
      'Gồm 3 bài toán Easy.'
    ],
    problems: ['p1', 'p2'],
    standings: [
      {
        rank: 1,
        username: 'leet_god',
        score: 200,
        solvedCount: 2,
        totalTime: 18,
        problemsSolved: [
          { problemId: 'p1', timeSolved: 5, attempts: 1 },
          { problemId: 'p2', timeSolved: 13, attempts: 1 }
        ]
      },
      {
        rank: 2,
        username: 'hungnv',
        score: 200,
        solvedCount: 2,
        totalTime: 25,
        problemsSolved: [
          { problemId: 'p1', timeSolved: 8, attempts: 1 },
          { problemId: 'p2', timeSolved: 17, attempts: 1 }
        ]
      }
    ]
  }
];

export const getContestById = async (id: string): Promise<Contest | undefined> => {
  return mockContests.find(c => c.id === id);
};
export const getActiveContests = async (): Promise<Contest[]> => {
  return mockContests.filter(c => c.status === 'active');
};
export const getUpcomingContests = async (): Promise<Contest[]> => {
  return mockContests.filter(c => c.status === 'upcoming');
};
export const getPastContests = async (): Promise<Contest[]> => {
  return mockContests.filter(c => c.status === 'past');
};
