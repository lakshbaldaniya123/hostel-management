import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { FeesContext } from '../context/FeesContext';
import { useAuth } from '../context/AuthContext';

function Fees() {
  const { feeRecords, payFees, payPenalties, deductFromDeposit } = useContext(FeesContext);
  const { currentUser } = useAuth();
  
  const studentName = currentUser?.name || 'Student';
  const studentId = currentUser?.hostelId || currentUser?.studentId || 'STU-GUEST';

  const data = feeRecords.find(r => r.studentId === studentId || r.studentName === studentName);
  
  if (!data) return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto flex items-center justify-center">
        <div className="text-gray-400 font-medium">No fee records found for your account.</div>
      </main>
    </div>
  );


  const handlePayFees = () => {
    if (data.status === 'Paid') {
      alert("No pending fees to pay. You're all caught up!");
      return;
    }
    const confirm = window.confirm(`Redirecting to secure payment gateway to pay ₹${data.amount?.toLocaleString('en-IN') || 0}. Continue?`);
    if (confirm) {
      payFees(studentId);
      alert("Payment Successful! Your fee receipt will be generated.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto mt-16 md:mt-0">
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
            <span className="text-sm font-medium text-gray-600">Hi, {studentName}</span>
            <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xl shadow-sm">
              🧑‍🎓
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Pending Fees Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl">
                  📉
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${data.status !== 'Paid' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {data.status !== 'Paid' ? 'Action Required' : 'All Clear'}
                </span>
              </div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Semester Fees</h2>
              <div className="text-3xl font-bold text-gray-900 mt-2">
                ₹{data.amount?.toLocaleString('en-IN') || 0}
              </div>
            </div>
            {data.status !== 'Paid' && (
              <button 
                onClick={handlePayFees}
                className="mt-6 w-full py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
              >
                Pay Fees Now
              </button>
            )}
            {data.status === 'Paid' && (
              <button 
                disabled
                className="mt-6 w-full py-2.5 bg-green-50 text-green-600 border border-green-200 text-sm font-bold rounded-xl shadow-sm opacity-60 cursor-not-allowed"
              >
                Fully Paid on {data.paidDate ? new Date(data.paidDate).toLocaleDateString() : 'N/A'}
              </button>
            )}
          </div>

          {/* Fee Details Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Current Invoice Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Invoice ID</span>
                <span className="text-sm font-medium text-gray-900">{data.id || '--'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Semester</span>
                <span className="text-sm font-medium text-gray-900">{data.semester || '--'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Due Date</span>
                <span className="text-sm font-medium text-gray-900">{data.dueDate ? new Date(data.dueDate).toLocaleDateString() : '--'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Description</span>
                <span className="text-sm font-medium text-gray-900">{data.description || 'Hostel Maintenance & Mess'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Payment History / Receipts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Receipt ID</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Scheduled Date</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Amount</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                  <td className="px-6 py-4 font-medium text-gray-900">{data.id}</td>
                  <td className="px-6 py-4 text-gray-500">{data.paidDate ? new Date(data.paidDate).toLocaleDateString() : new Date(data.dueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">₹{data.amount?.toLocaleString('en-IN') || 0}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      data.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      data.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {data.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Fees;
