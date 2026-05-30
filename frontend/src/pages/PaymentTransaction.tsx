import React from 'react';
import { Link } from 'react-router-dom';

export const PaymentTransaction: React.FC = () => {
  return (
    <div className="flex-grow max-w-[1280px] w-full mx-auto px-6 md:px-16 py-12 flex flex-col gap-8 text-left relative z-10">
      {/* Navigation & Balance Row */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 mb-2 pb-2 md:pb-0 gap-4">
        <div className="flex h-12 gap-6 overflow-x-auto whitespace-nowrap w-full md:w-auto">
          <Link className="text-text-muted hover:text-primary transition-colors h-full flex items-center text-sm" to="/wallet-transaction">Wallet Transaction</Link>
          <Link className="text-text-muted hover:text-primary transition-colors h-full flex items-center text-sm" to="/dashboard#deposit">Deposit</Link>
          <Link className="text-text-muted hover:text-primary transition-colors h-full flex items-center text-sm" to="/withdraw">Withdraw</Link>
          <Link className="text-primary font-bold border-b-2 border-primary h-full flex items-center text-sm" to="/payment-transaction">Payment Transaction</Link>
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

      {/* Payment Transactions Table */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(26,54,93,0.08)] overflow-hidden border border-gray-200 mb-12">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-brand-blue">Banking Transactions</h2>
          <p className="text-sm text-text-muted mt-1">Fiat deposits and withdrawals records.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-text-muted text-xs uppercase tracking-wider">
                <th className="p-4 pl-6 font-semibold">Date</th>
                <th className="p-4 font-semibold">Transaction ID</th>
                <th className="p-4 font-semibold">Method</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold text-right">Amount</th>
                <th className="p-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-text-main divide-y divide-gray-200">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">10 May 2026, 16:45</td>
                <td className="p-4 font-mono text-sm">TXN-9847291</td>
                <td className="p-4 font-medium flex items-center gap-2">
                  <img src="https://img.icons8.com/color/48/000000/bank-building.png" alt="MB Bank" className="w-5 h-5" /> MB Bank
                </td>
                <td className="p-4"><span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">Deposit</span></td>
                <td className="p-4 text-right text-brand-green font-bold">+1,000,000 ₫</td>
                <td className="p-4 text-right"><span className="text-text-muted text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span> Completed</span></td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">02 May 2026, 10:10</td>
                <td className="p-4 font-mono text-sm">TXN-1294857</td>
                <td className="p-4 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400 text-[18px]">credit_card</span> Vietcombank
                </td>
                <td className="p-4"><span className="bg-purple-100 text-purple-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">Withdrawal</span></td>
                <td className="p-4 text-right text-text-main font-bold">2,000,000 ₫</td>
                <td className="p-4 text-right"><span className="text-orange-500 text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> Pending</span></td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">20 Apr 2026, 14:22</td>
                <td className="p-4 font-mono text-sm">TXN-4927581</td>
                <td className="p-4 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400 text-[18px]">account_balance</span> BIDV
                </td>
                <td className="p-4"><span className="bg-purple-100 text-purple-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">Withdrawal</span></td>
                <td className="p-4 text-right text-text-main font-bold">3,500,000 ₫</td>
                <td className="p-4 text-right"><span className="text-text-muted text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span> Completed</span></td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">15 Mar 2026, 09:05</td>
                <td className="p-4 font-mono text-sm">TXN-8573921</td>
                <td className="p-4 font-medium flex items-center gap-2">
                  <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png" alt="VNPay" className="w-5 h-5 object-contain" /> VNPay
                </td>
                <td className="p-4"><span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">Deposit</span></td>
                <td className="p-4 text-right text-brand-green font-bold">+500,000 ₫</td>
                <td className="p-4 text-right"><span className="text-text-muted text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span> Completed</span></td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 whitespace-nowrap text-text-muted">05 Feb 2026, 21:40</td>
                <td className="p-4 font-mono text-sm">TXN-1029485</td>
                <td className="p-4 font-medium flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" className="w-5 h-5 object-contain" /> Momo E-Wallet
                </td>
                <td className="p-4"><span className="bg-purple-100 text-purple-700 text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold">Withdrawal</span></td>
                <td className="p-4 text-right text-text-main font-bold">1,000,000 ₫</td>
                <td className="p-4 text-right"><span className="text-red-600 text-sm flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[16px]">cancel</span> Failed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <span className="text-sm text-text-muted">Showing 1 to 5 of 12 entries</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-100 disabled:opacity-50"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
            <button className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center text-sm font-medium">1</button>
            <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-100 hover:text-primary text-sm font-medium">2</button>
            <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-100"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
};
