import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const SolveProblem: React.FC = () => {
  // Core UI states
  const [activeTab, setActiveTab] = useState<'description' | 'discussion' | 'solutions' | 'submissions' | 'test-result'>('description');
  const [leftWidth, setLeftWidth] = useState<number>(50);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>('Java');
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  // Editor template code state
  const templates: Record<string, string> = {
    'Java': `<span class="text-purple-600">class</span> <span class="text-teal-600">Solution</span> {
    <span class="text-purple-600">public</span> <span class="text-blue-600">int</span>[] <span class="text-blue-600">twoSum</span>(<span class="text-blue-600">int</span>[] <span class="text-sky-600">nums</span>, <span class="text-blue-600">int</span> <span class="text-sky-600">target</span>) {
        <span class="text-green-600">// Write your code here</span>
        
    }
}`,
    'Python 3': `<span class="text-purple-600">class</span> <span class="text-teal-600">Solution</span>:
    <span class="text-purple-600">def</span> <span class="text-blue-600">twoSum</span>(self, <span class="text-sky-600">nums</span>: List[int], <span class="text-sky-600">target</span>: int) -&gt; List[int]:
        <span class="text-green-600"># Write your code here</span>
        pass`,
    'C++': `<span class="text-purple-600">class</span> <span class="text-teal-600">Solution</span> {
<span class="text-purple-600">public</span>:
    vector&lt;int&gt; <span class="text-blue-600">twoSum</span>(vector&lt;int&gt;&amp; <span class="text-sky-600">nums</span>, <span class="text-blue-600">int</span> <span class="text-sky-600">target</span>) {
        <span class="text-green-600">// Write your code here</span>
        
    }
};`,
    'JavaScript': `<span class="text-purple-600">var</span> <span class="text-blue-600">twoSum</span> = <span class="text-purple-600">function</span>(<span class="text-sky-600">nums</span>, <span class="text-sky-600">target</span>) {
    <span class="text-green-600">// Write your code here</span>
    
};`
  };

  const [codeHtml, setCodeHtml] = useState<string>(templates['Java']);

  // Handle changing language
  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    setCodeHtml(templates[lang] || '');
  };

  // Handle Reset Code
  const handleResetCode = () => {
    if (window.confirm("Are you sure you want to reset your code to the default template?")) {
      setCodeHtml(templates[selectedLang]);
    }
  };

  // Resizable logic
  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const container = document.getElementById('split-container');
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      let newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newLeftWidth < 20) newLeftWidth = 20;
      if (newLeftWidth > 80) newLeftWidth = 80;
      setLeftWidth(newLeftWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Comments state inside Discussion
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      avatarInitials: 'JD',
      avatarBg: 'bg-brand-blue',
      time: '2 hours ago',
      text: 'Does anyone have a better solution using HashMap in Java?',
      likes: 12,
      replies: [
        {
          id: 2,
          author: 'Jane Smith',
          avatarInitials: 'JS',
          avatarBg: 'bg-brand-green',
          time: '1 hour ago',
          text: 'Yes, you can do it in one pass! Check the Solutions tab.'
        }
      ]
    }
  ]);
  const [commentText, setCommentText] = useState<string>('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      author: 'Me',
      avatarInitials: 'ME',
      avatarBg: 'bg-brand-blue',
      time: 'Just now',
      text: commentText,
      likes: 0,
      replies: []
    };
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  // Submissions list
  const [submissions, setSubmissions] = useState([
    { status: 'Accepted', lang: 'Java', runtime: '1 ms', memory: '42.1 MB', time: '2026-05-23 21:15:30', statusClass: 'text-brand-green' },
    { status: 'Wrong Answer', lang: 'Java', runtime: 'N/A', memory: 'N/A', time: '2026-05-23 21:05:12', statusClass: 'text-red-600' },
    { status: 'Time Limit Exceeded', lang: 'Python 3', runtime: '> 2000 ms', memory: '38.4 MB', time: '2026-05-22 14:30:05', statusClass: 'text-orange-500' },
    { status: 'Accepted', lang: 'C++', runtime: '0 ms', memory: '10.5 MB', time: '2026-05-21 09:12:45', statusClass: 'text-brand-green' },
    { status: 'Compilation Error', lang: 'C++', runtime: 'N/A', memory: 'N/A', time: '2026-05-21 09:05:10', statusClass: 'text-red-600' },
  ]);

  // Submit flow states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessOverlay(true);
      // Append a new successful submission row to the top
      const now = new Date();
      const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
      setSubmissions([
        {
          status: 'Accepted',
          lang: selectedLang,
          runtime: '2 ms',
          memory: '41.5 MB',
          time: timestamp,
          statusClass: 'text-brand-green'
        },
        ...submissions
      ]);
      // Switch tab to show Test Result or Submissions
      setActiveTab('test-result');
    }, 1200);
  };

  const getTabClass = (tab: 'description' | 'discussion' | 'solutions' | 'submissions' | 'test-result') => {
    return activeTab === tab
      ? "py-3 text-sm font-bold text-primary border-b-2 border-primary whitespace-nowrap outline-none"
      : "py-3 text-sm font-medium text-text-muted hover:text-text-main whitespace-nowrap border-b-2 border-transparent outline-none";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full max-w-[1920px] mx-auto overflow-hidden bg-surface-gray">
      {/* Styles injected to ensure identical visual styling of Custom Scrollbars & Resizer */}
      <style dangerouslySetInnerHTML={{ __html: `
        .resizer {
            width: 8px;
            cursor: col-resize;
            background-color: #e5e7eb;
            transition: background-color 0.2s;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
        }
        .resizer:hover, .resizer.dragging {
            background-color: #F36F21;
        }
        .resizer::after {
            content: "";
            display: block;
            width: 2px;
            height: 24px;
            background-color: #9ca3af;
            border-radius: 2px;
        }
        .resizer:hover::after, .resizer.dragging::after {
            background-color: #ffffff;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        /* Editor scrollbar */
        .custom-scroll::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
            background: #f8f9fa;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }

        /* Hide details marker */
        details > summary {
            list-style: none;
        }
        details > summary::-webkit-details-marker {
            display: none;
        }
      `}} />

      {/* Success Modal overlay */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-gray-200 text-center shadow-lg space-y-4 animate-fade-in">
            <span className="material-symbols-outlined text-[48px] text-brand-green">check_circle</span>
            <h3 className="font-bold text-lg text-text-main">Solution Accepted!</h3>
            <p className="text-sm text-text-muted">Your solution passed 20/20 test cases successfully.</p>
            <div className="bg-surface-gray p-3 rounded-md font-mono text-xs text-left space-y-1">
              <div><strong>Status:</strong> <span className="text-brand-green">Accepted</span></div>
              <div><strong>Language:</strong> {selectedLang}</div>
              <div><strong>Runtime:</strong> 2 ms</div>
              <div><strong>Memory:</strong> 41.5 MB</div>
            </div>
            <button 
              onClick={() => setShowSuccessOverlay(false)} 
              className="w-full py-2 bg-brand-green hover:bg-[#3d8c38] text-white rounded font-bold text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Back button row */}
      <div className="px-4 py-2 bg-surface border-b border-gray-200 flex items-center justify-between shrink-0 h-12">
        <Link to="/problems" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm font-medium group">
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Problems
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-brand-blue flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px] text-brand-green">check_circle</span> Solved
          </span>
          <span className="text-sm font-medium text-text-muted border-l border-gray-300 pl-4">Acceptance: 53.4%</span>
        </div>
      </div>

      <div className="flex-grow flex h-[calc(100vh-112px)] overflow-hidden relative" id="split-container">
        {/* Left Pane */}
        <div id="left-pane" className="flex flex-col bg-surface border-r border-gray-200 overflow-hidden" style={{ width: `${leftWidth}%` }}>
          {/* Navbar */}
          <div className="flex items-center gap-6 px-4 bg-surface-gray border-b border-gray-200 shrink-0 overflow-x-auto hide-scrollbar">
            <button className={getTabClass('description')} onClick={() => setActiveTab('description')}>Description</button>
            <button className={getTabClass('discussion')} onClick={() => setActiveTab('discussion')}>Discussion</button>
            <button className={getTabClass('solutions')} onClick={() => setActiveTab('solutions')}>Solutions</button>
            <button className={getTabClass('submissions')} onClick={() => setActiveTab('submissions')}>Submissions</button>
            <button className={getTabClass('test-result')} onClick={() => setActiveTab('test-result')}>Test Result</button>
          </div>
          
          {/* Tab Contents */}
          <div className="flex-grow overflow-y-auto p-6" id="tab-contents">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div id="tab-description" className="block space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-text-main">1. Two Sum</h1>
                  <span className="bg-green-50 border border-green-200 text-brand-green px-3 py-1 rounded-full text-xs font-bold">Easy</span>
                </div>
                <div className="space-y-4 text-base text-text-main leading-relaxed">
                  <p>Given an array of integers <code className="bg-surface-gray px-1.5 py-0.5 rounded text-sm text-brand-blue font-mono border border-gray-200">nums</code> and an integer <code className="bg-surface-gray px-1.5 py-0.5 rounded text-sm text-brand-blue font-mono border border-gray-200">target</code>, return indices of the two numbers such that they add up to <code className="bg-surface-gray px-1.5 py-0.5 rounded text-sm text-brand-blue font-mono border border-gray-200">target</code>.</p>
                  <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
                  <p>You can return the answer in any order.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Example 1:</h3>
                  <div className="bg-surface-gray rounded-lg p-4 font-mono text-sm border border-gray-200 space-y-2">
                    <div><span className="font-bold text-brand-blue">Input:</span> nums = [2,7,11,15], target = 9</div>
                    <div><span className="font-bold text-brand-blue">Output:</span> [0,1]</div>
                    <div><span className="font-bold text-brand-blue">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Constraints:</h3>
                  <ul className="list-disc list-inside space-y-2 text-text-main bg-surface-gray p-4 rounded-lg border border-gray-200">
                    <li><code className="font-mono text-sm">2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
                    <li><code className="font-mono text-sm">-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
                    <li><code className="font-mono text-sm">-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
                    <li><strong>Only one valid answer exists.</strong></li>
                  </ul>
                </div>
                <details className="group bg-surface-gray rounded-lg border border-gray-200">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-brand-blue">
                    Show Hint
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="p-4 border-t border-gray-200 text-text-muted text-sm leading-relaxed bg-surface">
                    A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.
                  </div>
                </details>
              </div>
            )}

            {/* Discussion Tab */}
            {activeTab === 'discussion' && (
              <div id="tab-discussion" className="block space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-brand-blue">Discussion</h2>
                </div>
                
                {/* Comment Input Box */}
                <form onSubmit={handleAddComment} className="bg-surface border border-gray-200 rounded-lg p-3 shadow-sm flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white text-xs font-bold shrink-0">ME</div>
                  <div className="flex-grow space-y-2">
                    <textarea 
                      className="w-full bg-surface-gray border border-gray-200 rounded-lg p-2 text-sm text-text-main focus:ring-primary focus:border-primary outline-none resize-none" 
                      rows={2} 
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm active:scale-95">Comment</button>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border border-gray-200 rounded-lg p-4 bg-surface space-y-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${comment.avatarBg} flex items-center justify-center text-white text-sm font-bold`}>
                          {comment.avatarInitials}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-text-main">{comment.author}</div>
                          <div className="text-xs text-text-muted">{comment.time}</div>
                        </div>
                      </div>
                      <p className="text-sm text-text-main">{comment.text}</p>
                      <div className="flex gap-4 text-text-muted text-sm font-medium">
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">thumb_up</span> {comment.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">chat_bubble</span> Reply
                        </button>
                      </div>
                      
                      {comment.replies && comment.replies.map((reply) => (
                        <div key={reply.id} className="ml-10 mt-3 pl-4 border-l-2 border-primary space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${reply.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
                              {reply.avatarInitials}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-text-main">{reply.author}</div>
                              <div className="text-xs text-text-muted">{reply.time}</div>
                            </div>
                          </div>
                          <p className="text-sm text-text-main">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Solutions Tab */}
            {activeTab === 'solutions' && (
              <div id="tab-solutions" className="block space-y-6">
                <h2 className="text-xl font-bold text-brand-blue">Solutions</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-surface-gray px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-brand-green">check_circle</span>
                      <span className="font-bold text-text-main">Java - One Pass HashMap</span>
                    </div>
                    <span className="text-sm text-text-muted">By Jane Smith</span>
                  </div>
                  <div className="p-4 bg-white text-gray-800 font-mono text-sm overflow-x-auto custom-scroll">
                    <pre>
                      <code>
                        <span className="text-purple-600">class</span> <span className="text-teal-600">Solution</span> {'{\n'}
                        {'    '}<span className="text-purple-600">public</span> <span className="text-blue-600">int</span>[] <span className="text-blue-600">twoSum</span>(<span className="text-blue-600">int</span>[] <span className="text-sky-600">nums</span>, <span className="text-blue-600">int</span> <span className="text-sky-600">target</span>) {'{\n'}
                        {'        '}<span className="text-teal-600">Map</span>&lt;<span className="text-teal-600">Integer</span>, <span className="text-teal-600">Integer</span>&gt; <span className="text-sky-600">map</span> = <span className="text-purple-600">new</span> <span className="text-teal-600">HashMap</span>&lt;&gt;();{"\n"}
                        {'        '}<span className="text-purple-600">for</span> (<span className="text-blue-600">int</span> <span className="text-sky-600">i</span> = <span className="text-orange-600">0</span>; <span className="text-sky-600">i</span> &lt; <span className="text-sky-600">nums</span>.length; <span className="text-sky-600">i</span>++) {'{\n'}
                        {'            '}<span className="text-blue-600">int</span> <span className="text-sky-600">complement</span> = <span className="text-sky-600">target</span> - <span className="text-sky-600">nums</span>[<span className="text-sky-600">i</span>];{"\n"}
                        {'            '}<span className="text-purple-600">if</span> (<span className="text-sky-600">map</span>.<span className="text-blue-600">containsKey</span>(<span className="text-sky-600">complement</span>)) {'{\n'}
                        {'                '}<span className="text-purple-600">return</span> <span className="text-purple-600">new</span> <span className="text-blue-600">int</span>[] {'{'} <span className="text-sky-600">map</span>.<span className="text-blue-600">get</span>(<span className="text-sky-600">complement</span>), <span className="text-sky-600">i</span> {'}'};{"\n"}
                        {'            '}{'}\n'}
                        {'            '}<span className="text-sky-600">map</span>.<span className="text-blue-600">put</span>(<span className="text-sky-600">nums</span>[<span className="text-sky-600">i</span>], <span className="text-sky-600">i</span>);{"\n"}
                        {'        '}{'}\n'}
                        {'        '}<span className="text-purple-600">return</span> <span className="text-purple-600">new</span> <span className="text-blue-600">int</span>[] {'{}'};{"\n"}
                        {'    '}{'}\n'}
                        {'}'}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Submissions Tab */}
            {activeTab === 'submissions' && (
              <div id="tab-submissions" className="block space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-brand-blue">Submissions</h2>
                </div>
                <div className="bg-surface border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="overflow-x-auto custom-scroll">
                    <table className="w-full text-left border-collapse whitespace-nowrap min-w-[600px]">
                      <thead>
                        <tr className="bg-surface-gray border-b border-gray-200 text-text-muted text-xs font-bold uppercase tracking-wider">
                          <th className="p-4 w-1/3">Status</th>
                          <th className="p-4">Language</th>
                          <th className="p-4">Runtime</th>
                          <th className="p-4">Memory</th>
                          <th className="p-4 text-right">Time Submitted</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium text-text-main divide-y divide-gray-100">
                        {submissions.map((sub, sIdx) => (
                          <tr key={sIdx} className="hover:bg-surface-gray/50 transition-colors cursor-pointer group">
                            <td className="p-4">
                              <span className={`${sub.statusClass} font-bold group-hover:underline`}>{sub.status}</span>
                            </td>
                            <td className="p-4 text-text-muted">{sub.lang}</td>
                            <td className="p-4">{sub.runtime}</td>
                            <td className="p-4">{sub.memory}</td>
                            <td className="p-4 text-right text-text-muted">{sub.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Test Result Tab */}
            {activeTab === 'test-result' && (
              <div id="tab-test-result" className="block space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-brand-blue">Test Result</h2>
                  <div className="text-sm font-medium text-text-muted">20 Testcases</div>
                </div>
                
                <div className="space-y-3" id="testcases-container">
                  {Array.from({ length: 20 }, (_, index) => {
                    const i = index + 1;
                    const isAccepted = ![4, 13, 19].includes(i);
                    const iconBg = isAccepted ? 'bg-green-100' : 'bg-red-100';
                    const iconColor = isAccepted ? 'text-brand-green' : 'text-red-600';
                    const iconName = isAccepted ? 'check' : 'close';
                    const expectedOutput = '[0,1]';
                    const actualOutput = isAccepted ? '[0,1]' : '[1,2]';
                    
                    return (
                      <details key={i} className="group border border-gray-200 rounded-lg bg-surface shadow-sm overflow-hidden">
                        <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-text-main hover:bg-surface-gray transition-colors list-none">
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full ${iconBg} ${iconColor} flex items-center justify-center`}>
                              <span className="material-symbols-outlined text-[16px]">{iconName}</span>
                            </span>
                            <span className="font-bold text-text-main">Testcase {i}</span>
                          </div>
                          <span className="text-primary text-sm font-medium hover:underline group-open:hidden">View Details</span>
                          <span className="text-primary text-sm font-medium hover:underline hidden group-open:block">Hide Details</span>
                        </summary>
                        <div className="p-4 border-t border-gray-100 bg-surface space-y-4">
                          <div>
                            <div className="text-xs text-text-muted font-bold uppercase mb-1">Input</div>
                            <div className="bg-surface-gray p-3 rounded-lg font-mono text-sm border border-gray-200">
                              nums = [2,7,11,15]<br />target = 9
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-text-muted font-bold uppercase mb-1">Output</div>
                            <div className={`${isAccepted ? 'bg-surface-gray' : 'bg-red-50 text-red-600 border-red-200'} p-3 rounded-lg font-mono text-sm border border-gray-200`}>
                              {actualOutput}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-text-muted font-bold uppercase mb-1">Expected</div>
                            <div className="bg-green-50 p-3 rounded-lg font-mono text-sm border border-green-200 text-brand-green">
                              {expectedOutput}
                            </div>
                          </div>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resizer */}
        <div 
          id="resizer" 
          className={`resizer shrink-0 ${isResizing ? 'dragging' : ''}`} 
          title="Drag to resize"
          onMouseDown={startResizing}
        ></div>

        {/* Right Pane */}
        <div id="right-pane" className="flex flex-col bg-surface border-l border-gray-200 overflow-hidden relative" style={{ width: `${100 - leftWidth}%` }}>
          {/* Editor Header */}
          <div className="flex items-center justify-between p-2 bg-surface border-b border-gray-200 shrink-0">
            <div className="flex items-center gap-2">
              <select 
                value={selectedLang}
                onChange={handleLangChange}
                className="bg-surface-gray border border-gray-300 text-text-main text-sm rounded-md focus:ring-primary focus:border-primary block px-3 py-1.5 font-medium cursor-pointer outline-none"
              >
                <option value="Java">Java</option>
                <option value="Python 3">Python 3</option>
                <option value="C++">C++</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </div>
            <div className="flex gap-1 text-text-muted">
              <button 
                onClick={handleResetCode}
                aria-label="Reset Code" 
                className="p-1.5 hover:bg-surface-gray rounded transition-colors text-text-main hover:text-primary" 
                title="Reset Code"
              >
                <span className="material-symbols-outlined text-[20px]">refresh</span>
              </button>
              <button 
                onClick={() => setSettingsOpen(!settingsOpen)}
                aria-label="Settings" 
                className="p-1.5 hover:bg-surface-gray rounded transition-colors text-text-main hover:text-primary" 
                title="Editor Settings"
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </button>
            </div>
          </div>

          {/* Inline settings modal inside editor panel */}
          {settingsOpen && (
            <div className="absolute right-2 top-12 bg-white rounded border border-gray-200 shadow-md p-3 z-50 text-xs w-48 space-y-2">
              <div className="font-bold text-text-main mb-1">Editor Settings</div>
              <div className="flex justify-between items-center">
                <span>Tab Size</span>
                <select className="border border-gray-200 rounded p-1">
                  <option>4 spaces</option>
                  <option>2 spaces</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span>Key Binding</span>
                <select className="border border-gray-200 rounded p-1">
                  <option>Standard</option>
                  <option>Vim</option>
                </select>
              </div>
            </div>
          )}

          {/* Editor Area (White theme) */}
          <div className="flex-grow flex overflow-y-auto custom-scroll text-[15px] leading-relaxed font-mono text-gray-800 bg-white">
            {/* Line Numbers */}
            <div className="w-12 flex flex-col items-end py-4 pr-3 text-gray-400 bg-surface-gray border-r border-gray-200 select-none shrink-0">
              {Array.from({ length: 15 }, (_, i) => (
                <span key={i + 1}>{i + 1}</span>
              ))}
            </div>
            {/* Code */}
            <div 
              className="flex-grow py-4 pl-4 overflow-x-auto custom-scroll whitespace-pre outline-none" 
              contentEditable={true}
              suppressContentEditableWarning={true}
              spellCheck={false}
              dangerouslySetInnerHTML={{ __html: codeHtml }}
              onBlur={(e) => setCodeHtml(e.currentTarget.innerHTML)}
            />
          </div>

          {/* Action Bar (Removed Run Code, kept Submit) */}
          <div className="p-3 bg-surface border-t border-gray-200 flex justify-end gap-3 shrink-0">
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2 bg-brand-green hover:bg-[#3d8c38] text-white rounded-lg font-bold transition-colors shadow-sm text-sm active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
