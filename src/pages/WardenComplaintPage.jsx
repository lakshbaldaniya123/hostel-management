import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { ComplaintContext } from '../context/ComplaintContext';

export default function WardenComplaintPage({ fixedRole = "Warden" }) {
  const { complaints, resolveComplaint } = useContext(ComplaintContext);

  const [roleFilter, setRoleFilter] = useState('All'); // All, Student, Staff
  const [statusFilter, setStatusFilter] = useState('Pending'); // All, Pending, Resolved

  const filteredComplaints = complaints.filter(c => {
    const matchRole = roleFilter === 'All' ? true : c.userType === roleFilter;
    const matchStatus = statusFilter === 'All' ? true : c.status === statusFilter;
    return matchRole && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role={fixedRole} />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hostel Grievances</h1>
            <p className="text-sm text-gray-500 mt-2">
              Review and resolve complaints raised by students and staff members across the premises.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Role Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 flex overflow-x-auto">
              {['All', 'Student', 'Security'].map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${roleFilter === role ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {role === 'All' ? 'All Roles' : role}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 flex">
              {['Pending', 'Resolved', 'All'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${statusFilter === status ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No reports to show</h3>
              <p className="text-sm">There are no {statusFilter.toLowerCase()} complaints from {roleFilter === 'All' ? 'anyone' : roleFilter.toLowerCase() + 's'}.</p>
            </div>
          ) : (
            filteredComplaints.map(req => (
              <div key={req.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">

                {/* Decorative blob for role */}
                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 ${req.userType === 'Student' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>

                <div className="relative z-10 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${req.userType === 'Student' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                        {req.userType}
                      </span>
                      {req.roomNo && <span className="ml-2 text-xs font-bold text-gray-400">ROOM {req.roomNo}</span>}
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${req.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 animate-pulse'
                      }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{req.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-gray-500">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                      <span className="text-xs font-semibold">{req.mobile}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6 relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200 absolute top-3 left-3"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></svg>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed pl-8 relative z-10 italic">
                      {req.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200/50 pl-8">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logged {new Date(req.registeredAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 mt-auto relative z-10">
                  {req.status === 'Pending' ? (
                    <button
                      onClick={() => resolveComplaint(req.id)}
                      className="w-full py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Mark as Resolved
                    </button>
                  ) : (
                    <button disabled className="w-full py-3.5 bg-green-50 text-green-700 rounded-xl text-sm font-bold border-2 border-green-100 cursor-not-allowed flex items-center justify-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Resolved
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
