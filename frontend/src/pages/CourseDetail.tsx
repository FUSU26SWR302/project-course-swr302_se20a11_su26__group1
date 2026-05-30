import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CourseDetail: React.FC = () => {
  // Tab Switching State
  const [activeTab, setActiveTab] = useState<'about' | 'curriculum' | 'reviews'>('about');

  // Curriculum Accordion State
  const [section1Open, setSection1Open] = useState(true);
  const [section2Open, setSection2Open] = useState(true);
  const [section3Open, setSection3Open] = useState(true);

  // Cart & Video Modal Interactive States
  const [addedToCart, setAddedToCart] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart('c1'); // Link to a mock course ID in Layout to update cart counter visually
    setSuccessMessage('Đã thêm khóa học vào giỏ hàng thành công!');
    setAddedToCart(true);
    setTimeout(() => {
      setSuccessMessage('');
    }, 2500);
  };

  return (
    <div className="w-full">
      {/* Styles defined in HTML */}
      <style>{`
        .active-tab {
          border-bottom: 2px solid #F36F21;
          color: #F36F21;
          font-weight: 700;
        }

        .bento-shadow {
          box-shadow: 0 4px 20px rgba(26, 54, 93, 0.08);
        }
      `}</style>

      {/* Dynamic Alerts */}
      {successMessage && (
        <div className="fixed top-20 right-8 bg-brand-green border border-brand-green/30 text-white p-4 rounded-xl z-50 font-bold flex items-center gap-2 animate-fade-in shadow-xl">
          <span className="material-symbols-outlined text-[20px] icon-fill">check_circle</span>
          {successMessage}
        </div>
      )}

      {/* Video Modal Popup */}
      {isVideoModalOpen && (
        <div 
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mx-4"
          >
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all z-10 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Course Preview Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Updated Hero Banner Section */}
      <div className="bg-brand-blue text-white pt-24 pb-32">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16 flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-[72%] space-y-6">
            <div className="flex gap-3">
              <span className="bg-primary-light text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                WEB DEVELOPMENT
              </span>
              <span className="bg-brand-blue-light text-white border border-white/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                BESTSELLER
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Mastering Full-Stack React {"&"} Node.js</h1>
            <p className="text-lg md:text-xl font-medium max-w-3xl text-gray-300">
              Build scalable, production-ready web applications from scratch. Learn advanced patterns, state management, and deployment strategies.
            </p>
            <div className="flex flex-wrap gap-6 items-center pt-2">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: '"FILL" 1' }}>
                  star
                </span>
                <span className="font-bold text-white">4.9</span>
                <span className="text-sm text-gray-300 ml-1">(2,451 ratings)</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="material-symbols-outlined text-sm">group</span>
                <span className="text-sm">15,234 students</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span className="text-sm">42 hours total</span>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-4">
              <img
                alt="Instructor"
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA65IzsPVSJDam20wsXEVKrKnSUqxBobJyP6em1mqQmA1iy_cxTCnIKnrQRqQurEKJMmHQ4fHpWFF18c9PsCUEvcy85BopkP2xz_VbWYrlbTpRrx9zq0bB6Xd2YGUKrC3luWLfu6LuljB6BbQLoNare2pzcPeACGbwVidv38g30Hd4uuzfndTcDbxTG_dF1MPEPeBSfMFbQbV0quPHe_URGMjAA1X8ms1doCet-XDnZAQTrQxuHqMErzSxjd3brginxxWvGAMJKaQsg"
              />
              <div>
                <p className="text-sm font-medium text-gray-300">
                  Created by <span className="text-white font-bold">Dr. Sarah Jenkins</span>
                </p>
                <p className="text-sm text-gray-400">Senior Software Engineer at TechCorp</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-[28%] relative">
            {/* Spacer to allow absolute positioning of sidebar */}
          </div>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 md:px-16 pb-20 -mt-20 relative z-10">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content (72%) */}
          <div className="w-full lg:w-[72%] bg-surface rounded-2xl p-8 shadow-sm border border-gray-200">
            {/* Tab Navigation */}
            <div className="flex gap-8 border-b border-gray-200 mb-10 overflow-x-auto whitespace-nowrap" id="course-tabs">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-4 text-body-md transition-all ${activeTab === 'about' ? 'active-tab text-primary' : 'text-text-muted hover:text-primary'}`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`pb-4 text-body-md transition-all ${activeTab === 'curriculum' ? 'active-tab text-primary' : 'text-text-muted hover:text-primary'}`}
              >
                Curriculum
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 text-body-md transition-all ${activeTab === 'reviews' ? 'active-tab text-primary' : 'text-text-muted hover:text-primary'}`}
              >
                Reviews
              </button>
            </div>

            {/* Dynamic Content Wrapper */}
            <div className="space-y-12">
              {/* 1. ABOUT SECTION */}
              <div id="content-about" className={`space-y-12 transition-all duration-300 ${activeTab === 'about' ? '' : 'hidden'}`}>
                {/* Course Description */}
                <section>
                  <h2 className="text-headline-md font-bold text-text-main mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>Course Description
                  </h2>
                  <div className="text-body-lg text-text-muted leading-relaxed max-w-4xl">
                    <p>
                      The "Mastering Full-Stack React {"&"} Node.js" course is a transformative journey designed to take you from zero to a production-ready developer. You will build real-world applications using the MERN stack, focusing on architecture, scalability, and best practices for modern web development.
                    </p>
                  </div>
                </section>

                {/* What you'll learn */}
                <section>
                  <h2 className="text-headline-md font-bold text-text-main mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>What you'll learn
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-6 bg-surface-gray rounded-xl border border-gray-200 flex items-start gap-4 hover:border-brand-green transition-all">
                      <span className="material-symbols-outlined text-brand-green" style={{ fontVariationSettings: '"FILL" 1' }}>
                        check_circle
                      </span>
                      <p className="text-body-md font-medium text-text-main">Architect scalable MERN applications</p>
                    </div>
                    <div className="p-6 bg-surface-gray rounded-xl border border-gray-200 flex items-start gap-4 hover:border-brand-green transition-all">
                      <span className="material-symbols-outlined text-brand-green" style={{ fontVariationSettings: '"FILL" 1' }}>
                        check_circle
                      </span>
                      <p className="text-body-md font-medium text-text-main">Master React Hooks and State Management</p>
                    </div>
                    <div className="p-6 bg-surface-gray rounded-xl border border-gray-200 flex items-start gap-4 hover:border-brand-green transition-all">
                      <span className="material-symbols-outlined text-brand-green" style={{ fontVariationSettings: '"FILL" 1' }}>
                        check_circle
                      </span>
                      <p className="text-body-md font-medium text-text-main">Build secure REST APIs with Node.js {"&"} Express</p>
                    </div>
                    <div className="p-6 bg-surface-gray rounded-xl border border-gray-200 flex items-start gap-4 hover:border-brand-green transition-all">
                      <span className="material-symbols-outlined text-brand-green" style={{ fontVariationSettings: '"FILL" 1' }}>
                        check_circle
                      </span>
                      <p className="text-body-md font-medium text-text-main">Advanced Database Modeling with MongoDB</p>
                    </div>
                  </div>
                </section>

                {/* Course Highlights */}
                <section>
                  <h2 className="text-headline-md font-bold text-text-main mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>Course Highlights
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-surface-gray rounded-xl text-center space-y-3">
                      <span className="material-symbols-outlined text-primary text-4xl">developer_mode</span>
                      <p className="font-bold text-text-main">15+ Real-world Projects</p>
                    </div>
                    <div className="p-6 bg-surface-gray rounded-xl text-center space-y-3">
                      <span className="material-symbols-outlined text-primary text-4xl">all_inclusive</span>
                      <p className="font-bold text-text-main">Lifetime Access</p>
                    </div>
                    <div className="p-6 bg-surface-gray rounded-xl text-center space-y-3">
                      <span className="material-symbols-outlined text-primary text-4xl">person_celebrate</span>
                      <p className="font-bold text-text-main">1-on-1 Mentorship</p>
                    </div>
                  </div>
                </section>

                {/* Technologies & Tools */}
                <section>
                  <h2 className="text-headline-md font-bold text-text-main mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>Technologies {"&"} Tools
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-6 py-2 border border-gray-200 rounded-full text-text-muted font-medium hover:bg-gray-50 transition-colors cursor-default">
                      React
                    </span>
                    <span className="px-6 py-2 border border-gray-200 rounded-full text-text-muted font-medium hover:bg-gray-50 transition-colors cursor-default">
                      Node.js
                    </span>
                    <span className="px-6 py-2 border border-gray-200 rounded-full text-text-muted font-medium hover:bg-gray-50 transition-colors cursor-default">
                      Express
                    </span>
                    <span className="px-6 py-2 border border-gray-200 rounded-full text-text-muted font-medium hover:bg-gray-50 transition-colors cursor-default">
                      MongoDB
                    </span>
                    <span className="px-6 py-2 border border-gray-200 rounded-full text-text-muted font-medium hover:bg-gray-50 transition-colors cursor-default">
                      Redux
                    </span>
                    <span className="px-6 py-2 border border-gray-200 rounded-full text-text-muted font-medium hover:bg-gray-50 transition-colors cursor-default">
                      Tailwind CSS
                    </span>
                    <span className="px-6 py-2 border border-gray-200 rounded-full text-text-muted font-medium hover:bg-gray-50 transition-colors cursor-default">
                      Docker
                    </span>
                  </div>
                </section>

                {/* Prerequisites */}
                <section>
                  <h2 className="text-headline-md font-bold text-text-main mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>Prerequisites
                  </h2>
                  <div className="border-l-4 border-primary bg-surface-gray p-6 rounded-r-xl">
                    <ul className="list-disc list-inside space-y-2 text-text-muted">
                      <li>Basic JavaScript knowledge (ES6+ features)</li>
                      <li>Familiarity with HTML and CSS</li>
                    </ul>
                  </div>
                </section>

                {/* Target Audience */}
                <section>
                  <h2 className="text-headline-md font-bold text-text-main mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>Target Audience
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-text-muted">school</span>
                      <span className="text-text-muted font-medium">Aspiring Full-Stack Developers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-text-muted">code_blocks</span>
                      <span className="text-text-muted font-medium">Frontend Devs looking to learn Backend</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-text-muted">terminal</span>
                      <span className="text-text-muted font-medium">Computer Science Students</span>
                    </div>
                  </div>
                </section>

                {/* Completion Benefits */}
                <section>
                  <h2 className="text-headline-md font-bold text-text-main mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>Completion Benefits
                  </h2>
                  <div className="p-8 bg-surface-gray rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-5xl">emoji_events</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 w-full">
                      <div className="text-center md:text-left">
                        <p className="font-bold text-text-main">Professional Certificate</p>
                        <p className="text-sm text-text-muted">Industry recognized</p>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="font-bold text-text-main">Portfolio Projects</p>
                        <p className="text-sm text-text-muted">Ready for employers</p>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="font-bold text-text-main">Career Support</p>
                        <p className="text-sm text-text-muted">Placement assistance</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* 2. CURRICULUM SECTION */}
              <div id="content-curriculum" className={`space-y-12 transition-all duration-300 ${activeTab === 'curriculum' ? '' : 'hidden'}`}>
                <section className="space-y-6">
                  <div className="flex justify-between items-end mb-4">
                    <h2 className="text-headline-md font-bold text-text-main">Course Content</h2>
                    <p className="text-body-md text-text-muted font-medium">3 sections • 6 lectures • 42h total length</p>
                  </div>
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Section 1 */}
                    <div className="bg-surface-gray border-b border-gray-200">
                      <div 
                        onClick={() => setSection1Open(!section1Open)}
                        className="p-4 flex justify-between items-center cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          <span 
                            className="material-symbols-outlined text-text-main transition-transform duration-200"
                            style={{ transform: section1Open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                          >
                            expand_more
                          </span>
                          <h3 className="font-bold text-text-main">Section 1: Introduction {"&"} Environment Setup</h3>
                        </div>
                        <span className="text-body-sm text-text-muted font-medium">2 lectures • 45m</span>
                      </div>
                      <div className={`bg-surface divide-y divide-gray-200 transition-all duration-200 ${section1Open ? '' : 'hidden'}`}>
                        <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-brand-green text-[20px]">play_circle</span>
                            <span className="text-body-md text-text-main">Lecture 1: Course Overview</span>
                          </div>
                          <button className="bg-primary text-white text-body-sm font-bold px-3 py-1 rounded hover:bg-primary-hover transition-all">
                            Preview
                          </button>
                        </div>
                        <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-brand-green text-[20px]">play_circle</span>
                            <span className="text-body-md text-text-main">Lecture 2: Setting up SQL Lab with Docker</span>
                          </div>
                          <button className="bg-primary text-white text-body-sm font-bold px-3 py-1 rounded hover:bg-primary-hover transition-all">
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-surface-gray border-b border-gray-200">
                      <div 
                        onClick={() => setSection2Open(!section2Open)}
                        className="p-4 flex justify-between items-center cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          <span 
                            className="material-symbols-outlined text-text-main transition-transform duration-200"
                            style={{ transform: section2Open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                          >
                            expand_more
                          </span>
                          <h3 className="font-bold text-text-main">Section 2: Advanced SQL Queries</h3>
                        </div>
                        <span className="text-body-sm text-text-muted font-medium">2 lectures • 12h</span>
                      </div>
                      <div className={`bg-surface divide-y divide-gray-200 transition-all duration-200 ${section2Open ? '' : 'hidden'}`}>
                        <div className="p-4 flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-brand-green text-[20px]">lock</span>
                            <span className="text-body-md text-text-muted">Lecture 3: Recursive CTEs</span>
                          </div>
                          <span className="text-body-sm text-text-muted font-medium">1h 20m</span>
                        </div>
                        <div className="p-4 flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-brand-green text-[20px]">lock</span>
                            <span className="text-body-md text-text-muted">Lecture 4: Window Functions deep dive</span>
                          </div>
                          <span className="text-body-sm text-text-muted font-medium">2h 15m</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-surface-gray">
                      <div 
                        onClick={() => setSection3Open(!section3Open)}
                        className="p-4 flex justify-between items-center cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          <span 
                            className="material-symbols-outlined text-text-main transition-transform duration-200"
                            style={{ transform: section3Open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                          >
                            expand_more
                          </span>
                          <h3 className="font-bold text-text-main">Section 3: Performance Optimization (Indexing)</h3>
                        </div>
                        <span className="text-body-sm text-text-muted font-medium">2 lectures • 15h</span>
                      </div>
                      <div className={`bg-surface divide-y divide-gray-200 transition-all duration-200 ${section3Open ? '' : 'hidden'}`}>
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-brand-green text-[20px]">lock</span>
                            <span className="text-body-md text-text-muted">Lecture 5: B-Tree Index Mechanisms</span>
                          </div>
                          <span className="text-body-sm text-text-muted font-medium">3h 45m</span>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-brand-green text-[20px]">lock</span>
                            <span className="text-body-md text-text-muted">Lecture 6: Query Execution Plans</span>
                          </div>
                          <span className="text-body-sm text-text-muted font-medium">4h 10m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* 3. REVIEWS SECTION */}
              <div id="content-reviews" className={`space-y-12 transition-all duration-300 ${activeTab === 'reviews' ? '' : 'hidden'}`}>
                <section className="space-y-8 animate-in fade-in duration-500">
                  <h2 className="text-headline-md font-bold text-text-main mb-6">Student Feedback</h2>
                  <div className="flex flex-col md:flex-row gap-10 items-start md:items-center p-8 bg-surface-gray border border-gray-200 rounded-2xl">
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <span className="text-6xl font-extrabold text-primary">4.9</span>
                      <div className="flex text-yellow-400">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                      </div>
                      <span className="text-body-md font-bold text-text-main">Course Rating</span>
                    </div>
                    <div className="flex-1 w-full space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '85%' }}></div>
                        </div>
                        <div className="flex items-center gap-4 min-w-[160px]">
                          <div className="flex text-yellow-400">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                          </div>
                          <span className="text-body-sm font-medium text-text-muted">2,083</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '10%' }}></div>
                        </div>
                        <div className="flex items-center gap-4 min-w-[160px]">
                          <div className="flex text-yellow-400">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]">star</span>
                          </div>
                          <span className="text-body-sm font-medium text-text-muted">245</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '3%' }}></div>
                        </div>
                        <div className="flex items-center gap-4 min-w-[160px]">
                          <div className="flex text-yellow-400">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]">star</span>
                            <span className="material-symbols-outlined text-[18px]">star</span>
                          </div>
                          <span className="text-body-sm font-medium text-text-muted">74</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '1%' }}></div>
                        </div>
                        <div className="flex items-center gap-4 min-w-[160px]">
                          <div className="flex text-yellow-400">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]">star</span>
                            <span className="material-symbols-outlined text-[18px]">star</span>
                            <span className="material-symbols-outlined text-[18px]">star</span>
                          </div>
                          <span className="text-body-sm font-medium text-text-muted">24</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '1%' }}></div>
                        </div>
                        <div className="flex items-center gap-4 min-w-[160px]">
                          <div className="flex text-yellow-400">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            <span className="material-symbols-outlined text-[18px]">star</span>
                            <span className="material-symbols-outlined text-[18px]">star</span>
                            <span className="material-symbols-outlined text-[18px]">star</span>
                            <span className="material-symbols-outlined text-[18px]">star</span>
                          </div>
                          <span className="text-body-sm font-medium text-text-muted">25</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6">
                    <h3 className="text-headline-sm font-bold text-text-main">Reviews</h3>
                    <div className="divide-y divide-gray-200">
                      <div className="py-8 flex flex-col sm:flex-row gap-6">
                        <img
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full object-cover bg-surface-gray shrink-0"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-text-main">David Thompson</p>
                              <div className="flex text-yellow-400 scale-75 origin-left -ml-1">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                              </div>
                            </div>
                            <span className="text-body-sm text-text-muted">2 days ago</span>
                          </div>
                          <p className="text-body-md text-text-main leading-relaxed">
                            Excellent course! The section on Docker was particularly helpful. I've been struggling with containerizing my React apps for a while and Sarah makes it look so easy. Highly recommend for any dev looking to level up.
                          </p>
                        </div>
                      </div>

                      <div className="py-8 flex flex-col sm:flex-row gap-6">
                        <img
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full object-cover bg-surface-gray shrink-0"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-text-main">Amanda Lee</p>
                              <div className="flex text-yellow-400 scale-75 origin-left -ml-1">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                              </div>
                            </div>
                            <span className="text-body-sm text-text-muted">1 week ago</span>
                          </div>
                          <p className="text-body-md text-text-main leading-relaxed">
                            The curriculum is very comprehensive. I appreciated the deep dive into performance optimization. The Query Execution Plans section alone was worth the price of the course.
                          </p>
                        </div>
                      </div>

                      <div className="py-8 flex flex-col sm:flex-row gap-6">
                        <img
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full object-cover bg-surface-gray shrink-0"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-text-main">Michael Chen</p>
                              <div className="flex text-yellow-400 scale-75 origin-left -ml-1">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined">star</span>
                              </div>
                            </div>
                            <span className="text-body-sm text-text-muted">2 weeks ago</span>
                          </div>
                          <p className="text-body-md text-text-main leading-relaxed">
                            Great content, though the pace was a bit fast for me in the middle sections. Definitely requires some prior knowledge of JavaScript to keep up, but the examples are solid.
                          </p>
                        </div>
                      </div>

                      <div className="py-8 flex flex-col sm:flex-row gap-6">
                        <img
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full object-cover bg-surface-gray shrink-0"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB98dPVylZwO6vg95FQaD4k-myG1YhY-VGq7du1S8-pcxrZmnhUwx2VzSs1AkC17Ld9sN1YJQziGrBM5Wxg39W1UFKWDjBJkC4p7QnbHP8aEqlD703-2MHTrqIN65tt0QPlOkZY7JTwMAXIas3lEuSOkuv9JT3HAenrdph26Gza-yDSVOVR0WEfHbnhWYtKN5fNK-bLnyjvw5pHNbtgeUVJysTqy7Xeb6TBV9G1g22LmO1UX_2MQ-DV5vRbsXPHEqko_NPdoIjv-Is"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-text-main">Sarah Miller</p>
                              <div className="flex text-yellow-400 scale-75 origin-left -ml-1">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                              </div>
                            </div>
                            <span className="text-body-sm text-text-muted">1 month ago</span>
                          </div>
                          <p className="text-body-md text-text-main leading-relaxed">
                            Best React {"&"} Node course I've taken so far. Dr. Jenkins is an amazing instructor who explains complex concepts with such clarity. The hands-on projects are real-world applicable.
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary-light transition-all">
                      See More Reviews
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Sidebar (28%) */}
          <div className="w-full lg:w-[28%] -mt-[320px]">
            <div className="sticky top-24 bg-surface rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Video Preview */}
              <div 
                onClick={() => setIsVideoModalOpen(true)}
                className="relative w-full aspect-video group cursor-pointer"
              >
                <img
                  alt="Course Preview"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANz10uiENp-6xAaSTiI-wX3usq74xuc_Q0k-eViL0y0enkfPnB6PZ18Cf8YwFrVncHl71GFD-Rg8NaOZLmSNBpLP9CExdua3Fdv0K_YayW2QBWHvY9oSANHyxDB7sFDxKO8hy0slMwRWdmK55uggr9Nnle1e4W7glmLWYYDaffEHNrFndj3qpkI5YDfCRtOQ3omY8Zty5fpz--7QLgoLpC41ykBbQmisjw0oTz4tbJvoOzXeGVHwTqmxnVgHsky2ogfrqMyIAV7jRS"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-4xl ml-1">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <span className="text-white font-bold text-lg drop-shadow-md">Preview this course</span>
                </div>
              </div>
              <div className="p-6">
                {/* Pricing Section */}
                <div className="flex items-end gap-3 mb-6">
                  <span className="text-3xl font-extrabold text-text-main">$89.99</span>
                  <span className="text-text-muted line-through text-lg mb-1">$129.99</span>
                </div>
                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  {addedToCart ? (
                    <Link
                      to="/shopping-cart"
                      className="w-full block py-4 bg-brand-blue hover:bg-brand-blue-light text-white text-center font-bold rounded-xl transition-all shadow-md"
                    >
                      Go to Cart
                    </Link>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover active:scale-[0.98] transition-all shadow-md"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
                {/* Course Info List */}
                <div className="space-y-4">
                  <h3 className="font-bold text-text-main mb-4">This course includes:</h3>
                  <div className="flex items-center gap-3 text-text-muted">
                    <span className="material-symbols-outlined text-[20px]">ondemand_video</span>
                    <span className="text-sm">42 hours on-demand video</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-muted">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                    <span className="text-sm">15 downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-muted">
                    <span className="material-symbols-outlined text-[20px]">code</span>
                    <span className="text-sm">33 coding problems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
