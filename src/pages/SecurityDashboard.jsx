import React from 'react';
import Sidebar from '../components/Sidebar';

export default function SecurityDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Security" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Security Portal
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Log exit queries, record student nuisances, and handle lost & found items.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Hi, Security Desk</span>
            <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xl shadow-sm">
              👮
            </div>
          </div>
        </div>

        {/* Action Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Long Leave Exit */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Log Leave Exit</h2>
              <p className="text-sm text-gray-500 mt-2">
                Scan barcode or enter Roll No to record a student officially leaving the premises for a long leave.
              </p>
            </div>
            <button className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-colors">
              Log Exit Data
            </button>
          </div>

          {/* Card 2: Student Nuisance */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Report Nuisance</h2>
              <p className="text-sm text-gray-500 mt-2">
                Report instances of student misbehavior, curfew violations, or disturbances directly to the Warden.
              </p>
            </div>
            <button className="mt-6 w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium text-sm transition-colors">
              File a Report
            </button>
          </div>

          {/* Card 3: Lost & Found */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Lost & Found</h2>
              <p className="text-sm text-gray-500 mt-2">
                Deposit found items or search the database for items reported missing by students inside the campus.
              </p>
            </div>
            <button className="mt-6 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium text-sm transition-colors">
              Manage Items
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
