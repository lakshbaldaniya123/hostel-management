import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { MeetingContext } from '../context/MeetingContext';

export default function UserMeetingsPage({ fixedRole }) {
  const { meetings } = useContext(MeetingContext);

  // Strictly filter meetings targeted to the specific fixed role, or broadcasted to 'All'
  const myMeetings = meetings.filter(mtg => mtg.targetRole === fixedRole || mtg.targetRole === 'All');

  const roleColors = {
    'Student': 'bg-blue-100 text-blue-800 border-blue-200',
    'Security': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Housekeeper': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'All': 'bg-purple-100 text-purple-800 border-purple-200'
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role={fixedRole} />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">My Briefings</h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Check for any mandatory upcoming meetings scheduled by the Warden for {fixedRole === 'Housekeeper' ? 'Cleaning Staff' : fixedRole}s.
              </p>
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 opacity-10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="space-y-6">
            {myMeetings.length === 0 ? (
               <div className="py-20 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl bg-white">
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50 text-indigo-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                 <h3 className="text-lg font-bold text-gray-900 mb-1">No upcoming meetings</h3>
                 <p className="text-sm">You have no scheduled briefings at the moment.</p>
               </div>
            ) : (
              myMeetings.map(mtg => {
                const isAll = mtg.targetRole === 'All';
                return (
                  <div key={mtg.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center group">
                    
                    {/* Date Block */}
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl w-full sm:w-28 h-28 shrink-0 border border-gray-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-colors">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{new Date(mtg.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-3xl font-black text-gray-900 tracking-tighter leading-none">{new Date(mtg.date).getDate()}</span>
                      <span className="text-sm font-bold text-indigo-600 mt-2 bg-indigo-50 px-2 py-0.5 rounded-md">{mtg.time}</span>
                    </div>

                    {/* Info Block */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{mtg.title}</h3>
                        <span className={`self-start px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border ${roleColors[mtg.targetRole] || roleColors['All']}`}>
                          {isAll ? 'General Assembly' : `${mtg.targetRole === 'Housekeeper' ? 'Cleaning Staff' : mtg.targetRole} Only`}
                        </span>
                      </div>
                      
                      <p className="text-sm font-medium text-gray-600 leading-relaxed mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        {mtg.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Broadcasted {new Date(mtg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Decorative Blob */}
                    <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full blur-3xl opacity-[0.03] bg-indigo-500 pointer-events-none"></div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
