import React from 'react';
import { Link } from 'react-router-dom';

interface ContestSidebarProps {
  contestId: string;
  activeTab: 'overview' | 'problems' | 'submissions' | 'ranking';
  timeLeft: string;
  children?: React.ReactNode;
}

export const ContestSidebar: React.FC<ContestSidebarProps> = ({ contestId, activeTab, timeLeft, children }) => {
  return (
    <aside className="w-full md:w-[15%] min-w-[280px] bg-white border-l border-gray-200 flex flex-col relative sticky top-16 h-[calc(100vh-64px)] z-20 shrink-0">
      <div className="flex-grow overflow-y-auto py-8 px-6">
        {/* Contest Header / Timer */}
        <div className="mb-10 text-center">
          <h2 className="text-xl font-black text-brand-blue mb-2 tracking-tight">Contest #{contestId}</h2>
          <div className="bg-surface-gray rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-xs font-label text-text-muted uppercase tracking-wider mb-1">Ends In</p>
            <div className="font-display text-2xl font-bold text-primary tabular-nums tracking-tight">{timeLeft}</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 font-label text-sm">
          <Link
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'text-primary font-bold border-l-4 border-primary bg-primary-light/30 shadow-sm translate-x-1'
                : 'text-text-muted font-medium hover:bg-surface-gray'
            }`}
            to={`/contests/${contestId}`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'overview' ? 'icon-fill' : ''}`}>dashboard</span>
            Overview
          </Link>
          <Link
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
              activeTab === 'problems'
                ? 'text-primary font-bold border-l-4 border-primary bg-primary-light/30 shadow-sm translate-x-1'
                : 'text-text-muted font-medium hover:bg-surface-gray'
            }`}
            to={`/contests/${contestId}/problems`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'problems' ? 'icon-fill' : ''}`}>extension</span>
            Problems
          </Link>
          <Link
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
              activeTab === 'submissions'
                ? 'text-primary font-bold border-l-4 border-primary bg-primary-light/30 shadow-sm translate-x-1'
                : 'text-text-muted font-medium hover:bg-surface-gray'
            }`}
            to={`/contests/${contestId}/submissions`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'submissions' ? 'icon-fill' : ''}`}>list_alt</span>
            Submissions
          </Link>
          <Link
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
              activeTab === 'ranking'
                ? 'text-primary font-bold border-l-4 border-primary bg-primary-light/30 shadow-sm translate-x-1'
                : 'text-text-muted font-medium hover:bg-surface-gray'
            }`}
            to={`/contests/${contestId}/ranking`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'ranking' ? 'icon-fill' : ''}`}>leaderboard</span>
            Rankings
          </Link>
        </nav>

        {children}
      </div>
    </aside>
  );
};
