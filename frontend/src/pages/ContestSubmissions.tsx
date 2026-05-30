import React from 'react';

export const ContestSubmissions: React.FC = () => {

  return (
    <main className="w-full px-4 sm:px-8 py-8 md:py-12 bg-surface-gray flex-grow">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-headline text-headline-lg text-text-main mb-8">Submissions</h1>
          
          {/* Table Container */}
          <div className="bg-surface rounded-xl shadow-sm border border-gray-200 overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-gray text-text-main font-label text-label-md border-b border-gray-200 uppercase tracking-wider text-xs">
                    <th className="px-6 py-4 whitespace-nowrap text-text-main font-semibold">When</th>
                    <th className="px-6 py-4 whitespace-nowrap text-text-main font-semibold">User</th>
                    <th className="px-6 py-4 whitespace-nowrap text-center text-text-main font-semibold">Problem</th>
                    <th className="px-6 py-4 whitespace-nowrap text-text-main font-semibold">Status</th>
                    <th className="px-6 py-4 whitespace-nowrap text-right text-text-main font-semibold">Time</th>
                    <th className="px-6 py-4 whitespace-nowrap text-right text-text-main font-semibold">Memory</th>
                    <th className="px-6 py-4 whitespace-nowrap text-text-main font-semibold">Language</th>
                  </tr>
                </thead>
                <tbody className="font-body text-body-md text-text-main divide-y divide-gray-200">
                  {/* Row 1 */}
                  <tr className="hover:bg-surface-gray/50 transition-colors">
                    <td className="px-6 py-4 text-text-muted text-sm whitespace-nowrap">Oct 28, 2024, 10:45:12 AM</td>
                    <td className="px-6 py-4 font-medium text-text-main">CodeNinja_99</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-gray text-text-main font-semibold">A</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green font-label text-sm font-semibold">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Accepted
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-text-muted">12ms</td>
                    <td className="px-6 py-4 text-right text-text-muted">2.4 MB</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-gray text-text-muted text-xs font-medium">C++</span>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-surface-gray/50 transition-colors">
                    <td className="px-6 py-4 text-text-muted text-sm whitespace-nowrap">Oct 28, 2024, 10:42:05 AM</td>
                    <td className="px-6 py-4 font-medium text-text-main">AlgorithmAce</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-gray text-text-main font-semibold">C</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-light text-primary font-label text-sm font-semibold">
                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                        Wrong Answer
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-text-muted">4ms</td>
                    <td className="px-6 py-4 text-right text-text-muted">1.8 MB</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-gray text-text-muted text-xs font-medium">Python 3</span>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-surface-gray/50 transition-colors">
                    <td className="px-6 py-4 text-text-muted text-sm whitespace-nowrap">Oct 28, 2024, 10:38:50 AM</td>
                    <td className="px-6 py-4 font-medium text-text-main">ByteMe</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-gray text-text-main font-semibold">B</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-light text-primary font-label text-sm font-semibold">
                        <span className="material-symbols-outlined text-[18px]">timer</span>
                        Time Limit Exceeded
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-text-muted">&gt;2000ms</td>
                    <td className="px-6 py-4 text-right text-text-muted">15.2 MB</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-gray text-text-muted text-xs font-medium">Java</span>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="hover:bg-surface-gray/50 transition-colors">
                    <td className="px-6 py-4 text-text-muted text-sm whitespace-nowrap">Oct 28, 2024, 10:35:12 AM</td>
                    <td className="px-6 py-4 font-medium text-text-main">DataStructura</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-gray text-text-main font-semibold">A</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green font-label text-sm font-semibold">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Accepted
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-text-muted">45ms</td>
                    <td className="px-6 py-4 text-right text-text-muted">4.1 MB</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-gray text-text-muted text-xs font-medium">Python 3</span>
                    </td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="hover:bg-surface-gray/50 transition-colors">
                    <td className="px-6 py-4 text-text-muted text-sm whitespace-nowrap">Oct 28, 2024, 10:30:01 AM</td>
                    <td className="px-6 py-4 font-medium text-text-main">GraphMaster</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-gray text-text-main font-semibold">D</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-600 font-label text-sm font-semibold">
                        <span className="material-symbols-outlined text-[18px]">error</span>
                        Compilation Error
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-text-muted">-</td>
                    <td className="px-6 py-4 text-right text-text-muted">-</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-gray text-text-muted text-xs font-medium">C++</span>
                    </td>
                  </tr>
                  {/* Row 6 */}
                  <tr className="hover:bg-surface-gray/50 transition-colors">
                    <td className="px-6 py-4 text-text-muted text-sm whitespace-nowrap">Oct 28, 2024, 10:25:44 AM</td>
                    <td className="px-6 py-4 font-medium text-text-main">CodeNinja_99</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-gray text-text-main font-semibold">B</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green font-label text-sm font-semibold">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Accepted
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-text-muted">8ms</td>
                    <td className="px-6 py-4 text-right text-text-muted">2.1 MB</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-gray text-text-muted text-xs font-medium">C++</span>
                    </td>
                  </tr>
                  {/* Row 7 */}
                  <tr className="hover:bg-surface-gray/50 transition-colors">
                    <td className="px-6 py-4 text-text-muted text-sm whitespace-nowrap">Oct 28, 2024, 10:20:10 AM</td>
                    <td className="px-6 py-4 font-medium text-text-main">LogicLord</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-gray text-text-main font-semibold">A</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-light text-primary font-label text-sm font-semibold">
                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                        Wrong Answer
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-text-muted">15ms</td>
                    <td className="px-6 py-4 text-right text-text-muted">3.4 MB</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-gray text-text-muted text-xs font-medium">Java</span>
                    </td>
                  </tr>
                  {/* Row 8 */}
                  <tr className="hover:bg-surface-gray/50 transition-colors">
                    <td className="px-6 py-4 text-text-muted text-sm whitespace-nowrap">Oct 28, 2024, 10:15:22 AM</td>
                    <td className="px-6 py-4 font-medium text-text-main">AlgorithmAce</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-gray text-text-main font-semibold">C</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green font-label text-sm font-semibold">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Accepted
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-text-muted">88ms</td>
                    <td className="px-6 py-4 text-right text-text-muted">18.9 MB</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-gray text-text-muted text-xs font-medium">Python 3</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
              <span className="text-sm text-text-muted">Showing 1 to 8 of 245 submissions</span>
              <div className="flex gap-2">
                <button className="p-1 rounded text-text-muted hover:bg-surface-gray hover:text-primary transition-colors disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-1 rounded text-text-muted hover:bg-surface-gray hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
};
