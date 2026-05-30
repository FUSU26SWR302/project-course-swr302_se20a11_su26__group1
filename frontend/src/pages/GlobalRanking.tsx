import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  solved: number;
  streak: number;
  title: 'Grandmaster' | 'Master' | 'Guardian' | 'Knight' | 'Novice' | 'DP Wizard' | 'Recursion Master';
}

interface PodiumUser {
  name: string;
  points: string;
  solved: string;
  avatar: string;
  title: string;
  badgeBg: string;
  performanceLabel: string;
  performanceVal: string;
  hasFlame?: boolean;
}

const mockLeagueData: Record<'all' | 'weekly' | 'monthly', { p1: PodiumUser; p2: PodiumUser; p3: PodiumUser }> = {
  all: {
    p1: {
      name: "John Doe",
      points: "15,800 pts",
      solved: "612",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD02oOs5YuGO_q4am7KBDN-lyoWuHYNfyV1oM4bFmFWxAC0zNP2OXHEvi6RCJmg1fiDwQIzDSrH0l3peSI_R6uUqpk3DIpORTAPj1lSnwN-aPqXCaNtp-wwwWT-BzG9jfKVSKP6h0k9uGx2hhP8h9pAI_lZF4cFrXk3gOHHane_ScJJdtmuXMSmOroWsp8JwLSVNqrFOa1KOpbaAZZrdwHx6irgwG4iuvFmULCpC_KrkxwGYbIjaTXBx3dCsDu3a9JrBs1TmqRwSA",
      title: "Grandmaster",
      badgeBg: "bg-[#F36F21]/10 text-[#F36F21] border-[#F36F21]/20",
      performanceLabel: "Win Streak:",
      performanceVal: "12 Days",
      hasFlame: true
    },
    p2: {
      name: "Alice Nguyen",
      points: "12,450 pts",
      solved: "452",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgy50UMGsrfiNlaMOGS5hIFfEB9ALLj2hHwL19FjiPxHtPdmdzDshyKCd9cxUE55L1IPGibJJ8XxYWvIOtq6nCmPgaCFoPxxlN64_OwyPrZocxC4bEzFtpL_km1YmpuA-CN4fUVjD5gO2NI7mdCoim7_CAT7njSdYphWceJpEIiRp5PAaZrqeglhZ4z73HAhMVJI5rSTTAUK3BmjBzHCR2ivCNvmKAvTRSv0bZDvGjfSB2GENwq1duU8S0jsS3Bgtxt-P5YEUi6M8",
      title: "Master",
      badgeBg: "bg-[#46A040]/10 text-[#46A040] border-[#46A040]/25",
      performanceLabel: "Accuracy Rate:",
      performanceVal: "89.4%"
    },
    p3: {
      name: "Bob Smith",
      points: "11,200 pts",
      solved: "398",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVomxWSJhKP4gY1tskEgBnc-uwlSGtjxGtlSCu0HYXgC2f8u-C8XBTqyfCbNtkTOh-QTmmyM2zQ3DabmlPoGAYyb_-BF4abtgwbZTrvvdbrcHBB7qmM1iUbRT5ZrIlwrYluTtcIEbeJf1Z_SDdboaLdzEWI2_bXGyIfZUUBr8yhoXgTsTyxW8XDIWq-o9FsZ9ICfSnvG5hRd6zraHfF7QIeuddoBdBlwpGAZExwYjtoUNqqZd-hwOexQZqZKm9xwlZSzsgu5iQn7E",
      title: "Guardian",
      badgeBg: "bg-[#12284C]/10 text-[#12284C] border-[#12284C]/25",
      performanceLabel: "Accuracy Rate:",
      performanceVal: "84.2%"
    }
  },
  weekly: {
    p1: {
      name: "Alice Nguyen",
      points: "1,200 pts",
      solved: "42",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgy50UMGsrfiNlaMOGS5hIFfEB9ALLj2hHwL19FjiPxHtPdmdzDshyKCd9cxUE55L1IPGibJJ8XxYWvIOtq6nCmPgaCFoPxxlN64_OwyPrZocxC4bEzFtpL_km1YmpuA-CN4fUVjD5gO2NI7mdCoim7_CAT7njSdYphWceJpEIiRp5PAaZrqeglhZ4z73HAhMVJI5rSTTAUK3BmjBzHCR2ivCNvmKAvTRSv0bZDvGjfSB2GENwq1duU8S0jsS3Bgtxt-P5YEUi6M8",
      title: "Master",
      badgeBg: "bg-[#F36F21]/10 text-[#F36F21] border-[#F36F21]/20",
      performanceLabel: "Accuracy Rate:",
      performanceVal: "89.4%"
    },
    p2: {
      name: "David Lee",
      points: "980 pts",
      solved: "35",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is",
      title: "DP Wizard",
      badgeBg: "bg-[#46A040]/10 text-[#46A040] border-[#46A040]/25",
      performanceLabel: "Accuracy Rate:",
      performanceVal: "81.2%"
    },
    p3: {
      name: "John Doe",
      points: "910 pts",
      solved: "31",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD02oOs5YuGO_q4am7KBDN-lyoWuHYNfyV1oM4bFmFWxAC0zNP2OXHEvi6RCJmg1fiDwQIzDSrH0l3peSI_R6uUqpk3DIpORTAPj1lSnwN-aPqXCaNtp-wwwWT-BzG9jfKVSKP6h0k9uGx2hhP8h9pAI_lZF4cFrXk3gOHHane_ScJJdtmuXMSmOroWsp8JwLSVNqrFOa1KOpbaAZZrdwHx6irgwG4iuvFmULCpC_KrkxwGYbIjaTXBx3dCsDu3a9JrBs1TmqRwSA",
      title: "Grandmaster",
      badgeBg: "bg-[#12284C]/10 text-[#12284C] border-[#12284C]/25",
      performanceLabel: "Win Streak:",
      performanceVal: "12 Days",
      hasFlame: true
    }
  },
  monthly: {
    p1: {
      name: "Emma Watson",
      points: "4,500 pts",
      solved: "148",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgMrlXcL6UyewsliLmYzTFGeK46VPXPWa0zqiFJFG3Hab-pyZxWtLpBIjHojZqQVgPRMLB8VMpFNSPznwO6UAHzZ2jcFWs6K0BKMoB0OD6WHKwN5vItAHep9ax_z9Omyl1BaSD9pXR8rHPLTMdus-Dh94N_UEM2V5mfs9b6xxFTVdKN7cmXk6y3CyGBnmOA0TKw6rbul5AenrOgS9aOiP0BR-apj6wQfoZlBJkkBtbvlPlXsTpO_CtKv-ITYmOrUJqs6SnUAzYMLw",
      title: "Recursion Master",
      badgeBg: "bg-[#F36F21]/10 text-[#F36F21] border-[#F36F21]/20",
      performanceLabel: "Accuracy Rate:",
      performanceVal: "78.5%"
    },
    p2: {
      name: "John Doe",
      points: "4,100 pts",
      solved: "135",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD02oOs5YuGO_q4am7KBDN-lyoWuHYNfyV1oM4bFmFWxAC0zNP2OXHEvi6RCJmg1fiDwQIzDSrH0l3peSI_R6uUqpk3DIpORTAPj1lSnwN-aPqXCaNtp-wwwWT-BzG9jfKVSKP6h0k9uGx2hhP8h9pAI_lZF4cFrXk3gOHHane_ScJJdtmuXMSmOroWsp8JwLSVNqrFOa1KOpbaAZZrdwHx6irgwG4iuvFmULCpC_KrkxwGYbIjaTXBx3dCsDu3a9JrBs1TmqRwSA",
      title: "Grandmaster",
      badgeBg: "bg-[#46A040]/10 text-[#46A040] border-[#46A040]/25",
      performanceLabel: "Win Streak:",
      performanceVal: "12 Days",
      hasFlame: true
    },
    p3: {
      name: "Alice Nguyen",
      points: "3,890 pts",
      solved: "122",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgy50UMGsrfiNlaMOGS5hIFfEB9ALLj2hHwL19FjiPxHtPdmdzDshyKCd9cxUE55L1IPGibJJ8XxYWvIOtq6nCmPgaCFoPxxlN64_OwyPrZocxC4bEzFtpL_km1YmpuA-CN4fUVjD5gO2NI7mdCoim7_CAT7njSdYphWceJpEIiRp5PAaZrqeglhZ4z73HAhMVJI5rSTTAUK3BmjBzHCR2ivCNvmKAvTRSv0bZDvGjfSB2GENwq1duU8S0jsS3Bgtxt-P5YEUi6M8",
      title: "Master",
      badgeBg: "bg-[#12284C]/10 text-[#12284C] border-[#12284C]/25",
      performanceLabel: "Accuracy Rate:",
      performanceVal: "89.4%"
    }
  }
};

interface RankingUser {
  rank: number;
  rankChange: { type: 'up' | 'down' | 'same'; val?: number };
  name: string;
  avatar: string;
  title: string;
  titleClass: string;
  solved: number;
  accuracy: number;
  language: string;
  points: string;
}

const rankingUsers: RankingUser[] = [
  {
    rank: 4,
    rankChange: { type: 'up', val: 1 },
    name: "David Lee",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is",
    title: "DP Wizard",
    titleClass: "bg-[#fce2d3] text-primary",
    solved: 324,
    accuracy: 81.2,
    language: "JavaScript",
    points: "10,500"
  },
  {
    rank: 5,
    rankChange: { type: 'down', val: 1 },
    name: "Emma Watson",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgMrlXcL6UyewsliLmYzTFGeK46VPXPWa0zqiFJFG3Hab-pyZxWtLpBIjHojZqQVgPRMLB8VMpFNSPznwO6UAHzZ2jcFWs6K0BKMoB0OD6WHKwN5vItAHep9ax_z9Omyl1BaSD9pXR8rHPLTMdus-Dh94N_UEM2V5mfs9b6xxFTVdKN7cmXk6y3CyGBnmOA0TKw6rbul5AenrOgS9aOiP0BR-apj6wQfoZlBJkkBtbvlPlXsTpO_CtKv-ITYmOrUJqs6SnUAzYMLw",
    title: "Recursion Master",
    titleClass: "bg-blue-100 text-blue-800",
    solved: 290,
    accuracy: 78.5,
    language: "Python",
    points: "9,800"
  },
  {
    rank: 6,
    rankChange: { type: 'same' },
    name: "Michael Chen",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYPYFuy2OXHEZ2QIwsqadhiASV2WJU940xnugQ46lD0bMjQUE7P8NJim8pp_6XPoA_re2pY6_V11StR5ZcMvJ6-45iCi-2zjKKYBkUrUXcgRR-pwqqJeX9bgHU_bkhp3hYiEROBmTXMSuYyaNWmvy8qihxKmiaPNRHtI9eWujbf8sLU8g7x6qzQb1iLuvKYscOH1fKJi4gSKWQ_IwR5sJt3nuh_tTjjkROevoPgIeiVlqBnOM-lWOBr450l6jRgjhd3TYTFEFFdiY",
    title: "Algorithm Sage",
    titleClass: "bg-[#e2f0d9] text-brand-green",
    solved: 276,
    accuracy: 85.0,
    language: "C++",
    points: "9,250"
  },
  {
    rank: 7,
    rankChange: { type: 'up', val: 3 },
    name: "Sarah Johnson",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrLRPGmTw2WKOVjaU8vt3rWbyU_IutkyQCHmjb4756OHz94BzCcaaqOAypjovZ890SBIthYzF12ggMvhxo0w-S_OQizNFa5DtyTQfi3KxxxubXCobRHCPMK2auxCeFzRISNcp72GUb3AXRG4IbJSc1j1jqMRfbhbXBZFOzuEs9Zyv3mgRrXDRBAujfgQw5_uGSeKQI340ZtVWM81ZNu887j7-Ee2CMIXLXPiIRuva9t7_xMz7YydCPH56sKDASIrKT-SFU_pzI-q0",
    title: "Web API Wizard",
    titleClass: "bg-purple-100 text-purple-800",
    solved: 255,
    accuracy: 82.1,
    language: "JavaScript",
    points: "8,900"
  },
  {
    rank: 8,
    rankChange: { type: 'down', val: 2 },
    name: "Kevin Garcia",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYJKEX6_kwyOg-we5J94SIrFfqLRIG5Z_LC9tzwEoWx0cGOodHWbGqLVoGgwg6VVE0gbGEZUFVFiyTQw_TS5S7PS8DjZH6LBytsNi8SpmdtHiv62xPqrPT0KccyBPTmq-Qm_Xck3H0fmCJwkyKwIr-zFb62SF6EuH-Spk8KFwqJoqTShsWSoPbKXmmJDszsHyT_UjoEAQJf7AwNG4H-nUl2PVKM89WGErinsvUa4aD6li3dmkyyqA6BzGJs0PHTpiAq0U1e-gl7hc",
    title: "Data Structure Geek",
    titleClass: "bg-amber-100 text-amber-800",
    solved: 241,
    accuracy: 74.3,
    language: "Java",
    points: "8,400"
  },
  {
    rank: 9,
    rankChange: { type: 'up', val: 1 },
    name: "Lisa Kim",
    avatar: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Tech Lead",
    titleClass: "bg-pink-100 text-pink-800",
    solved: 230,
    accuracy: 89.2,
    language: "Python",
    points: "8,150"
  },
  {
    rank: 10,
    rankChange: { type: 'down', val: 1 },
    name: "Tom Wilson",
    avatar: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Data Scientist",
    titleClass: "bg-[#dfebf6] text-blue-600",
    solved: 222,
    accuracy: 80.0,
    language: "R",
    points: "7,900"
  }
];

export const GlobalRanking: React.FC = () => {
  const { user } = useApp();
  const [activeLeague, setActiveLeague] = useState<'all' | 'weekly' | 'monthly'>('all');
  const [podiumTransitioning, setPodiumTransitioning] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleLeagueSwitch = (league: 'all' | 'weekly' | 'monthly') => {
    if (league === activeLeague) return;
    setPodiumTransitioning(true);
    setTimeout(() => {
      setActiveLeague(league);
      setPodiumTransitioning(false);
    }, 300);
  };

  const filteredUsers = rankingUsers.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const p1 = mockLeagueData[activeLeague].p1;
  const p2 = mockLeagueData[activeLeague].p2;
  const p3 = mockLeagueData[activeLeague].p3;

  return (
    <>
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .icon-fill {
            font-variation-settings: 'FILL' 1;
        }
        
        /* Premium Custom Animations & Keyframes */
        @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(0.5deg); }
        }
        @keyframes float-medium {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
        }
        @keyframes crown-bounce {
            0%, 100% { transform: translateY(0px) rotate(-5deg); }
            50% { transform: translateY(-4px) rotate(5deg); }
        }
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 15px rgba(243, 111, 33, 0.3), inset 0 0 10px rgba(243, 111, 33, 0.05); border-color: rgba(243, 111, 33, 0.4); }
            50% { box-shadow: 0 0 25px rgba(243, 111, 33, 0.6), inset 0 0 15px rgba(243, 111, 33, 0.2); border-color: rgba(243, 111, 33, 0.8); }
        }
        @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
            animation: float-medium 4s ease-in-out infinite;
        }
        .animate-crown {
            animation: crown-bounce 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
            animation: pulse-glow 3s infinite;
        }
        
        .shine-effect {
            position: relative;
            overflow: hidden;
        }
        .shine-effect::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transform: skewX(-20deg);
            animation: shine 4s infinite;
        }

        .glassmorphism {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .orange-border {
            border: 4px solid #E05E1A;
            box-shadow: 0 0 25px rgba(243, 111, 33, 0.45);
        }
        .blue-border {
            border: 4px solid #0E1F3B;
            box-shadow: 0 0 18px rgba(18, 40, 76, 0.35);
        }
        .green-border {
            border: 4px solid #388A33;
            box-shadow: 0 0 18px rgba(70, 160, 64, 0.3);
        }
        
        /* Smooth scale transition for ranking rows */
        .ranking-row {
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ranking-row:hover {
            transform: scale(1.01) translateY(-2px);
        }
      `}</style>

      {/* Glowing Backdrop Circles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#F36F21]/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#12284C]/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-[#3b82f6]/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Main Layout Container */}
      <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-4 lg:px-8 pt-4 pb-8 md:pt-6 md:pb-12 z-10">
        {/* Header Text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            {/* Decorative Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#fce2d3] border border-primary/20 px-3 py-1 rounded-full text-primary font-bold text-xs uppercase tracking-wider mb-3 shadow-sm">
              <span className="material-symbols-outlined text-xs icon-fill">military_tech</span> Season 2026 Active
            </div>
            <h1 className="text-display-lg-mobile md:text-display-lg font-display font-black leading-tight">
              <span className="bg-gradient-to-r from-[#0114a7] to-[#2563eb] bg-clip-text text-transparent">Global</span>{' '}
              <span className="bg-gradient-to-r from-[#ff6000] to-[#ff8c42] bg-clip-text text-transparent">Rankings</span>
            </h1>
            <p className="text-body-md text-text-muted mt-2 max-w-lg">See who's leading the charts in coding mastery.</p>
          </div>

          {/* Filter Tab System and Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search bar */}
            <div className="relative min-w-[240px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">search</span>
              <input
                id="rank-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coders..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white/70 backdrop-blur-sm transition-all shadow-sm"
              />
            </div>

            {/* Main Filter buttons */}
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm p-1.5 rounded-xl border border-gray-200 shadow-sm w-fit">
              <button
                id="tab-all-time"
                onClick={() => handleLeagueSwitch('all')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                  activeLeague === 'all'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                All Time
              </button>
              <button
                id="tab-weekly"
                onClick={() => handleLeagueSwitch('weekly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                  activeLeague === 'weekly'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                Weekly
              </button>
              <button
                id="tab-monthly"
                onClick={() => handleLeagueSwitch('monthly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                  activeLeague === 'monthly'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        {/* Podium Section with Luxury Glassmorphic Design */}
        <div
          id="podium-wrapper"
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 items-end justify-center mb-16 mt-4 w-full transition-all duration-300 ${
            podiumTransitioning ? 'opacity-50 translate-y-1.5' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Rank 2: Green (Appears on left on desktop) */}
          <div className="flex flex-col items-center order-2 md:order-1 animate-float-medium" style={{ animationDelay: '0.5s' }}>
            {/* Floating Medal Icon for Top 2 (Green) */}
            <div className="text-brand-green animate-crown mb-2 relative z-10 flex flex-col items-center" style={{ animationDelay: '0.3s' }}>
              <span className="material-symbols-outlined text-[38px] icon-fill text-[#46A040] drop-shadow-[0_4px_10px_rgba(70,160,64,0.3)]">military_tech</span>
              <div className="h-1 w-6 bg-[#46A040]/30 rounded-full blur-xs opacity-50 mt-1"></div>
            </div>

            <div className="w-full glassmorphism rounded-2xl p-7 shadow-xl border-t-[6px] border-[#46A040] relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.025]">
              {/* Decorative background rank */}
              <div className="absolute -right-6 -bottom-6 text-[100px] font-black font-display text-[#46A040]/5 pointer-events-none select-none">2</div>

              {/* Profile Image & Badge */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={p2.avatar}
                    alt="Rank 2 Avatar"
                    className="w-20 h-20 rounded-full object-cover green-border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p2.name)}&background=46A040&color=fff`;
                    }}
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#46A040] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-md">2</div>
                </div>

                <h3 id="p2-name" className="font-display font-bold text-lg text-[#46A040]">{p2.name}</h3>
                <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold mt-1.5 border uppercase ${p2.badgeBg}`}>
                  {p2.title}
                </div>

                {/* Stats breakdown */}
                <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <span className="block text-caption text-text-muted font-semibold uppercase">Score</span>
                    <span id="p2-points" className="font-display font-black text-[#46A040] text-lg">{p2.points}</span>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <span className="block text-caption text-text-muted font-semibold uppercase">Solved</span>
                    <span id="p2-solved" className="font-display font-black text-[#46A040] text-lg">{p2.solved}</span>
                  </div>
                </div>

                {/* Performance ring */}
                <div className="w-full mt-4 bg-[#46A040]/5 rounded-lg p-2.5 flex items-center justify-between text-xs border border-[#46A040]/10">
                  <span className="text-text-muted">{p2.performanceLabel}</span>
                  {p2.hasFlame ? (
                    <span className="font-bold text-[#46A040] flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs icon-fill">local_fire_department</span> {p2.performanceVal}
                    </span>
                  ) : (
                    <span className="font-bold text-[#46A040]">{p2.performanceVal}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Rank 1: Orange (Center piece, tallest, most prominent) */}
          <div className="flex flex-col items-center order-1 md:order-2 animate-float-slow">
            {/* Floating Animated Trophy Cup instead of King Bed */}
            <div className="text-primary animate-crown mb-2 relative z-10 flex flex-col items-center">
              <span className="material-symbols-outlined text-[52px] icon-fill text-[#F36F21] drop-shadow-[0_4px_12px_rgba(243,111,33,0.5)]">trophy</span>
              <div className="h-1.5 w-8 bg-[#F36F21]/40 rounded-full blur-xs opacity-60 mt-1"></div>
            </div>

            <div className="w-full glassmorphism rounded-2xl p-8 shadow-2xl border-t-[8px] border-[#F36F21] relative overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:scale-[1.03] shine-effect animate-pulse-glow">
              {/* Glowing Aura */}
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#F36F21]/20 rounded-full blur-2xl"></div>
              <div className="absolute -right-6 -bottom-6 text-[120px] font-black font-display text-[#F36F21]/10 pointer-events-none select-none">1</div>

              <div className="flex flex-col items-center text-center">
                {/* Profile Image */}
                <div className="relative mb-5">
                  <img
                    src={p1.avatar}
                    alt="Rank 1 Avatar"
                    className="w-24 h-24 rounded-full object-cover orange-border shadow-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p1.name)}&background=F36F21&color=fff`;
                    }}
                  />
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#F36F21] text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white shadow-md">1</div>
                </div>

                <h3 id="p1-name" className="font-display font-black text-xl text-[#F36F21] tracking-tight">{p1.name}</h3>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mt-1.5 border uppercase tracking-wide ${p1.badgeBg}`}>
                  {p1.title}
                </div>

                {/* Stats breakdown */}
                <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-5 border-t border-[#F36F21]/10">
                  <div className="text-center">
                    <span className="block text-caption text-text-muted font-semibold uppercase">Score</span>
                    <span id="p1-points" className="font-display font-black text-[#F36F21] text-xl">{p1.points}</span>
                  </div>
                  <div className="text-center border-l border-[#F36F21]/10">
                    <span className="block text-caption text-text-muted font-semibold uppercase">Solved</span>
                    <span id="p1-solved" className="font-display font-black text-brand-blue text-xl">{p1.solved}</span>
                  </div>
                </div>

                {/* Performance ring */}
                <div className="w-full mt-4 bg-[#F36F21]/10 rounded-lg p-2.5 flex items-center justify-between text-xs border border-[#F36F21]/20">
                  <span className="text-[#F36F21] font-bold">{p1.performanceLabel}</span>
                  {p1.hasFlame ? (
                    <span className="font-bold text-[#F36F21] flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs icon-fill">local_fire_department</span> {p1.performanceVal}
                    </span>
                  ) : (
                    <span className="font-bold text-[#F36F21]">{p1.performanceVal}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Rank 3: Blue (Least prominent of the top three) */}
          <div className="flex flex-col items-center order-3 animate-float-medium" style={{ animationDelay: '1s' }}>
            {/* Floating Badge for Top 3 (Blue) */}
            <div className="text-brand-blue animate-crown mb-2 relative z-10 flex flex-col items-center" style={{ animationDelay: '0.6s' }}>
              <span className="material-symbols-outlined text-[30px] icon-fill text-[#12284C] drop-shadow-[0_4px_8px_rgba(18,40,76,0.2)]">workspace_premium</span>
              <div className="h-1 w-5 bg-[#12284C]/30 rounded-full blur-xs opacity-40 mt-1"></div>
            </div>

            <div className="w-full glassmorphism rounded-2xl p-5 shadow-md border-t-[5px] border-[#12284C] relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-100">
              {/* Decorative background rank */}
              <div className="absolute -right-6 -bottom-6 text-[100px] font-black font-display text-[#12284C]/5 pointer-events-none select-none">3</div>

              {/* Profile Image & Badge */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={p3.avatar}
                    alt="Rank 3 Avatar"
                    className="w-16 h-16 rounded-full object-cover blue-border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p3.name)}&background=12284C&color=fff`;
                    }}
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#12284C] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 border-white shadow-md">3</div>
                </div>

                <h3 id="p3-name" className="font-display font-bold text-md text-[#12284C]">{p3.name}</h3>
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold mt-1.5 border uppercase ${p3.badgeBg}`}>
                  {p3.title}
                </div>

                {/* Stats breakdown */}
                <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <span className="block text-caption text-text-muted font-semibold uppercase">Score</span>
                    <span id="p3-points" className="font-display font-black text-[#12284C] text-md">{p3.points}</span>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <span className="block text-caption text-text-muted font-semibold uppercase">Solved</span>
                    <span id="p3-solved" className="font-display font-black text-[#12284C] text-md">{p3.solved}</span>
                  </div>
                </div>

                {/* Performance ring */}
                <div className="w-full mt-4 bg-[#12284C]/5 rounded-lg p-2.5 flex items-center justify-between text-xs border border-[#12284C]/10">
                  <span className="text-text-muted">{p3.performanceLabel}</span>
                  {p3.hasFlame ? (
                    <span className="font-bold text-[#12284C] flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs icon-fill">local_fire_department</span> {p3.performanceVal}
                    </span>
                  ) : (
                    <span className="font-bold text-[#12284C]">{p3.performanceVal}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current User Rank Section: Simplified, Premium & Ultra-Clean */}
        <div className="w-full max-w-5xl mx-auto mb-10 px-0 sm:px-4">
          <div className="bg-gradient-to-r from-brand-blue to-[#1a386b] rounded-2xl shadow-xl overflow-hidden relative border border-primary/20 animate-pulse-glow">
            <div className="p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* User Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AHOXywsx8o4BvW3D2tXv5_X0a_xZ0x_xZ0x_xZ0x_xZ0x_xZ0x_xZ0x_xZ0x_xZ0"}
                    alt="Your Avatar"
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-primary object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=You&background=F36F21&color=fff';
                    }}
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] text-primary font-black uppercase tracking-wider">Your Stats</span>
                  <h2 className="font-display font-extrabold text-white text-lg md:text-xl tracking-tight leading-tight">
                    {user?.name ? `${user.name} (You)` : "Nguyen Van A (You)"}
                  </h2>
                  {/* Simplified horizontal badges for Rank and Score */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-lg text-xs font-black">
                      Rank #142
                    </span>
                    <span className="bg-white/10 text-white border border-white/10 px-2 py-0.5 rounded-lg text-xs font-bold">
                      Score: 4,520 pts
                    </span>
                  </div>
                </div>
              </div>

              {/* Gamified Progression & Motivation Bar */}
              <div className="flex-grow max-w-sm w-full">
                <div className="flex justify-between items-center text-xs text-white/80 font-bold mb-1.5">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary icon-fill">arrow_circle_up</span> Overtake Next Rank
                  </span>
                  <span className="text-primary font-black">80 pts left</span>
                </div>
                {/* Custom sleek progress bar */}
                <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-gradient-to-r from-[#ff6000] to-[#ff8c42] rounded-full shadow-[0_0_8px_rgba(243,111,33,0.5)]" style={{ width: '78%' }}></div>
                </div>
                <p className="text-[11px] text-white/60 mt-1.5 italic">Need 80 pts to pass #141 David Lee! Solve 1 Medium problem to defeat them.</p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 w-full md:w-auto text-center">
                <Link
                  to="/problems"
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-primary hover:bg-primary-hover text-white font-bold text-xs tracking-wide uppercase px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-primary/20 group"
                >
                  Fight Now!
                  <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">swords</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table Section for Rank 4+ */}
        <div className="bg-surface rounded-xl shadow-[0_4px_20px_rgba(18,40,76,0.05)] border border-gray-200 overflow-hidden mb-12 max-w-5xl mx-auto w-full">
          {/* Live Counter in Header */}
          <div className="px-6 py-4 bg-surface-gray border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm font-bold text-brand-blue">Global Competitors</span>
            <span id="result-count" className="bg-brand-blue/5 text-brand-blue font-bold px-3 py-1 rounded-full text-xs">
              Showing {filteredUsers.length} Player{filteredUsers.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-surface-gray text-text-muted font-label text-label-md border-b border-gray-200">
                  <th className="p-4 font-semibold w-20 text-center">Rank</th>
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold text-right pr-8">Score</th>
                </tr>
              </thead>
              <tbody id="leaderboard-list" className="text-body-md font-body text-text-main divide-y divide-gray-100">
                {filteredUsers.map((u) => (
                  <tr
                    key={u.name}
                    className="hover:bg-surface-gray/50 transition-colors group cursor-pointer ranking-row"
                    data-name={u.name}
                  >
                    <td className="p-4 text-center font-bold text-text-muted group-hover:text-text-main text-lg w-20">
                      <div className="flex flex-col items-center justify-center">
                        <span>{u.rank}</span>
                        {u.rankChange.type === 'up' && (
                          <span className="text-[10px] text-brand-green font-bold flex items-center gap-0.5">
                            <span className="text-[8px]">▲</span> {u.rankChange.val}
                          </span>
                        )}
                        {u.rankChange.type === 'down' && (
                          <span className="text-[10px] text-red-500 font-bold flex items-center gap-0.5">
                            <span className="text-[8px]">▼</span> {u.rankChange.val}
                          </span>
                        )}
                        {u.rankChange.type === 'same' && (
                          <span className="text-[10px] text-slate-400 font-bold flex items-center gap-0.5">▬</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={u.avatar}
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full object-cover border border-outline-variant/50"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=cbd5e1&color=64748b`;
                          }}
                        />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-text-main group-hover:text-primary transition-colors">{u.name}</span>
                            <span className={`${u.titleClass} px-1.5 py-0.5 rounded text-[9px] font-bold uppercase`}>{u.title}</span>
                          </div>
                          <span className="text-xs text-text-muted mt-0.5">
                            {u.solved} solved • Accuracy: {u.accuracy}% • Language: {u.language}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right pr-8 font-bold text-brand-blue text-lg">
                      {u.points} <span className="text-xs text-text-muted font-normal">pts</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-surface flex items-center justify-between">
            <span className="text-sm text-text-muted hidden sm:inline">Showing 4 to 10 of 2,450 users</span>
            <div className="flex items-center gap-1 sm:ml-auto">
              <button className="w-8 h-8 flex items-center justify-center rounded text-text-muted hover:bg-surface-gray hover:text-primary transition-colors disabled:opacity-50">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-medium text-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded text-text-main hover:bg-surface-gray transition-colors font-medium text-sm">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded text-text-main hover:bg-surface-gray transition-colors font-medium text-sm">3</button>
              <span className="w-8 h-8 flex items-center justify-center text-text-muted">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded text-text-muted hover:bg-surface-gray hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
