import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'student' | 'instructor';
  avatar: string;
  walletBalance: number;
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  method: string;
  date: string;
}

export interface PaymentTransaction {
  id: string;
  courseTitle: string;
  amount: number;
  status: 'Success' | 'Failed';
  date: string;
}

export interface CodeSubmission {
  id: string;
  problemId: string;
  problemTitle: string;
  lang: string;
  code: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Pending';
  runtime: string;
  memory: string;
  submittedAt: string;
  contestId?: string;
}

interface AppContextType {
  user: User | null;
  walletTransactions: WalletTransaction[];
  paymentTransactions: PaymentTransaction[];
  cart: string[]; // Course IDs
  enrolledCourses: string[]; // Course IDs
  submissions: CodeSubmission[];
  registeredContests: string[]; // Contest IDs
  login: (username: string, role: 'student' | 'instructor') => void;
  logout: () => void;
  depositFunds: (amount: number, method: string) => void;
  withdrawFunds: (amount: number, bank: string, account: string) => boolean;
  addToCart: (courseId: string) => void;
  removeFromCart: (courseId: string) => void;
  checkoutCart: (totalPrice: number, courseItems: { id: string; title: string; price: number }[]) => boolean;
  submitCodeSolution: (
    problemId: string,
    problemTitle: string,
    lang: string,
    code: string,
    contestId?: string
  ) => Promise<CodeSubmission>;
  registerForContest: (contestId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pre-load a default user
  const [user, setUser] = useState<User | null>({
    id: 'u1',
    name: 'Nguyễn Văn Hùng',
    username: 'hungnv',
    email: 'hungnv@fpt.edu.vn',
    role: 'student',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is',
    walletBalance: 2500000,
  });

  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([
    { id: 'TX-1002', type: 'deposit', amount: 500000, status: 'Completed', method: 'VNPAY', date: '2026-05-24 14:30' },
    { id: 'TX-1001', type: 'deposit', amount: 2000000, status: 'Completed', method: 'Momo', date: '2026-05-20 09:15' },
  ]);

  const [paymentTransactions, setPaymentTransactions] = useState<PaymentTransaction[]>([
    { id: 'PAY-2001', courseTitle: 'Cấu trúc dữ liệu và Giải thuật với Java', amount: 499000, status: 'Success', date: '2026-05-21 10:00' },
  ]);

  const [cart, setCart] = useState<string[]>(['c2']); // Start with course 'c2' in cart
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['c1']); // Starts enrolled in 'c1'
  const [submissions, setSubmissions] = useState<CodeSubmission[]>([
    {
      id: 'SUB-4001',
      problemId: 'p1',
      problemTitle: 'Two Sum',
      lang: 'C++',
      code: '#include <vector>\nusing namespace std;\n...',
      status: 'Accepted',
      runtime: '12 ms',
      memory: '10.4 MB',
      submittedAt: '2026-05-24 22:10',
    }
  ]);
  const [registeredContests, setRegisteredContests] = useState<string[]>([]);

  const login = (username: string, role: 'student' | 'instructor') => {
    setUser({
      id: role === 'instructor' ? 'inst-1' : 'u1',
      name: role === 'instructor' ? 'Dr. Lê Minh Tuấn' : username || 'Nguyễn Văn Hùng',
      username: username || 'hungnv',
      email: role === 'instructor' ? 'tuanlm@fpt.edu.vn' : `${username || 'hungnv'}@fpt.edu.vn`,
      role: role,
      avatar: role === 'instructor' 
        ? 'https://ui-avatars.com/api/?name=Le+Tuan&background=F36F21&color=fff'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is',
      walletBalance: role === 'instructor' ? 15800000 : 2500000,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const depositFunds = (amount: number, method: string) => {
    if (!user) return;
    const newTx: WalletTransaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'deposit',
      amount: amount,
      status: 'Completed',
      method: method,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setUser(prev => prev ? { ...prev, walletBalance: prev.walletBalance + amount } : null);
    setWalletTransactions(prev => [newTx, ...prev]);
  };

  const withdrawFunds = (amount: number, bank: string, account: string): boolean => {
    if (!user || user.walletBalance < amount) return false;
    const newTx: WalletTransaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'withdraw',
      amount: amount,
      status: 'Completed',
      method: `${bank} (${account.substring(account.length - 4).padStart(account.length, '*')})`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setUser(prev => prev ? { ...prev, walletBalance: prev.walletBalance - amount } : null);
    setWalletTransactions(prev => [newTx, ...prev]);
    return true;
  };

  const addToCart = (courseId: string) => {
    if (!cart.includes(courseId)) {
      setCart(prev => [...prev, courseId]);
    }
  };

  const removeFromCart = (courseId: string) => {
    setCart(prev => prev.filter(id => id !== courseId));
  };

  const checkoutCart = (totalPrice: number, courseItems: { id: string; title: string; price: number }[]): boolean => {
    if (!user || user.walletBalance < totalPrice) return false;

    // Deduct money
    setUser(prev => prev ? { ...prev, walletBalance: prev.walletBalance - totalPrice } : null);

    // Enroll in all checkout courses
    const courseIds = courseItems.map(c => c.id);
    setEnrolledCourses(prev => [...new Set([...prev, ...courseIds])]);

    // Create payment transaction records
    const newPayments = courseItems.map(item => ({
      id: `PAY-${Math.floor(2000 + Math.random() * 8000)}`,
      courseTitle: item.title,
      amount: item.price,
      status: 'Success' as const,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    }));

    setPaymentTransactions(prev => [...newPayments, ...prev]);
    setCart([]); // Clear cart
    return true;
  };

  const submitCodeSolution = (
    problemId: string,
    problemTitle: string,
    lang: string,
    code: string,
    contestId?: string
  ): Promise<CodeSubmission> => {
    return new Promise((resolve) => {
      const submissionId = `SUB-${Math.floor(4000 + Math.random() * 6000)}`;
      const newSub: CodeSubmission = {
        id: submissionId,
        problemId,
        problemTitle,
        lang,
        code,
        status: 'Pending',
        runtime: '--',
        memory: '--',
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        contestId,
      };

      // Add pending submission
      setSubmissions(prev => [newSub, ...prev]);

      // Simulate compiler delay
      setTimeout(() => {
        // Random outcome: 80% chance of Accepted, 20% other issues
        const rand = Math.random();
        let status: CodeSubmission['status'] = 'Accepted';
        let runtime = `${Math.floor(5 + Math.random() * 80)} ms`;
        let memory = `${(8 + Math.random() * 12).toFixed(1)} MB`;

        if (rand > 0.8) {
          status = 'Wrong Answer';
          runtime = '--';
          memory = '--';
        } else if (rand > 0.9) {
          status = 'Time Limit Exceeded';
          runtime = '> 2000 ms';
        } else if (rand > 0.95) {
          status = 'Runtime Error';
          runtime = '--';
        }

        const evaluatedSub: CodeSubmission = {
          ...newSub,
          status,
          runtime,
          memory,
        };

        // Update in list
        setSubmissions(prev => prev.map(s => s.id === submissionId ? evaluatedSub : s));
        resolve(evaluatedSub);
      }, 1500);
    });
  };

  const registerForContest = (contestId: string) => {
    if (!registeredContests.includes(contestId)) {
      setRegisteredContests(prev => [...prev, contestId]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        walletTransactions,
        paymentTransactions,
        cart,
        enrolledCourses,
        submissions,
        registeredContests,
        login,
        logout,
        depositFunds,
        withdrawFunds,
        addToCart,
        removeFromCart,
        checkoutCart,
        submitCodeSolution,
        registerForContest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
