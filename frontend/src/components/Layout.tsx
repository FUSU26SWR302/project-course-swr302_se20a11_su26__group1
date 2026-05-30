import React from 'react';
import { Outlet, Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Layout: React.FC = () => {
  const { user, cart, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const isInstructorRoute = location.pathname.startsWith('/instructor');
  const isProblemSolvePage = location.pathname.startsWith('/problems/');
  const isContestDetailPage = location.pathname.startsWith('/contests/');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-[#f0f4f9] text-text-main font-body min-h-screen flex flex-col antialiased selection:bg-primary-light selection:text-brand-blue relative">

      {/* Glowing Backdrop Circles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[150px]"></div>
      </div>

      {/* TopAppBar */}
      {!isInstructorRoute && (
        <header className="bg-surface/90 backdrop-blur-md shadow-sm fixed top-0 z-50 w-full border-b border-gray-100/50">
          <div className="flex justify-between items-center w-full px-8 h-16 max-w-[1440px] mx-auto relative">
          {/* Brand */}
          <Link to="/" className="shrink-0 flex items-center cursor-pointer">
            <img src={`${import.meta.env.BASE_URL}LOGO.png`} alt="Nonstop Coding Logo" className="h-16 w-auto" />
          </Link>
          <nav className="hidden lg:flex gap-6 items-center absolute left-1/2 transform -translate-x-1/2 h-full">
            <NavLink className={({ isActive }) => `font-body text-body-md transition-colors font-medium px-2 py-1 ${isActive ? 'text-primary' : 'text-text-main hover:text-primary'}`} to="/dashboard">My Learning</NavLink>
            <NavLink className={({ isActive }) => `font-body text-body-md transition-colors font-medium px-2 py-1 ${isActive ? 'text-primary' : 'text-text-main hover:text-primary'}`} to="/courses">Courses</NavLink>
            <NavLink className={({ isActive }) => `font-body text-body-md transition-colors font-medium px-2 py-1 ${isActive ? 'text-primary' : 'text-text-main hover:text-primary'}`} to="/problems">Problems</NavLink>
            <NavLink className={({ isActive }) => `font-body text-body-md transition-colors font-medium px-2 py-1 ${isActive ? 'text-primary' : 'text-text-main hover:text-primary'}`} to="/contests">Contests</NavLink>
            <NavLink className={({ isActive }) => `font-body text-body-md transition-colors font-medium px-2 py-1 ${isActive ? 'text-primary' : 'text-text-main hover:text-primary'}`} to="/rankings">Rankings</NavLink>
          </nav>
          <div className="flex items-center gap-4">
            {/* Instructor Capsule Link */}
            <Link to="/instructor" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-light/40 text-primary hover:bg-primary hover:text-white font-semibold text-xs md:text-sm transition-all select-none border border-primary/20 shrink-0">
              <span className="material-symbols-outlined text-[16px] md:text-[18px] icon-fill">school</span>
              <span>Instructor</span>
            </Link>
            <button className="p-2 rounded-full text-text-muted hover:text-primary hover:bg-surface-gray transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <Link to="/shopping-cart" className="p-2 rounded-full text-text-muted hover:text-primary hover:bg-surface-gray transition-all relative">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cart.length > 0 && (
                <span className="absolute top-1 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">{cart.length}</span>
              )}
            </Link>
            <div className="relative flex items-center gap-1 cursor-pointer group ml-2">
              <img
                alt="User Avatar"
                className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-primary transition-all object-cover"
                src={user?.avatar || "https://ui-avatars.com/api/?name=You&background=12284C&color=fff"}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=You&background=12284C&color=fff';
                }}
              />
              <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">arrow_drop_down</span>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-surface rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2 cursor-default text-left">
                <Link to="/dashboard" className="px-4 py-2 text-sm text-text-main hover:bg-surface-gray hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">dashboard</span> My Learning
                </Link>
                <a href="#" className="px-4 py-2 text-sm text-text-main hover:bg-surface-gray hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">person</span> Edit Profile
                </a>
                <Link to="/wallet-transaction" className="px-4 py-2 text-sm text-text-main hover:bg-surface-gray hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span> Wallet
                </Link>
                <div className="h-px bg-gray-100 my-1 w-full"></div>
                <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2 w-full text-left">
                  <span className="material-symbols-outlined text-[18px]">logout</span> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      )}

      {/* Main content body with Outlet */}
      <main className={`relative z-10 flex-grow w-full min-w-0 ${isInstructorRoute ? '' : 'pt-16'}`}>
        <Outlet />
      </main>

      {/* Master Footer */}
      {!isInstructorRoute && !isProblemSolvePage && !isContestDetailPage && (
        <footer className="bg-brand-blue text-white mt-auto shrink-0 w-full z-40 relative">
          <div className="max-w-[1440px] mx-auto px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col gap-4">
                <div className="text-headline-md font-bold font-display">
                  <span>Nonstop</span><span className="text-primary">Coding</span>
                </div>
                <p className="text-body-md text-white/70 max-w-xs">
                  Empowering developers through continuous learning, practice, and competition in a global tech community.
                </p>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined">language</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-body-lg font-bold font-display">Platform</h4>
                <nav className="flex flex-col gap-2">
                  <Link className="text-white/70 hover:text-primary transition-colors" to="/courses">Courses</Link>
                  <Link className="text-white/70 hover:text-primary transition-colors" to="/problems">Problems</Link>
                  <Link className="text-white/70 hover:text-primary transition-colors" to="/contests">Contests</Link>
                  <Link className="text-white/70 hover:text-primary transition-colors" to="/rankings">Leaderboard</Link>
                </nav>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-body-lg font-bold font-display">Support</h4>
                <nav className="flex flex-col gap-2">
                  <a className="text-white/70 hover:text-primary transition-colors" href="#">Help Center</a>
                  <a className="text-white/70 hover:text-primary transition-colors" href="#">FAQ</a>
                  <a className="text-white/70 hover:text-primary transition-colors" href="#">Contact Us</a>
                  <a className="text-white/70 hover:text-primary transition-colors" href="#">Terms of Service</a>
                </nav>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-body-lg font-bold font-display">Stay Updated</h4>
                <p className="text-body-md text-white/70">Subscribe to our newsletter for latest updates.</p>
                <div className="flex flex-col gap-2">
                  <input className="bg-white/10 border-white/20 rounded-lg py-2 px-4 text-white placeholder-white/40 focus:ring-primary focus:border-primary" placeholder="Enter your email" type="email" />
                  <button className="w-full bg-primary hover:bg-primary-hover py-2 rounded-lg font-bold transition-colors">Subscribe</button>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/60">© 2024 Nonstop Coding. All rights reserved.</p>
              <div className="flex gap-6">
                <a className="text-sm text-white/60 hover:text-primary" href="#">Privacy Policy</a>
                <a className="text-sm text-white/60 hover:text-primary" href="#">Cookies Policy</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
