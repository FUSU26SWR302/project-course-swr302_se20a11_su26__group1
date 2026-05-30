import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { ContestSidebar } from './ContestSidebar';

export const ContestLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contestId = id || '42';
  const location = useLocation();

  // Determine active tab from current path
  let activeTab: 'overview' | 'problems' | 'submissions' | 'ranking' = 'overview';
  const pathname = location.pathname;
  if (pathname.includes('/problems')) {
    activeTab = 'problems';
  } else if (pathname.includes('/submissions')) {
    activeTab = 'submissions';
  } else if (pathname.includes('/ranking')) {
    activeTab = 'ranking';
  }

  // Ticking countdown timer shared across all detail pages
  const [timeLeft, setTimeLeft] = useState<string>('01:24:55');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const parts = prev.split(':').map(Number);
        let hr = parts[0];
        let min = parts[1];
        let sec = parts[2];

        if (sec > 0) {
          sec--;
        } else {
          sec = 59;
          if (min > 0) {
            min--;
          } else {
            min = 59;
            if (hr > 0) hr--;
          }
        }

        const pad = (n: number) => String(n).padStart(2, '0');
        return `${pad(hr)}:${pad(min)}:${pad(sec)}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Password registration interactive states for Overview page
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setRegistrationMessage({
        type: 'error',
        text: 'Please enter the contest password',
      });
      return;
    }

    setRegistrationMessage({
      type: 'success',
      text: 'Successfully registered for the contest!',
    });
    setPassword('');

    setTimeout(() => {
      setRegistrationMessage(null);
    }, 3000);
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row w-full max-w-[1920px] mx-auto text-left relative z-10">
      {/* Main content column on the left (85%) */}
      <div className="w-full md:w-[85%] flex flex-col bg-surface-gray min-w-0">
        <Outlet />
      </div>

      {/* Shared right sidebar (15%) */}
      <ContestSidebar contestId={contestId} activeTab={activeTab} timeLeft={timeLeft}>
        {activeTab === 'overview' && (
          <form onSubmit={handleRegister} className="mt-8">
            <div className="mb-4">
              <label className="block text-label-md font-medium text-text-muted mb-2 tracking-wider uppercase text-center" htmlFor="contest-password">
                Contest Password
              </label>
              <input
                className="w-full bg-surface border border-gray-300 rounded-lg px-4 py-2 text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                id="contest-password"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-primary text-white text-label-md font-label-md rounded-xl font-bold hover:bg-primary-hover transition-all duration-200 shadow-sm py-2"
              type="submit"
            >
              Register Now
            </button>
            {registrationMessage && (
              <div
                className={`mt-4 text-xs font-bold p-2.5 rounded-lg text-center ${
                  registrationMessage.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {registrationMessage.text}
              </div>
            )}
          </form>
        )}
      </ContestSidebar>
    </div>
  );
};
