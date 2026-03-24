import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

// Temporary mock data
const initialData = {
  studentName: 'Shyam',
  pendingFees: 12000,
  penalties: 500,
  securityDeposit: 10000,
  feeHistory: [
    { id: 'REC001', date: '2023-08-15', amount: 45000, type: 'Semester Fee', status: 'Paid' },
    { id: 'REC002', date: '2023-08-16', amount: 5000, type: 'Mess Fee', status: 'Paid' }
  ]
};

function Fees() {
  const [data, setData] = useState(initialData);

  const handlePayFees = () => {
    if (data.pendingFees === 0) {
      alert("No pending fees to pay. You're all caught up!");
      return;
    }
    const confirm = window.confirm(`Redirecting to secure payment gateway to pay ₹${data.pendingFees.toLocaleString('en-IN')}. Continue?`);
    if (confirm) {
      setData(prev => ({
        ...prev,
        pendingFees: 0,
        feeHistory: [
          {
            id: `REC00${prev.feeHistory.length + 1}`,
            date: new Date().toISOString().split('T')[0],
            amount: prev.pendingFees,
            type: 'Semester Fee',
            status: 'Paid'
          },
          ...prev.feeHistory
        ]
      }));
      alert("Payment Successful! Your fee receipt has been generated.");
    }
  };

  const handlePayPenalties = () => {
    if (data.penalties === 0) {
      alert("No penalties to pay. Great job!");
      return;
    }
    const confirm = window.confirm(`Redirecting to payment gateway to pay penalty of ₹${data.penalties.toLocaleString('en-IN')}. Continue?`);
    if (confirm) {
      setData(prev => ({
        ...prev,
        penalties: 0,
        feeHistory: [
          {
            id: `REC00${prev.feeHistory.length + 1}`,
            date: new Date().toISOString().split('T')[0],
            amount: prev.penalties,
            type: 'Penalty',
            status: 'Paid'
          },
          ...prev.feeHistory
        ]
      }));
      alert("Penalty Paid successfully.");
    }
  };

  const handleDeductFromDeposit = () => {
    if (data.penalties === 0) {
      alert("No penalties to deduct.");
      return;
    }
    if (data.securityDeposit < data.penalties) {
      alert("Insufficient security deposit to cover the penalties.");
      return;
    }
    const confirm = window.confirm(
      `Are you sure you want to deduct ₹${data.penalties.toLocaleString('en-IN')} from your Security Deposit (₹${data.securityDeposit.toLocaleString('en-IN')}) to clear your penalties?`
    );
    if (confirm) {
      setData(prev => ({
        ...prev,
        securityDeposit: prev.securityDeposit - prev.penalties,
        penalties: 0,
        feeHistory: [
          {
            id: `REC00${prev.feeHistory.length + 1}`,
            date: new Date().toISOString().split('T')[0],
            amount: prev.penalties,
            type: 'Penalty (Deducted from Deposit)',
            status: 'Settled'
          },
          ...prev.feeHistory
        ]
      }));
      alert("Penalty successfully deducted from your security deposit.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Fee Management
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Manage your hostel fees, view receipts, and clear pending dues.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Hi, {data.studentName}</span>
            <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xl shadow-sm">
              🧑‍🎓
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Pending Fees Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl">
                  📉
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${data.pendingFees > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {data.pendingFees > 0 ? 'Action Required' : 'All Clear'}
                </span>
              </div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pending Semester Fees</h2>
              <div className="text-3xl font-bold text-gray-900 mt-2">
                ₹{data.pendingFees.toLocaleString('en-IN')}
              </div>
            </div>
            {data.pendingFees > 0 && (
              <button 
                onClick={handlePayFees}
                className="mt-6 w-full py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
              >
                Pay Fees Now
              </button>
            )}
          </div>

          {/* Penalties Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-2xl">
                  ⚠️
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${data.penalties > 0 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                  {data.penalties > 0 ? 'Due' : 'None'}
                </span>
              </div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Penalties</h2>
              <div className="text-3xl font-bold text-gray-900 mt-2">
                ₹{data.penalties.toLocaleString('en-IN')}
              </div>
            </div>
            {data.penalties > 0 && (
              <div className="mt-6 flex flex-col gap-2">
                <button 
                  onClick={handlePayPenalties}
                  className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
                >
                  Pay Penalty
                </button>
                <button 
                  onClick={handleDeductFromDeposit}
                  className="w-full py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors"
                >
                  Deduct from Deposit
                </button>
              </div>
            )}
          </div>

          {/* Security Deposit Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-2xl">
                  🛡️
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
                  Refundable
                </span>
              </div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Security Deposit Balance</h2>
              <div className="text-3xl font-bold text-gray-900 mt-2">
                ₹{data.securityDeposit.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="mt-6 text-xs text-gray-400 leading-relaxed">
              This deposit is fully refundable at the end of your tenure, provided there are no outstanding damages or unpaid penalties.
            </div>
          </div>

        </div>

        {/* Payment History / Receipts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Payment Receipts</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Download All <span className="text-lg">⬇️</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Receipt ID</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Date</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Type</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Amount</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.feeHistory.map((receipt, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                    <td className="px-6 py-4 font-medium text-gray-900">{receipt.id}</td>
                    <td className="px-6 py-4 text-gray-500">{receipt.date}</td>
                    <td className="px-6 py-4">{receipt.type}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">₹{receipt.amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        receipt.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        receipt.status === 'Settled' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {receipt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-500 hover:text-blue-700 font-medium text-sm transition-colors">
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
                {data.feeHistory.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                      No payment history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Fees;
