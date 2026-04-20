import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { FeesContext } from '../context/FeesContext';

export default function AdminFeesPage() {
  const { feeRecords } = useContext(FeesContext);

  const totalCollected = feeRecords.reduce((acc, rec) => 
    rec.status === 'Paid' ? acc + (rec.amount || 0) : acc
  , 0);

  const pendingAmount = feeRecords.reduce((acc, rec) => 
    rec.status === 'Pending' ? acc + (rec.amount || 0) : acc
  , 0);

  const overdueAmount = feeRecords.reduce((acc, rec) => 
    rec.status === 'Overdue' ? acc + (rec.amount || 0) : acc
  , 0);

  const totalBilled = totalCollected + pendingAmount + overdueAmount;
  const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;


  return (
    <div className="flex bg-white font-sans text-gray-800" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar role="Admin" />
      
      <main className="flex-1 flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
        <Topbar />
        
        <div className="p-8 overflow-y-auto" style={{ flex: 1 }}>
          <h1 className="text-2xl font-bold text-[#1f2937] mb-6">Fee Management</h1>
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#6b7280] font-medium text-[15px]">Total Collected</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
              </div>
              <div className="text-[28px] font-bold text-[#1f2937]">₹{totalCollected.toLocaleString('en-IN')}</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#6b7280] font-medium text-[15px]">Pending Amount</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div className="text-[28px] font-bold text-[#1f2937]">₹{pendingAmount.toLocaleString('en-IN')}</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#6b7280] font-medium text-[15px]">Overdue</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div className="text-[28px] font-bold text-[#1f2937]">₹{overdueAmount.toLocaleString('en-IN')}</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#6b7280] font-medium text-[15px]">Collection Rate</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                </svg>
              </div>
              <div className="text-[28px] font-bold text-[#1f2937]">{collectionRate}%</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-[19px] font-bold text-[#1f2937] mb-6">Fee Records</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-4 font-medium text-gray-500 text-[15px]">Student</th>
                    <th className="pb-4 font-medium text-gray-500 text-[15px]">Amount</th>
                    <th className="pb-4 font-medium text-gray-500 text-[15px]">Due Date</th>
                    <th className="pb-4 font-medium text-gray-500 text-[15px]">Paid Date</th>
                    <th className="pb-4 font-medium text-gray-500 text-[15px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feeRecords.map((record, index) => {
                    let badgeClass = '';
                    if (record.status === 'Paid') badgeClass = 'bg-[#378fa6] text-white';
                    else if (record.status === 'Pending') badgeClass = 'bg-[#f9fafb] text-[#374151] border border-gray-200';
                    else if (record.status === 'Overdue') badgeClass = 'bg-[#dc2626] text-white';

                    const amountDisplay = `₹${(record.amount || 0).toLocaleString('en-IN')}`;
                    const lastPaidDate = record.paidDate || '-';

                    return (
                      <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4">
                          <div className="font-medium text-[#1f2937] text-[15px]">{record.studentName}</div>
                          <div className="text-[13px] text-gray-400 mt-0.5">{record.studentId}</div>
                        </td>
                        <td className="py-4 text-[#1f2937] font-medium text-[15px]">{amountDisplay}</td>
                        <td className="py-4 text-gray-500 text-[15px]">{record.dueDate}</td>
                        <td className="py-4 text-gray-500 text-[15px]">{lastPaidDate}</td>
                        <td className="py-4">
                          <span className={`text-[12px] font-bold px-[12px] py-[4px] rounded-full inline-block ${badgeClass}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
