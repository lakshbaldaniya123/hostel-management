import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const DEFAULT_MENU = {
  Monday: { breakfast: 'Poha + Jalebi', lunch: 'Dal + Rice + Aloo Sabzi', snacks: 'Samosa', dinner: 'Roti + Paneer Butter Masala' },
  Tuesday: { breakfast: 'Idli + Sambar', lunch: 'Rajma + Chawal', snacks: 'Bread Pakora', dinner: 'Roti + Mix Veg' },
  Wednesday: { breakfast: 'Aloo Paratha', lunch: 'Kadi + Pakora', snacks: 'Noodles', dinner: 'Roti + Egg Curry / Dal Tadka' },
  Thursday: { breakfast: 'Upma', lunch: 'Chole + Bhature', snacks: 'Patties', dinner: 'Roti + Bhindi' },
  Friday: { breakfast: 'Sandwich', lunch: 'Dal Makhani + Rice', snacks: 'Bhel Puri', dinner: 'Roti + Malai Kofta' },
  Saturday: { breakfast: 'Puri Sabzi', lunch: 'Pulao + Raita', snacks: 'Pav Bhaji', dinner: 'Roti + Chicken / Soya Chaap' },
  Sunday: { breakfast: 'Masala Dosa', lunch: 'Special Thali', snacks: 'Pastries', dinner: 'Roti + Dal Fry' },
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WardenMessPage() {
  const [activeTab, setActiveTab] = useState('feedback');
  const [feedback, setFeedback] = useState([]);
  
  // Menu Editor State
  const [weeklyMenu, setWeeklyMenu] = useState(DEFAULT_MENU);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [editForm, setEditForm] = useState(DEFAULT_MENU['Monday']);

  useEffect(() => {
    // Load Feedback
    const saved = localStorage.getItem('messFeedback');
    if (saved) {
      setFeedback(JSON.parse(saved));
    }
    
    // Load Menu
    const savedMenu = localStorage.getItem('messWeeklyMenu');
    if (savedMenu) {
      const parsed = JSON.parse(savedMenu);
      setWeeklyMenu(parsed);
      setEditForm(parsed['Monday']);
    } else {
      localStorage.setItem('messWeeklyMenu', JSON.stringify(DEFAULT_MENU));
    }
  }, []);

  const markAsRead = (id) => {
    const updated = feedback.map(f => 
      f.id === id ? { ...f, status: 'Read' } : f
    );
    setFeedback(updated);
    localStorage.setItem('messFeedback', JSON.stringify(updated));
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setEditForm(weeklyMenu[day]);
  };

  const saveMenuChanges = (e) => {
    e.preventDefault();
    const newMenu = {
      ...weeklyMenu,
      [selectedDay]: editForm
    };
    setWeeklyMenu(newMenu);
    localStorage.setItem('messWeeklyMenu', JSON.stringify(newMenu));
    alert(`${selectedDay}'s menu has been successfully updated.`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Warden" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
            <div className="relative z-10 w-full">
              <span className="text-orange-200 font-black tracking-widest text-[10px] uppercase mb-1 block">Administrative Control</span>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Mess Operations</h1>
              <p className="text-orange-100 text-sm md:text-base leading-relaxed max-w-xl">
                Review qualitative feedback submitted by students regarding meal services, and directly manage the weekly dining menu.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('feedback')}
              className={`flex-1 min-w-[150px] py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'feedback' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Quality Reports
            </button>
            <button 
              onClick={() => setActiveTab('menu_editor')}
              className={`flex-1 min-w-[150px] py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'menu_editor' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Weekly Menu Editor
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
            
            {/* --- FEEDBACK TAB --- */}
            {activeTab === 'feedback' && (
              <>
                 <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Reports</h2>
                 
                 <div className="space-y-4">
                  {feedback.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mb-3"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      <p className="font-semibold text-sm">No feedback entries to review.</p>
                    </div>
                  ) : (
                    feedback.map(f => (
                      <div key={f.id} className={`p-6 rounded-2xl border-2 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center ${f.status === 'Unread' ? 'border-amber-200 bg-amber-50/20' : 'border-gray-100'}`}>
                        
                        <div className="flex-1 w-full">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">{f.name} <span className="text-xs text-gray-400 font-normal ml-2">Room: {f.room}</span></h4>
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mt-0.5">{f.date}</span>
                            </div>
                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                              f.status === 'Unread' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-gray-100 text-gray-500 border-gray-200' 
                            }`}>
                              {f.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 uppercase tracking-widest">{f.meal}</span>
                            <span className="text-sm tracking-widest">{ '⭐'.repeat(Number(f.rating)) }</span>
                          </div>

                          <p className="text-sm font-medium text-gray-600 bg-white border border-gray-100 rounded-xl p-4">
                            "{f.comment}"
                          </p>
                        </div>

                        <div className="flex w-full md:w-32 shrink-0 border-t border-gray-100 md:border-0 pt-4 md:pt-0 justify-end md:justify-center">
                          {f.status === 'Unread' ? (
                            <button onClick={() => markAsRead(f.id)} className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors">
                              Acknowledge
                            </button>
                          ) : (
                            <div className="text-center w-full min-w-[120px] bg-gray-50 py-3 rounded-xl border border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                              Reviewed
                            </div>
                          )}
                        </div>
                        
                      </div>
                    ))
                  )}
                 </div>
              </>
            )}

            {/* --- MENU EDITOR TAB --- */}
            {activeTab === 'menu_editor' && (
              <div className="flex flex-col lg:flex-row gap-8">
                 
                 {/* Day Selector */}
                 <div className="w-full lg:w-48 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
                    {DAYS.map(day => (
                      <button 
                        key={day}
                        onClick={() => handleDaySelect(day)}
                        className={`px-4 py-3 rounded-xl text-left text-sm font-bold transition-colors whitespace-nowrap ${
                          selectedDay === day 
                            ? 'bg-orange-100 text-orange-800 border-2 border-orange-200 shadow-sm' 
                            : 'bg-white text-gray-500 border-2 border-transparent hover:bg-gray-50'
                        }`}
                      >
                         {day}
                      </button>
                    ))}
                 </div>

                 {/* Editor Form */}
                 <div className="flex-1">
                    <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 mb-8 text-orange-800 text-sm font-medium flex items-center gap-3">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                       Changes made here will instantly be reflected on the Student portal.
                    </div>

                    <form onSubmit={saveMenuChanges} className="space-y-6 max-w-2xl">
                       <h3 className="text-2xl font-extrabold text-gray-900 mb-6 pb-4 border-b border-gray-100">Editing {selectedDay}'s Menu</h3>
                       
                       {['breakfast', 'lunch', 'snacks', 'dinner'].map((meal) => (
                         <div key={meal}>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">{meal}</label>
                            <input 
                              type="text" 
                              required
                              value={editForm[meal] || ''}
                              onChange={e => setEditForm({...editForm, [meal]: e.target.value})}
                              placeholder={`What's for ${meal}?`}
                              className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-orange-500 focus:ring-0 outline-none transition-colors" 
                            />
                         </div>
                       ))}

                       <div className="pt-6 border-t border-gray-100 mt-8">
                         <button 
                           type="submit"
                           className="bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-orange-700 transition-colors hover:shadow-lg"
                         >
                           Save {selectedDay}'s Menu
                         </button>
                       </div>
                    </form>
                 </div>

              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
