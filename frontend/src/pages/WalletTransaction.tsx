import React from 'react';
import { Link } from 'react-router-dom';

export const WalletTransaction: React.FC = () => {
  return (
    <div className="flex-grow max-w-[1280px] w-full mx-auto px-6 md:px-16 py-12 flex flex-col gap-8 text-left relative z-10">
      {/* Navigation & Balance Row */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 mb-2 pb-2 md:pb-0 gap-4">
        <div className="flex h-12 gap-6 overflow-x-auto whitespace-nowrap w-full md:w-auto">
          <Link className="text-primary font-bold border-b-2 border-primary h-full flex items-center text-sm" to="/wallet-transaction">Wallet Transaction</Link>
          <Link className="text-text-muted hover:text-primary transition-colors h-full flex items-center text-sm" to="/dashboard#deposit">Deposit</Link>
          <Link className="text-text-muted hover:text-primary transition-colors h-full flex items-center text-sm" to="/withdraw">Withdraw</Link>
          <Link className="text-text-muted hover:text-primary transition-colors h-full flex items-center text-sm" to="/payment-transaction">Payment Transaction</Link>
        </div>
        <div className="bg-white py-2 px-4 rounded-xl shadow-[0_2px_12px_rgba(26,54,93,0.06)] flex items-center gap-3 min-w-[250px] mb-2 md:mb-0 shrink-0 border border-gray-200">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl icon-fill">account_balance_wallet</span>
          </div>
          <div>
            <p className="text-[11px] text-text-muted uppercase tracking-wider font-semibold">Current Balance</p>
            <p className="text-[17px] font-bold text-brand-blue leading-none mt-0.5">2,500,000 ₫</p>
          </div>
        </div>
      </div>

      {/* Wallet Transactions Table */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(26,54,93,0.08)] overflow-hidden border border-gray-200 mb-12">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-brand-blue">Internal Transactions</h2>
          <p className="text-sm text-text-muted mt-1">History of course purchases, contest rewards, and other platform activities.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-text-muted text-xs uppercase tracking-wider">
                <th className="p-4 pl-6 font-semibold">Date</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold text-right">Amount</th>
                <th className="p-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-text-main divide-y divide-gray-200">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">15 May 2026, 14:30</td>
                <td className="p-4 font-medium">Contest #42 Reward</td>
                <td className="p-4"><span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">Reward</span></td>
                <td className="p-4 text-right text-brand-green font-bold">+500,000 ₫</td>
                <td className="p-4 text-right"><span className="text-text-muted text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span> Completed</span></td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">14 May 2026, 09:15</td>
                <td className="p-4 font-medium">Purchase: Java Masterclass 2025</td>
                <td className="p-4"><span className="bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">Course Purchase</span></td>
                <td className="p-4 text-right text-red-600 font-bold">-409,000 ₫</td>
                <td className="p-4 text-right"><span className="text-text-muted text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span> Completed</span></td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">10 May 2026, 16:45</td>
                <td className="p-4 font-medium">Deposit from Bank</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">System Deposit</span></td>
                <td className="p-4 text-right text-brand-green font-bold">+1,000,000 ₫</td>
                <td className="p-4 text-right"><span className="text-text-muted text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span> Completed</span></td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">05 May 2026, 11:20</td>
                <td className="p-4 font-medium">Purchase: Python for Beginners</td>
                <td className="p-4"><span className="bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">Course Purchase</span></td>
                <td className="p-4 text-right text-red-600 font-bold">-250,000 ₫</td>
                <td className="p-4 text-right"><span className="text-text-muted text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span> Completed</span></td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">01 May 2026, 08:00</td>
                <td className="p-4 font-medium">Refund: Cancelled Course</td>
                <td className="p-4"><span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">Refund</span></td>
                <td className="p-4 text-right text-brand-green font-bold">+150,000 ₫</td>
                <td className="p-4 text-right"><span className="text-text-muted text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span> Completed</span></td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">28 Apr 2026, 18:30</td>
                <td className="p-4 font-medium">Deposit from Momo</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">System Deposit</span></td>
                <td className="p-4 text-right text-brand-green font-bold">+500,000 ₫</td>
                <td className="p-4 text-right"><span className="text-text-muted text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span> Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <span className="text-sm text-text-muted">Showing 1 to 6 of 24 entries</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-100"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
            <button className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center text-sm font-medium">1</button>
            <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-100 hover:text-primary text-sm font-medium">2</button>
            <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-100 hover:text-primary text-sm font-medium">3</button>
            <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-100"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
};
