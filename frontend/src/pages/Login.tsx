import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username || 'Nguyễn Văn Hùng', 'student');
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-gutter md:p-margin-desktop text-[#0b1c30]"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#f8f9ff',
        backgroundImage:
          'radial-gradient(at 0% 0%, rgba(182, 208, 255, 0.3) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(74, 173, 78, 0.15) 0px, transparent 50%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <main className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-xl">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-[#a04100] tracking-tight">
            Lumina Learning
          </h1>
          <p className="font-body-lg text-body-lg text-[#5a4136] mt-sm">The Motivating Mentor</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-xl p-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(26,54,93,0.12)]">
          <div className="mb-lg">
            <h2 className="font-headline-md text-headline-md text-[#0b1c30]">Welcome back</h2>
            <p className="font-body-md text-body-md text-[#5a4136] mt-xs">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-lg">
            {/* Email Input */}
            <div>
              <label className="block font-label-md text-label-md text-[#5a4136] mb-xs" htmlFor="username">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#8e7164]" style={{ fontVariationSettings: '"FILL" 0' }}>person</span>
                </div>
                <input
                  className="block w-full pl-[40px] pr-sm py-sm border border-[#e2bfb0] rounded-lg bg-white text-[#0b1c30] placeholder-[#8e7164] font-body-md text-body-md input-glow focus:outline-none transition-all"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block font-label-md text-label-md text-[#5a4136] mb-xs" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#8e7164]" style={{ fontVariationSettings: '"FILL" 0' }}>lock</span>
                </div>
                <input
                  className="block w-full pl-[40px] pr-sm py-sm border border-[#e2bfb0] rounded-lg bg-white text-[#0b1c30] placeholder-[#8e7164] font-body-md text-body-md input-glow focus:outline-none transition-all"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between mt-sm">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-[#a04100] focus:ring-[#a04100] border-[#e2bfb0] rounded bg-white"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label className="ml-2 block font-label-md text-label-md text-[#5a4136]" htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a className="font-label-md text-label-md text-[#455f88] hover:text-[#a04100] transition-colors font-medium" href="#">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full flex justify-center py-sm px-md border border-transparent rounded-lg shadow-sm font-label-md text-label-md text-white bg-[#ff6b00] hover:bg-[#a04100] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a04100] items-center pt-[10px] pb-[6px]"
              type="submit"
            >
              Log In
            </button>
          </form>

          <div className="mt-lg">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e2bfb0]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#5a4136] font-caption text-caption">Or continue with</span>
              </div>
            </div>

            <div className="mt-lg grid grid-cols-2 gap-md">
              <a
                className="w-full flex justify-center items-center py-sm px-md border border-[#e2bfb0] rounded-lg shadow-sm bg-white font-label-md text-label-md text-[#0b1c30] hover:bg-[#eff4ff] transition-colors pt-[10px] pb-[6px]"
                href="#"
              >
                <span className="material-symbols-outlined mr-sm text-[#455f88]" style={{ fontVariationSettings: "'FILL' 0" }}>account_circle</span>
                Google
              </a>
              <a
                className="w-full flex justify-center items-center py-sm px-md border border-[#e2bfb0] rounded-lg shadow-sm bg-white font-label-md text-label-md text-[#0b1c30] hover:bg-[#eff4ff] transition-colors pt-[10px] pb-[6px]"
                href="#"
              >
                <span className="material-symbols-outlined mr-sm text-[#0b1c30]" style={{ fontVariationSettings: "'FILL' 0" }}>code</span>
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Register Link */}
        <p className="mt-lg text-center font-body-md text-body-md text-[#5a4136]">
          Don't have an account?{' '}
          <Link className="font-medium text-[#455f88] hover:text-[#a04100] transition-colors" to="/register">Register</Link>
        </p>
      </main>
    </div>
  );
};
