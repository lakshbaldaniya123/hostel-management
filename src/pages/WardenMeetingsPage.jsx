import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { MeetingContext } from '../context/MeetingContext';

export default function WardenMeetingsPage({ fixedRole = "Warden" }) {
  const { meetings, scheduleMeeting } = useContext(MeetingContext);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [targetRole, setTargetRole] = useState('All'); // All, Student, Housekeeper, Security

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !date || !time) return;

    scheduleMeeting({ title, description, date, time, targetRole });
    
    // reset form naturally
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setTargetRole('All');
  };

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
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Schedule Meeting</h1>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  Call for a mandatory assembly or briefing. Targeted groups will be immediately notified on their dashboard.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Target Audience</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['All', 'Student', 'Housekeeper', 'Security'].map(r => (
                      <label key={r} className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${targetRole === r ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <input type="radio" className="hidden" checked={targetRole === r} onChange={() => setTargetRole(r)} />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${targetRole === r ? 'border-indigo-500' : 'border-gray-300'}`}>
                          {targetRole === r && <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>}
                        </div>
                        <span className={`text-sm font-bold ${targetRole === r ? 'text-indigo-900' : 'text-gray-600'}`}>{r === 'Housekeeper' ? 'Cleaning Staff' : r}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Meeting Title</label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Mandatory Evacuation Drill"
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-indigo-500 focus:ring-0 outline-none transition-colors" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Date</label>
                    <input 
                      type="date" 
                      required
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-indigo-500 focus:ring-0 outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Time</label>
                    <input 
                      type="time" 
                      required
                      value={time}
                      onChange={e => setTime(e.target.value)}
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-indigo-500 focus:ring-0 outline-none transition-colors" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Agenda / Description</label>
                  <textarea 
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Briefly describe the purpose of the meeting..."
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-medium focus:border-indigo-500 focus:ring-0 outline-none transition-colors resize-none placeholder:font-normal placeholder:text-gray-300"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={!title || !description || !date || !time}
                  className="w-full bg-gray-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500"
                >
                  Broadcast Meeting
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Scheduled Briefings</h2>
            
            <div className="space-y-4">
              {meetings.length === 0 ? (
                 <div className="p-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
                   <p className="font-semibold text-sm">No meetings scheduled.</p>
                 </div>
              ) : (
                meetings.map(mtg => (
                  <div key={mtg.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden flex gap-6">
                    
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl w-24 h-24 shrink-0 border border-gray-100">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{new Date(mtg.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-2xl font-black text-gray-900 tracking-tighter">{new Date(mtg.date).getDate()}</span>
                      <span className="text-xs font-semibold text-indigo-600 mt-1">{mtg.time}</span>
                    </div>

                    <div className="flex-1 py-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{mtg.title}</h3>
                        <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border ${roleColors[mtg.targetRole] || roleColors['All']}`}>
                          {mtg.targetRole === 'Housekeeper' ? 'Cleaning Staff' : mtg.targetRole} Only
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-500 leading-relaxed mb-4">
                        {mtg.description}
                      </p>
                      <div className="flex items-center gap-2 mt-auto">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Broadcasted {new Date(mtg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
