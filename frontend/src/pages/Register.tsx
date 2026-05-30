import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redirect to login on successful submission
    navigate('/login');
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

        {/* Registration Card */}
        <div className="glass-card rounded-xl p-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(26,54,93,0.12)]">
          <div className="mb-lg">
            <h2 className="font-headline-md text-headline-md text-[#0b1c30]">Create an Account</h2>
            <p className="font-body-md text-body-md text-[#5a4136] mt-xs">Please enter your details to sign up.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-lg">
            {/* Full Name */}
            <div>
              <label className="block font-label-md text-label-md text-[#5a4136] mb-xs" htmlFor="fullname">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#8e7164]" style={{ fontVariationSettings: '"FILL" 0' }}>
                    person
                  </span>
                </div>
                <input
                  className="block w-full pl-[40px] pr-sm py-sm border border-[#e2bfb0] rounded-lg bg-white text-[#0b1c30] placeholder-[#8e7164] font-body-md text-body-md input-glow focus:outline-none transition-all"
                  id="fullname"
                  name="fullname"
                  placeholder="John Doe"
                  required
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block font-label-md text-label-md text-[#5a4136] mb-xs" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#8e7164]" style={{ fontVariationSettings: '"FILL" 0' }}>
                    person
                  </span>
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

            {/* Email Address */}
            <div>
              <label className="block font-label-md text-label-md text-[#5a4136] mb-xs" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#8e7164]" style={{ fontVariationSettings: '"FILL" 0' }}>
                    mail
                  </span>
                </div>
                <input
                  className="block w-full pl-[40px] pr-sm py-sm border border-[#e2bfb0] rounded-lg bg-white text-[#0b1c30] placeholder-[#8e7164] font-body-md text-body-md input-glow focus:outline-none transition-all"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-label-md text-label-md text-[#5a4136] mb-xs" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#8e7164]" style={{ fontVariationSettings: '"FILL" 0' }}>
                    lock
                  </span>
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

            {/* Confirm Password */}
            <div>
              <label className="block font-label-md text-label-md text-[#5a4136] mb-xs" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#8e7164]" style={{ fontVariationSettings: '"FILL" 0' }}>
                    lock
                  </span>
                </div>
                <input
                  className="block w-full pl-[40px] pr-sm py-sm border border-[#e2bfb0] rounded-lg bg-white text-[#0b1c30] placeholder-[#8e7164] font-body-md text-body-md input-glow focus:outline-none transition-all"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Enter your password"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center mt-sm">
              <input
                className="h-4 w-4 text-[#a04100] focus:ring-[#a04100] border-[#e2bfb0] rounded bg-white"
                id="terms"
                name="terms"
                required
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label className="ml-2 block font-label-md text-label-md text-[#5a4136]" htmlFor="terms">
                I agree to the{' '}
                <a className="font-medium text-[#455f88] hover:text-[#a04100] transition-colors" href="#">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a className="font-medium text-[#455f88] hover:text-[#a04100] transition-colors" href="#">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full flex justify-center py-sm px-md border border-transparent rounded-lg shadow-sm font-label-md text-label-md text-white bg-[#ff6b00] hover:bg-[#a04100] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a04100] items-center pt-[10px] pb-[6px]"
              type="submit"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="mt-lg text-center font-body-md text-body-md text-[#5a4136]">
          Already have an account?{' '}
          <Link className="font-medium text-[#455f88] hover:text-[#a04100] transition-colors" to="/login">
            Log in here
          </Link>
        </p>
      </main>
    </div>
  );
};
