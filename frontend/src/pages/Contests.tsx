import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Contests: React.FC = () => {
  // --- States for Interactivity ---
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [accessFilter, setAccessFilter] = useState('All');

  // --- Relative Countdown Timer Setup ---
  // Calculates a relative target exactly 3 days, 14 hours, 45 minutes, 20 seconds from launch
  const [targetTime] = useState(() => Date.now() + (3 * 24 * 60 * 60 + 14 * 60 * 60 + 45 * 60 + 20) * 1000);
  const [timeLeft, setTimeLeft] = useState({
    days: '03',
    hours: '14',
    mins: '45',
    secs: '20',
    isLive: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, isLive: true }));
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          mins: String(mins).padStart(2, '0'),
          secs: String(secs).padStart(2, '0'),
          isLive: false
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  // --- Live Ticket Registrants Simulation ---
  const [registrants, setRegistrants] = useState(9425);
  const maxRegistrants = 10000;

  useEffect(() => {
    const simulateRegistrations = () => {
      setRegistrants(prev => {
        if (prev < maxRegistrants - 2) {
          const increment = Math.floor(Math.random() * 3) + 1;
          return Math.min(prev + increment, maxRegistrants - 2);
        }
        return prev;
      });
    };

    const interval = setInterval(simulateRegistrations, 15000);
    return () => clearInterval(interval);
  }, []);

  // --- Registration & Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContestTitle, setModalContestTitle] = useState('');
  const [modalTicketId, setModalTicketId] = useState('');
  const [registeredButtons, setRegisteredButtons] = useState<Record<string, boolean>>({});
  const [heroRegisterCount, setHeroRegisterCount] = useState(0);

  const handleRegister = (contestTitle: string, buttonId: string) => {
    setModalContestTitle(contestTitle);
    
    // Generate a random high-fidelity ticket id
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomChar = chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)];
    setModalTicketId(`NS-${randomNum}-${randomChar}`);

    setIsModalOpen(true);
    setRegisteredButtons(prev => ({ ...prev, [buttonId]: true }));

    if (contestTitle === 'Nonstop Spring Clash 2026') {
      setHeroRegisterCount(1);
    }
  };

  // --- Filtering Logic ---
  const isCardVisible = (title: string, status: string) => {
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchesStatus = statusFilter === 'All' || status === statusFilter;
    return matchesSearch && matchesStatus;
  };

  const matchCount = [
    isCardVisible("Weekly Algorithm Sprint #45", "Ongoing"),
    isCardVisible("Data Structures Challenge Series", "Ongoing"),
    isCardVisible("Code Masters Championship 2026", "Upcoming"),
    isCardVisible("Beginner's Python Bash", "Upcoming"),
    isCardVisible("SQL Mastery Arena", "Upcoming"),
    isCardVisible("Intro to DP Challenge", "Ended"),
    isCardVisible("Advanced Graph Theory Scrimmage", "Ended")
  ].filter(Boolean).length;

  const totalRegistrants = registrants + heroRegisterCount;
  const percentage = (totalRegistrants / maxRegistrants) * 100;

  // Image fallback handler
  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://ui-avatars.com/api/?name=You&background=12284C&color=fff';
  };

  return (
    <main className="relative z-10 flex-grow w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-12 flex flex-col gap-6 mt-4">
      {/* Custom Styles for Glow and Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .ambient-shadow {
            box-shadow: 0 4px 20px rgba(18, 40, 76, 0.05);
        }
        .ambient-shadow-hover:hover {
            box-shadow: 0 8px 30px rgba(18, 40, 76, 0.1) !important;
        }
        @keyframes pulse-glow-orange {
            0%, 100% { box-shadow: 0 0 12px rgba(243, 111, 33, 0.4); }
            50% { box-shadow: 0 0 24px rgba(243, 111, 33, 0.75); }
        }
        @keyframes pulse-glow-green {
            0%, 100% { box-shadow: 0 0 8px rgba(70, 160, 64, 0.3); }
            50% { box-shadow: 0 0 18px rgba(70, 160, 64, 0.75); }
        }
        @keyframes floating {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .pulse-glow-orange {
            animation: pulse-glow-orange 2s infinite;
        }
        .pulse-glow-green {
            animation: pulse-glow-green 1.5s infinite;
        }
        .animate-float {
            animation: floating 3.5s ease-in-out infinite;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .fade-in {
            animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />

      {/* Glowing Backdrop Circles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-[#3b82f6]/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Hero Promo Banner: Upcoming Hot Contest */}
      <section className="relative z-10 bg-gradient-to-br from-brand-blue via-[#173059] to-brand-blue rounded-2xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-white shadow-xl overflow-hidden border border-white/10">
        {/* Tech Graphics Backdrop */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
          <span className="material-symbols-outlined absolute -right-16 -top-16 text-[320px] text-primary/30 font-thin select-none">emoji_events</span>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(243,111,33,0.15),transparent_60%)]"></div>
        </div>

        {/* Details */}
        <div className="relative z-10 flex flex-col gap-5 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-primary text-white font-extrabold text-[10px] md:text-xs uppercase tracking-widest px-3 py-1 rounded-full animate-pulse shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Live Spotlight
            </span>
            <span className="text-[10px] md:text-xs text-white/70 bg-white/10 px-2.5 py-1 rounded-full font-medium">Spring Season 2026</span>
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-black mb-2 leading-tight tracking-tight bg-gradient-to-r from-white via-white to-primary-light bg-clip-text text-transparent">
              Nonstop Spring Clash 2026
            </h2>
            <p className="font-body text-sm md:text-base text-white/80 max-w-2xl mt-2 leading-relaxed">
              Compete with over <span className="text-primary font-bold">10,000+ developers</span> worldwide. Solve 5 algorithmic challenges, win cash prizes, and lock in your legendary gold profile badge.
            </p>
          </div>

          {/* Glassmorphism Stats Cards */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-lg mt-1">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-primary text-2xl mb-1 icon-fill">emoji_events</span>
              <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Prize Pool</span>
              <span className="text-xs md:text-base font-bold text-white mt-0.5">10M VND</span>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-brand-green text-2xl mb-1">timer</span>
              <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Duration</span>
              <span className="text-xs md:text-base font-bold text-white mt-0.5">3 Hours</span>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-blue-400 text-2xl mb-1">quiz</span>
              <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Challenges</span>
              <span className="text-xs md:text-base font-bold text-white mt-0.5">5 Tasks</span>
            </div>
          </div>
        </div>

        {/* Countdown & Action Box */}
        <div className="relative z-10 w-full lg:w-96 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-5 items-center text-center shadow-2xl">
          <div className="w-full">
            <h4 className="text-[10px] font-bold text-primary-light uppercase tracking-wider mb-3">Clash Begins In</h4>
            {/* Countdown Clock */}
            {timeLeft.isLive ? (
              <span className="text-primary font-bold text-xl">Contest is LIVE!</span>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <div className="flex flex-col items-center bg-brand-blue/60 border border-white/10 rounded-xl p-2.5 min-w-[64px]">
                  <span className="text-2xl font-black font-display text-white">{timeLeft.days}</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Days</span>
                </div>
                <span className="text-xl font-bold text-primary/80 animate-pulse">:</span>
                <div className="flex flex-col items-center bg-brand-blue/60 border border-white/10 rounded-xl p-2.5 min-w-[64px]">
                  <span className="text-2xl font-black font-display text-white">{timeLeft.hours}</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Hours</span>
                </div>
                <span className="text-xl font-bold text-primary/80 animate-pulse">:</span>
                <div className="flex flex-col items-center bg-brand-blue/60 border border-white/10 rounded-xl p-2.5 min-w-[64px]">
                  <span className="text-2xl font-black font-display text-white">{timeLeft.mins}</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Mins</span>
                </div>
                <span className="text-xl font-bold text-primary/80 animate-pulse">:</span>
                <div className="flex flex-col items-center bg-brand-blue/60 border border-white/10 rounded-xl p-2.5 min-w-[64px]">
                  <span className="text-2xl font-black font-display text-primary">{timeLeft.secs}</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Secs</span>
                </div>
              </div>
            )}
          </div>

          {/* Registration Progress */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-white/70">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">groups</span>
                <span>{totalRegistrants.toLocaleString()}</span> / 10,000 Slots
              </span>
              <span className="text-primary font-bold">{percentage.toFixed(1)}% Full</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/5">
              <div 
                className="bg-gradient-to-r from-primary to-orange-400 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Action Button */}
          {registeredButtons['hero-register-btn'] ? (
            <button 
              disabled 
              className="w-full py-4 px-6 rounded-xl bg-brand-green text-white font-extrabold text-base transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Registered ✔
            </button>
          ) : (
            <button 
              onClick={() => handleRegister('Nonstop Spring Clash 2026', 'hero-register-btn')} 
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-orange-500 hover:from-primary-hover hover:to-orange-600 text-white font-extrabold text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg pulse-glow-orange flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined font-bold">how_to_reg</span> Register For Free
            </button>
          )}
        </div>
      </section>

      {/* Combat Layout: Main List & Profile Sidebar */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left: Main Contests List Explorer (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Page Title Arena Indicator */}
          <div className="flex flex-col gap-2 text-left">
            <div className="inline-flex items-center gap-1.5 bg-primary-light border border-primary/20 px-3.5 py-1.5 rounded-full text-primary font-extrabold text-xs uppercase tracking-wider w-max shadow-sm">
              <span className="material-symbols-outlined text-xs icon-fill">swords</span> Combat Arena
            </div>
            <h1 className="text-display-lg-mobile md:text-display-lg font-display font-black leading-none">
              <span className="bg-gradient-to-r from-[#0114a7] to-[#2563eb] bg-clip-text text-transparent">Coding </span>
              <span className="bg-gradient-to-r from-[#ff6000] to-[#ff8c42] bg-clip-text text-transparent">Contests</span>
            </h1>
            <p className="font-body text-base text-text-muted max-w-2xl leading-relaxed mt-1">
              Push your logical limits, out-code competitors in real-time, and rise up the global rankings.
            </p>
          </div>

          {/* Explorer Control Bar: Search & Tag Chips */}
          <div className="flex flex-col gap-4 bg-surface p-5 rounded-2xl border border-gray-100 shadow-md">
            {/* Row 1: Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="relative w-full md:flex-1">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">search</span>
                <input 
                  id="search-input" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-surface-gray focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all font-body text-sm text-text-main placeholder-text-muted shadow-inner" 
                  placeholder="Search contests by title..." 
                  type="text" 
                />
              </div>
              
              {/* Advanced Category Selection Dropdown */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <select 
                  id="status-filter" 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full md:w-44 border border-gray-200 rounded-xl px-3 py-2.5 bg-surface font-semibold text-xs text-text-main focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary"
                >
                  <option value="All">Status: All</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ended">Ended</option>
                </select>
                <select 
                  id="access-filter" 
                  value={accessFilter}
                  onChange={(e) => setAccessFilter(e.target.value)}
                  className="w-full md:w-40 border border-gray-200 rounded-xl px-3 py-2.5 bg-surface font-semibold text-xs text-text-main focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary"
                >
                  <option value="All">Access: All</option>
                  <option value="Public">Public</option>
                  <option value="Lock">Private (Password)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contests Card Container */}
          <section id="contests-grid" className="flex flex-col gap-4 text-left">
            
            {/* Ongoing Contest 1 */}
            {isCardVisible("Weekly Algorithm Sprint #45", "Ongoing") && (
              <article className="contest-card bg-surface rounded-2xl border border-gray-100 hover:border-brand-green/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all shadow-md ambient-shadow-hover group fade-in">
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-brand-green text-white font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider pulse-glow-green">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> Ongoing
                    </span>
                    <span className="text-xs bg-brand-blue-light/5 text-brand-blue font-bold px-2 py-0.5 rounded">Sprint League</span>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg md:text-xl text-brand-blue group-hover:text-primary transition-colors">
                      Weekly Algorithm Sprint #45
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted font-semibold text-xs mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>Oct 24, 09:00 AM – Oct 31, 2026</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">timer</span>
                        <span>7 Days Remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-bold">
                    <span className="material-symbols-outlined text-[18px] text-[#46A040] icon-fill">group</span>
                    <span>1,248 Competitors</span>
                  </div>
                  <Link to="/contests/1" className="px-5 py-2.5 bg-brand-green hover:bg-green-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all transform hover:-translate-y-0.5">
                    Enter Arena
                  </Link>
                </div>
              </article>
            )}

            {/* Ongoing Contest 2 */}
            {isCardVisible("Data Structures Challenge Series", "Ongoing") && (
              <article className="contest-card bg-surface rounded-2xl border border-gray-100 hover:border-brand-green/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all shadow-md ambient-shadow-hover group fade-in">
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-brand-green text-white font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider pulse-glow-green">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> Ongoing
                    </span>
                    <span className="text-xs bg-brand-blue-light/5 text-brand-blue font-bold px-2 py-0.5 rounded">Structure Series</span>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg md:text-xl text-brand-blue group-hover:text-primary transition-colors">
                      Data Structures Challenge Series
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted font-semibold text-xs mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>Oct 28, 08:00 AM – Nov 04, 2026</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">timer</span>
                        <span>4 Days Remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-bold">
                    <span className="material-symbols-outlined text-[18px] text-[#46A040] icon-fill">group</span>
                    <span>856 Competitors</span>
                  </div>
                  <Link to="/contests/1" className="px-5 py-2.5 bg-brand-green hover:bg-green-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all transform hover:-translate-y-0.5">
                    Enter Arena
                  </Link>
                </div>
              </article>
            )}

            {/* Upcoming Contest 1 */}
            {isCardVisible("Code Masters Championship 2026", "Upcoming") && (
              <article className="contest-card bg-surface rounded-2xl border border-gray-100 hover:border-primary/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all shadow-md ambient-shadow-hover group fade-in">
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-warning-container text-on-warning-container font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[12px] font-bold">schedule</span> Upcoming
                    </span>
                    <span className="text-xs bg-primary-light text-primary font-bold px-2 py-0.5 rounded">Mega Prize</span>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg md:text-xl text-brand-blue group-hover:text-primary transition-colors">
                      Code Masters Championship 2026
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted font-semibold text-xs mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>Nov 15, 10:00 AM – Nov 22, 2026</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">timer</span>
                        <span>Starts in 5 days</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-bold">
                    <span className="material-symbols-outlined text-[18px] text-primary">groups</span>
                    <span>3,500+ Registered</span>
                  </div>
                  {registeredButtons['btn-up-1'] ? (
                    <button 
                      disabled
                      className="px-5 py-2.5 bg-brand-green text-white font-extrabold text-xs rounded-xl shadow-md transition-all border border-brand-green/20"
                    >
                      Registered ✔
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleRegister('Code Masters Championship 2026', 'btn-up-1')} 
                      className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-extrabold text-xs rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </article>
            )}

            {/* Upcoming Contest 2 */}
            {isCardVisible("Beginner's Python Bash", "Upcoming") && (
              <article className="contest-card bg-surface rounded-2xl border border-gray-100 hover:border-primary/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all shadow-md ambient-shadow-hover group fade-in">
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-warning-container text-on-warning-container font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[12px] font-bold">schedule</span> Upcoming
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded">Starter Friendly</span>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg md:text-xl text-brand-blue group-hover:text-primary transition-colors">
                      Beginner's Python Bash
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted font-semibold text-xs mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>Nov 20, 09:00 AM – Nov 21, 2026</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">timer</span>
                        <span>Starts in 7 days</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-bold">
                    <span className="material-symbols-outlined text-[18px] text-primary">groups</span>
                    <span>1,200+ Registered</span>
                  </div>
                  {registeredButtons['btn-up-2'] ? (
                    <button 
                      disabled
                      className="px-5 py-2.5 bg-brand-green text-white font-extrabold text-xs rounded-xl shadow-md transition-all border border-brand-green/20"
                    >
                      Registered ✔
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleRegister("Beginner's Python Bash", 'btn-up-2')} 
                      className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-extrabold text-xs rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </article>
            )}

            {/* Upcoming Contest 3 */}
            {isCardVisible("SQL Mastery Arena", "Upcoming") && (
              <article className="contest-card bg-surface rounded-2xl border border-gray-100 hover:border-primary/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all shadow-md ambient-shadow-hover group fade-in">
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-warning-container text-on-warning-container font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[12px] font-bold">schedule</span> Upcoming
                    </span>
                    <span className="text-xs bg-brand-green/10 text-brand-green font-bold px-2 py-0.5 rounded">Database Skill</span>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg md:text-xl text-brand-blue group-hover:text-primary transition-colors">
                      SQL Mastery Arena
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted font-semibold text-xs mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>Nov 25, 02:00 PM – Nov 25, 2026</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">timer</span>
                        <span>Starts in 12 days</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-bold">
                    <span className="material-symbols-outlined text-[18px] text-primary">groups</span>
                    <span>480+ Registered</span>
                  </div>
                  {registeredButtons['btn-up-3'] ? (
                    <button 
                      disabled
                      className="px-5 py-2.5 bg-brand-green text-white font-extrabold text-xs rounded-xl shadow-md transition-all border border-brand-green/20"
                    >
                      Registered ✔
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleRegister('SQL Mastery Arena', 'btn-up-3')} 
                      className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-extrabold text-xs rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </article>
            )}

            {/* Ended Contest 1 */}
            {isCardVisible("Intro to DP Challenge", "Ended") && (
              <article className="contest-card bg-surface/80 rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all shadow-md ambient-shadow-hover group fade-in">
                <div className="flex-1 flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-error/10 text-error font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[12px] font-bold">done</span> Ended
                    </span>
                    <span className="text-xs bg-gray-100 text-text-muted px-2 py-0.5 rounded font-bold">Past Arena</span>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-blue group-hover:text-primary transition-colors">
                      Intro to DP Challenge
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted font-semibold text-xs mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>Oct 01 – Oct 15, 2026</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">group</span>
                        <span>4,102 Participated</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Top 3 Winners Horizon Podium Showcase */}
                  <div className="flex flex-wrap items-center gap-3.5 bg-gradient-to-r from-gray-50 to-[#f8f9fa] rounded-2xl p-5 border border-gray-200/60 mt-1">
                    {/* 1st */}
                    <div className="flex items-center gap-2.5 bg-amber-50 border-2 border-amber-300 rounded-full pl-2 pr-4 py-1.5 shadow-md hover:scale-105 transition-all">
                      <span className="w-7 h-7 rounded-full bg-amber-400 text-white font-black text-xs flex items-center justify-center border border-amber-200 shadow-inner">👑</span>
                      <img 
                        alt="AlexChen_99" 
                        className="w-7 h-7 rounded-full object-cover border border-amber-300" 
                        onError={handleAvatarError} 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp40daqj0h2umuKNNDeVOusREXNgw_12QV4qru-J_UuA4ZdCH-_duC1RsH1iBlluVAhCv_LX4hE1Tn_XF1TlBYCEPgN93KA_POfYKJnd5Ge9nO-7Itcx87rECEaQsnoCQEkKM9kmZCxKC1XEboRfAKWgdDMiYMeE_VSZvWolzI-cDOWC-9CsKWiSpExgxqf-WZmWUFwK3APjd9pwvw33_QyWVOzOIyUwSBPPRILirJJ-8WCBLfWEVlQv4EjnKXB8iJupr4PdSrNb4" 
                      />
                      <span className="text-xs font-black text-amber-900">AlexChen_99</span>
                    </div>
                    {/* 2nd */}
                    <div className="flex items-center gap-2.5 bg-slate-50 border-2 border-slate-300 rounded-full pl-2 pr-4 py-1.5 shadow-md hover:scale-105 transition-all">
                      <span className="w-7 h-7 rounded-full bg-slate-400 text-white font-black text-xs flex items-center justify-center border border-slate-200 shadow-inner">🥈</span>
                      <img 
                        alt="SarahCodes" 
                        className="w-7 h-7 rounded-full object-cover border border-slate-300" 
                        onError={handleAvatarError} 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDshCfUQ0QMSGGDqtuWcDFX_490qXob69K70L4NJIXvHDEJEkly5hmHpkJQE0VYJUOm0EEQ69gZ2dg60jKuWAoIKCJb2AFPciDf6D9Lo74JWBRjCxKMZwRGLkEE4MPzCAh6Jk8ALAxsanK7LWgMm4XlZRsnZdTNIdAHCQa0JQbR4HkQW9HGRQaeZF_N6xewqpVJTKVcdSEEqplIyAFUsrbwSI1cEmpkKdrF1rHrpfozZaHAncAw4DCxbCdRdUix9mXBCOW4GQ0HLuI" 
                      />
                      <span className="text-xs font-black text-slate-800">SarahCodes</span>
                    </div>
                    {/* 3rd */}
                    <div className="flex items-center gap-2.5 bg-orange-50 border-2 border-orange-300 rounded-full pl-2 pr-4 py-1.5 shadow-md hover:scale-105 transition-all">
                      <span className="w-7 h-7 rounded-full bg-orange-400 text-white font-black text-xs flex items-center justify-center border border-orange-200 shadow-inner">🥉</span>
                      <img 
                        alt="DevMaster" 
                        className="w-7 h-7 rounded-full object-cover border border-orange-300" 
                        onError={handleAvatarError} 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkHZSQqpXmDrQL_qKJPMdo5wb3oCBOUVxsVVnbnzufzk5gzwHETA-lt9WwTcAtywJ6U0aySuqOREpGq64S_9TRgVTVsq--Q0UM8V07CBBMP4iHOzmx4kiiL6WTbqZwH9-0TefB_jdkjq8YuEB0BwpTHStm6F6Kg4v-hhq8huMKSnePfsgPAjdw0BgBc6sjjREiET3WMLYghC9EvUmyLutnQpH9Khc3MEppZTiN2O4rMR_iCiHJhDR32g7srn3JC3brO2IvNvVFOsM" 
                      />
                      <span className="text-xs font-black text-orange-900">DevMaster</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8 shrink-0">
                  <span className="text-xs text-text-muted font-bold">100 XP Awarded</span>
                  <Link to="/contests/1" className="px-5 py-3 bg-surface-gray hover:bg-gray-200 text-text-main border border-gray-200 font-extrabold text-xs rounded-xl shadow-sm transition-all">
                    View Standings
                  </Link>
                </div>
              </article>
            )}

            {/* Ended Contest 2 */}
            {isCardVisible("Advanced Graph Theory Scrimmage", "Ended") && (
              <article className="contest-card bg-surface/80 rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all shadow-md ambient-shadow-hover group fade-in">
                <div className="flex-1 flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-error/10 text-error font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[12px] font-bold">done</span> Ended
                    </span>
                    <span className="text-xs bg-gray-100 text-text-muted px-2 py-0.5 rounded font-bold">Past Arena</span>
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-blue group-hover:text-primary transition-colors">
                      Advanced Graph Theory Scrimmage
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-muted font-semibold text-xs mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>Sep 23 – Sep 30, 2026</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">group</span>
                        <span>2,845 Participated</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Top 3 Winners Horizon Podium Showcase */}
                  <div className="flex flex-wrap items-center gap-3.5 bg-gradient-to-r from-gray-50 to-[#f8f9fa] rounded-2xl p-5 border border-gray-200/60 mt-1">
                    {/* 1st */}
                    <div className="flex items-center gap-2.5 bg-amber-50 border-2 border-amber-300 rounded-full pl-2 pr-4 py-1.5 shadow-md hover:scale-105 transition-all">
                      <span className="w-7 h-7 rounded-full bg-amber-400 text-white font-black text-xs flex items-center justify-center border border-amber-200 shadow-inner">👑</span>
                      <img 
                        alt="GraphKing" 
                        className="w-7 h-7 rounded-full object-cover border border-amber-300" 
                        onError={handleAvatarError} 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkHZSQqpXmDrQL_qKJPMdo5wb3oCBOUVxsVVnbnzufzk5gzwHETA-lt9WwTcAtywJ6U0aySuqOREpGq64S_9TRgVTVsq--Q0UM8V07CBBMP4iHOzmx4kiiL6WTbqZwH9-0TefB_jdkjq8YuEB0BwpTHStm6F6Kg4v-hhq8huMKSnePfsgPAjdw0BgBc6sjjREiET3WMLYghC9EvUmyLutnQpH9Khc3MEppZTiN2O4rMR_iCiHJhDR32g7srn3JC3brO2IvNvVFOsM" 
                      />
                      <span className="text-xs font-black text-amber-900">GraphKing</span>
                    </div>
                    {/* 2nd */}
                    <div className="flex items-center gap-2.5 bg-slate-50 border-2 border-slate-300 rounded-full pl-2 pr-4 py-1.5 shadow-md hover:scale-105 transition-all">
                      <span className="w-7 h-7 rounded-full bg-slate-400 text-white font-black text-xs flex items-center justify-center border border-slate-200 shadow-inner">🥈</span>
                      <img 
                        alt="AlgoBeast" 
                        className="w-7 h-7 rounded-full object-cover border border-slate-300" 
                        onError={handleAvatarError} 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp40daqj0h2umuKNNDeVOusREXNgw_12QV4qru-J_UuA4ZdCH-_duC1RsH1iBlluVAhCv_LX4hE1Tn_XF1TlBYCEPgN93KA_POfYKJnd5Ge9nO-7Itcx87rECEaQsnoCQEkKM9kmZCxKC1XEboRfAKWgdDMiYMeE_VSZvWolzI-cDOWC-9CsKWiSpExgxqf-WZmWUFwK3APjd9pwvw33_QyWVOzOIyUwSBPPRILirJJ-8WCBLfWEVlQv4EjnKXB8iJupr4PdSrNb4" 
                      />
                      <span className="text-xs font-black text-slate-800">AlgoBeast</span>
                    </div>
                    {/* 3rd */}
                    <div className="flex items-center gap-2.5 bg-orange-50 border-2 border-orange-300 rounded-full pl-2 pr-4 py-1.5 shadow-md hover:scale-105 transition-all">
                      <span className="w-7 h-7 rounded-full bg-orange-400 text-white font-black text-xs flex items-center justify-center border border-orange-200 shadow-inner">🥉</span>
                      <img 
                        alt="CodeQueen" 
                        className="w-7 h-7 rounded-full object-cover border border-amber-300" 
                        onError={handleAvatarError} 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDshCfUQ0QMSGGDqtuWcDFX_490qXob69K70L4NJIXvHDEJEkly5hmHpkJQE0VYJUOm0EEQ69gZ2dg60jKuWAoIKCJb2AFPciDf6D9Lo74JWBRjCxKMZwRGLkEE4MPzCAh6Jk8ALAxsanK7LWgMm4XlZRsnZdTNIdAHCQa0JQbR4HkQW9HGRQaeZF_N6xewqpVJTKVcdSEEqplIyAFUsrbwSI1cEmpkKdrF1rHrpfozZaHAncAw4DCxbCdRdUix9mXBCOW4GQ0HLuI" 
                      />
                      <span className="text-xs font-black text-orange-900">CodeQueen</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8 shrink-0">
                  <span className="text-xs text-text-muted font-bold">120 XP Awarded</span>
                  <Link to="/contests/1" className="px-5 py-3 bg-surface-gray hover:bg-gray-200 text-text-main border border-gray-200 font-extrabold text-xs rounded-xl shadow-sm transition-all">
                    View Standings
                  </Link>
                </div>
              </article>
            )}

            {/* Zero State */}
            {matchCount === 0 && (
              <div id="zero-state" className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-gray-100 shadow-md">
                <span className="material-symbols-outlined text-text-muted text-5xl mb-2">find_in_page</span>
                <h3 className="text-base font-bold text-brand-blue">No Contests Found</h3>
                <p className="text-xs text-text-muted max-w-xs mt-1">Try relaxing your search terms or selecting another category tag.</p>
              </div>
            )}
          </section>
        </div>

        {/* Right: Sidebar Combat Profile Widget (1 col) */}
        <aside className="lg:col-span-1 flex flex-col gap-6 w-full lg:sticky lg:top-20 text-left">
          
          {/* User Combat Profile Widget */}
          <div className="bg-surface rounded-2xl p-5 border border-gray-100 shadow-md flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img 
                alt="User Avatar" 
                className="w-11 h-11 rounded-full border-2 border-primary object-cover" 
                onError={handleAvatarError} 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is" 
              />
              <div>
                <h4 className="text-sm font-bold text-brand-blue">Thanh MiLa</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="inline-flex bg-primary/10 text-primary text-[10px] font-extrabold px-2 py-0.5 rounded">Expert League</span>
                </div>
              </div>
            </div>
            
            <div className="h-px bg-gray-100"></div>
            
            {/* Battle Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f8f9fa] rounded-xl p-3 border border-gray-50 flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold">Contest Score</span>
                <span className="text-lg font-black text-brand-blue mt-0.5">1,850</span>
                <span className="text-[9px] text-[#46A040] font-bold flex items-center mt-1">
                  <span className="material-symbols-outlined text-[10px] font-extrabold">trending_up</span> +32 last week
                </span>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3 border border-gray-50 flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold">Global Rank</span>
                <span className="text-lg font-black text-brand-blue mt-0.5">#458</span>
                <span className="text-[9px] text-[#46A040] font-bold flex items-center mt-1">Top 4.2% global</span>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3 border border-gray-50 flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold">Contests</span>
                <span className="text-lg font-black text-brand-blue mt-0.5">12</span>
                <span className="text-[9px] text-text-muted font-medium mt-1">Attended events</span>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-3 border border-gray-50 flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold">Avg. Accuracy</span>
                <span className="text-lg font-black text-[#46A040] mt-0.5">85%</span>
                <span className="text-[9px] text-text-muted font-medium mt-1">High submission rate</span>
              </div>
            </div>

            <div className="h-px bg-gray-100"></div>

            {/* Milestone Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-semibold text-text-muted">
                <span>Milestone Progress</span>
                <span className="font-bold text-brand-blue">1,850 / 2,000 to Master</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '74%' }}></div>
              </div>
            </div>

            <div className="h-px bg-gray-100"></div>

            {/* Unlocked Specialty Badges */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Combat Trophy Showcase</span>
              <div className="flex items-center gap-3">
                <div className="group/badge relative w-9 h-9 rounded-full bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 transition-all">
                  <span className="material-symbols-outlined text-lg icon-fill">emoji_events</span>
                  {/* Custom tooltip inside layout */}
                  <div className="absolute bottom-full mb-2 hidden group-hover/badge:block w-40 bg-brand-blue text-white text-[10px] p-2 rounded-lg text-center shadow-md z-10 left-1/2 -translate-x-1/2 leading-normal">
                    <strong>Algorithmic Titan</strong><br />Solve all 5 contest problems in under 60 minutes.
                  </div>
                </div>
                <div className="group/badge relative w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 transition-all">
                  <span className="material-symbols-outlined text-lg">local_fire_department</span>
                  <div className="absolute bottom-full mb-2 hidden group-hover/badge:block w-40 bg-brand-blue text-white text-[10px] p-2 rounded-lg text-center shadow-md z-10 left-1/2 -translate-x-1/2 leading-normal">
                    <strong>Streak King</strong><br />Participated in 5 consecutive weekly contests.
                  </div>
                </div>
                <div className="group/badge relative w-9 h-9 rounded-full bg-blue-50 border border-blue-200 text-blue-500 flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 transition-all">
                  <span className="material-symbols-outlined text-lg icon-fill">security</span>
                  <div className="absolute bottom-full mb-2 hidden group-hover/badge:block w-40 bg-brand-blue text-white text-[10px] p-2 rounded-lg text-center shadow-md z-10 left-1/2 -translate-x-1/2 leading-normal">
                    <strong>Bug Buster</strong><br />Achieved 100% test case pass on first code submission.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Registration Success Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-blue/60 backdrop-blur-md transition-all duration-300">
          <div className="bg-surface rounded-2xl p-8 max-w-sm w-full mx-4 border border-white/20 shadow-2xl relative text-center flex flex-col items-center gap-4 transition-all duration-300 scale-100">
            <div className="w-16 h-16 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-2 pulse-glow-green">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-brand-blue">Registration Successful!</h3>
            <p className="text-sm text-text-muted">
              You are successfully locked in for <strong className="text-brand-blue">{modalContestTitle}</strong>!
            </p>
            
            {/* Premium Ticket Detail */}
            <div className="w-full bg-[#f8f9fa] border border-dashed border-gray-300 rounded-xl p-4 my-2 flex flex-col gap-2 relative overflow-hidden text-left">
              {/* Ticket cutouts */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2.5 w-5 h-5 rounded-full bg-brand-blue/5 border-r border-gray-300"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2.5 w-5 h-5 rounded-full bg-brand-blue/5 border-l border-gray-300"></div>
              
              <div className="flex justify-between items-center text-[10px] font-bold text-text-muted">
                <span>ENTRY PASS</span>
                <span className="text-primary font-extrabold">#NS-2026</span>
              </div>
              <div className="h-px bg-gray-200 border-dashed my-1"></div>
              <div className="flex justify-between items-center text-xs font-bold text-brand-blue">
                <span>TICKET ID:</span>
                <span className="font-mono text-sm tracking-wider text-primary">{modalTicketId}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue-light text-white font-bold rounded-lg transition-colors shadow-md text-sm"
            >
              Awesome, Let's Go!
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
