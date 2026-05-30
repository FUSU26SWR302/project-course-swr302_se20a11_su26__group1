import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const JAVA_TEMPLATE = `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        
    }
}`;

const PYTHON_TEMPLATE = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass`;

const CPP_TEMPLATE = `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`;

export const ContestProblemSolve: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contestId = id || '42';

  const [selectedLang, setSelectedLang] = useState<string>('Java');
  const [codeText, setCodeText] = useState<string>(JAVA_TEMPLATE);
  const [editorStatus, setEditorStatus] = useState<'Accepted' | 'Running' | 'Success'>('Accepted');
  
  // Floating Toast Alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Success Overlay
  const [showSuccessOverlay, setShowSuccessOverlay] = useState<boolean>(false);

  const handleLangChange = (lang: string) => {
    setSelectedLang(lang);
    if (lang === 'Java') {
      setCodeText(JAVA_TEMPLATE);
    } else if (lang === 'Python 3') {
      setCodeText(PYTHON_TEMPLATE);
    } else if (lang === 'C++') {
      setCodeText(CPP_TEMPLATE);
    }
  };

  const handleReset = () => {
    if (selectedLang === 'Java') {
      setCodeText(JAVA_TEMPLATE);
    } else if (selectedLang === 'Python 3') {
      setCodeText(PYTHON_TEMPLATE);
    } else if (selectedLang === 'C++') {
      setCodeText(CPP_TEMPLATE);
    }
    setEditorStatus('Accepted');
    showToast('Code editor has been reset to default template.');
  };

  const handleSettings = () => {
    showToast('Editor Settings: Font Size and Keybindings can be modified in your account profile.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSubmit = () => {
    setEditorStatus('Running');
    showToast('Submitting solution... Evaluating sample cases...');
    setTimeout(() => {
      setEditorStatus('Success');
      setShowSuccessOverlay(true);
      showToast('All test cases passed successfully!');
    }, 2000);
  };

  const lineCount = Math.max(codeText.split('\n').length, 6);

  return (
    <>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-brand-blue text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 border border-brand-blue-light animate-fade-in">
          <span className="material-symbols-outlined text-[18px] text-primary">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Success Modal overlay */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99] flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl border border-slate-200/50 relative z-[100] space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-green-50 text-brand-green flex items-center justify-center border border-green-200 mx-auto animate-bounce">
              <span className="material-symbols-outlined text-4xl icon-fill text-brand-green">emoji_events</span>
            </div>
            <h3 className="font-display font-black text-xl text-brand-blue">Contest Solved!</h3>
            <p className="font-body text-sm text-text-muted">
              Your solution has successfully passed all automated test cases for this contest task!
            </p>
            <div className="bg-surface-gray border border-gray-150 p-3 rounded-xl font-mono text-xs text-left space-y-1">
              <div className="flex justify-between">
                <strong>Status:</strong> <span className="text-brand-green font-bold">Passed</span>
              </div>
              <div className="flex justify-between">
                <strong>Runtime:</strong> <span>12 ms (Beats 98.4%)</span>
              </div>
              <div className="flex justify-between">
                <strong>Memory:</strong> <span>39.8 MB (Beats 91.2%)</span>
              </div>
            </div>
            <button
              onClick={() => {
                setShowSuccessOverlay(false);
                navigate(`/contests/${contestId}/problems`);
              }}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2 rounded-xl transition-all shadow-md text-xs uppercase"
            >
              Back to Problems
            </button>
          </div>
        </div>
      )}

      {/* Main Content (Left 85%) */}
      <main className="w-full bg-surface-gray flex flex-col gap-8 pr-0 md:pr-6 pb-8">
        {/* Left Column: Description */}
        <div className="w-full flex flex-col bg-surface border border-gray-200 rounded-lg">
          <div className="p-6 md:p-8 space-y-8">
            <Link
              to={`/contests/${contestId}/problems`}
              className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm font-medium mb-4 group w-max"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Back to Problems
            </Link>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-headline font-bold text-text-main">Two Sum Challenge</h1>
            </div>
            <div className="space-y-4 text-text-main text-base leading-relaxed">
              <p>
                Given an array of integers{' '}
                <code className="bg-surface-gray px-1.5 py-0.5 rounded text-sm text-brand-blue font-mono border border-gray-200">
                  nums
                </code>{' '}
                and an integer{' '}
                <code className="bg-surface-gray px-1.5 py-0.5 rounded text-sm text-brand-blue font-mono border border-gray-200">
                  target
                </code>
                , return indices of the two numbers such that they add up to{' '}
                <code className="bg-surface-gray px-1.5 py-0.5 rounded text-sm text-brand-blue font-mono border border-gray-200">
                  target
                </code>
                .
              </p>
              <p>
                You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the
                same element twice.
              </p>
              <p>You can return the answer in any order.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 text-text-main">Example 1:</h3>
              <div className="bg-brand-blue text-white rounded-lg p-5 font-mono text-sm shadow-sm space-y-2">
                <div>
                  <span className="text-gray-400 select-none">Input:</span> nums = [2,7,11,15], target = 9
                </div>
                <div>
                  <span className="text-gray-400 select-none">Output:</span> [0,1]
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-400 select-none">Explanation:</span> Because nums[0] + nums[1] == 9, we
                  return [0, 1].
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 text-text-main">Constraints:</h3>
              <ul className="list-disc list-inside space-y-2 text-text-main bg-surface-gray p-5 rounded-lg border border-gray-200">
                <li>
                  <code className="font-mono text-sm">2 &lt;= nums.length &lt;= 10<sup>4</sup></code>
                </li>
                <li>
                  <code className="font-mono text-sm">-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code>
                </li>
                <li>
                  <code className="font-mono text-sm">-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code>
                </li>
                <li>
                  <strong>Only one valid answer exists.</strong>
                </li>
              </ul>
            </div>
            <details className="group bg-surface-gray rounded-lg border border-gray-200">
              <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-text-main">
                Show Hint
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="p-4 border-t border-gray-200 text-text-muted text-sm leading-relaxed bg-surface">
                A really brute force way would be to search for all possible pairs of numbers but that would be too
                slow. Again, it's best to try out brute force solutions for just for completeness. It is from these
                brute force solutions that you can come up with optimizations.
              </div>
            </details>
          </div>
        </div>

        {/* Right Column: Code Editor */}
        <div className="w-full flex flex-col bg-white border border-gray-200 rounded-lg min-h-[400px] h-auto overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center justify-between p-2 bg-surface border-b border-gray-200">
            <div className="flex items-center gap-3">
              <select
                value={selectedLang}
                onChange={(e) => handleLangChange(e.target.value)}
                className="bg-surface-gray border border-gray-300 text-text-main text-sm rounded-md focus:ring-primary focus:border-primary block px-3 py-1.5 font-medium cursor-pointer outline-none"
              >
                <option value="Java">Java</option>
                <option value="Python 3">Python 3</option>
                <option value="C++">C++</option>
              </select>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="text-text-muted">Status:</span>
                {editorStatus === 'Accepted' && (
                  <span className="text-brand-green bg-green-50 px-2 py-0.5 rounded border border-green-200">
                    Accepted
                  </span>
                )}
                {editorStatus === 'Running' && (
                  <span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-250 animate-pulse">
                    Running Tests...
                  </span>
                )}
                {editorStatus === 'Success' && (
                  <span className="text-brand-green bg-green-55 px-2 py-0.5 rounded border border-green-200 animate-bounce">
                    Passed!
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1 text-text-muted">
              <button
                onClick={handleReset}
                aria-label="Reset"
                className="p-1.5 hover:bg-surface-gray rounded transition-colors text-text-main hover:text-primary"
              >
                <span className="material-symbols-outlined text-[20px]">refresh</span>
              </button>
              <button
                onClick={handleSettings}
                aria-label="Settings"
                className="p-1.5 hover:bg-surface-gray rounded transition-colors text-text-main hover:text-primary"
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </button>
            </div>
          </div>
          {/* Editor Area */}
          <div className="flex-grow flex text-[15px] leading-relaxed font-mono text-gray-800 bg-white min-h-[300px]">
            {/* Line Numbers */}
            <div className="w-12 flex flex-col items-end py-4 pr-3 text-gray-400 bg-surface-gray border-r border-gray-200 select-none">
              {Array.from({ length: lineCount }).map((_, i) => (
                <span key={i} className="leading-relaxed h-[22.5px] block">{i + 1}</span>
              ))}
            </div>
            {/* Code */}
            <textarea
              value={codeText}
              onChange={(e) => setCodeText(e.target.value)}
              className="flex-grow py-4 pl-4 overflow-x-auto whitespace-pre outline-none font-mono text-[15px] text-gray-800 bg-white min-h-[300px] w-full resize-none border-none focus:ring-0 focus:outline-none leading-relaxed"
              spellCheck="false"
            />
          </div>
          {/* Action Bar */}
          <div className="p-4 bg-surface border-t border-gray-200 flex justify-end gap-4 sticky bottom-0">
            <button
              onClick={handleSubmit}
              disabled={editorStatus === 'Running'}
              className={`px-6 py-2 rounded-lg font-bold transition-colors shadow-sm text-white ${
                editorStatus === 'Running'
                  ? 'bg-primary/50 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-hover'
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
