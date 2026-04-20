import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { MessContext } from '../context/MessContext';
import { useAuth } from '../context/AuthContext';

export default function StudentMessPage() {
  const { weeklyMenu, feedback: allFeedback, submitFeedback } = useContext(MessContext);
  const { currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState('menu');
  const [activeDay, setActiveDay] = useState('Monday');
  const [formData, setFormData] = useState({ meal: 'Breakfast', rating: '5', comment: '' });

  const CURRENT_USER = currentUser?.name || 'Student';
  const CURRENT_ROOM = currentUser?.roomNo || 'Unassigned';

  // Filter feedback for current user
  const feedback = allFeedback.filter(f => f.name === CURRENT_USER);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    if (today && weeklyMenu && weeklyMenu[today]) setActiveDay(today);
  }, [weeklyMenu]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.comment) return;

    await submitFeedback({
      name: CURRENT_USER,
      room: CURRENT_ROOM,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      meal: formData.meal,
      rating: formData.rating,
      comment: formData.comment,
      status: 'Unread'
    });

    setFormData({ meal: 'Breakfast', rating: '5', comment: '' });
    setActiveTab('history');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 w-full md:w-2/3">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Central Mess</h1>
              <p className="text-orange-100 text-sm md:text-base leading-relaxed">
                Check today's meal schedule and provide direct food feedback to the kitchen staff.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('menu')}
              className={`flex-1 min-w-[150px] py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'menu' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Weekly Menu
            </button>
            <button 
              onClick={() => setActiveTab('feedback')}
              className={`flex-1 min-w-[150px] py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'feedback' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Write Feedback
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 min-w-[150px] py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'history' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              My Feedback
            </button>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 transition-shadow">
            
            {activeTab === 'menu' && (
              <div>
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-100 no-scrollbar">
                  {Object.keys(weeklyMenu).map((day) => (
                    <button
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeDay === day ? 'bg-amber-100 text-amber-700 border-2 border-amber-200 shadow-sm' : 'bg-white text-gray-500 border-2 border-transparent hover:bg-gray-50'}`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['breakfast', 'lunch', 'snacks', 'dinner'].map((meal) => (
                    <div key={meal} className="p-6 bg-gray-50/50 border-2 border-gray-100 rounded-2xl flex flex-col justify-center transition-colors hover:border-amber-200">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{meal}</div>
                      <div className="text-lg font-bold text-gray-800">{weeklyMenu[activeDay][meal] || <span className="text-gray-400 italic font-medium">Not specified</span>}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Meal Selection</label>
                    <select 
                      required 
                      value={formData.meal} 
                      onChange={e => setFormData({...formData, meal: e.target.value})}
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-amber-500 focus:ring-0 outline-none transition-colors"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Quality Rating</label>
                    <select 
                      required 
                      value={formData.rating} 
                      onChange={e => setFormData({...formData, rating: e.target.value})}
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-amber-500 focus:ring-0 outline-none transition-colors text-amber-600"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ Outstanding</option>
                      <option value="4">⭐⭐⭐⭐ Good</option>
                      <option value="3">⭐⭐⭐ Average</option>
                      <option value="2">⭐⭐ Poor</option>
                      <option value="1">⭐ Inedible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Detailed Comments</label>
                  <textarea 
                    required 
                    value={formData.comment} 
                    onChange={e => setFormData({...formData, comment: e.target.value})}
                    rows={4}
                    placeholder="Provide constructive feedback..."
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-medium focus:border-amber-500 focus:ring-0 outline-none transition-colors resize-none placeholder:font-normal placeholder:text-gray-300"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={!formData.comment}
                  className="w-full bg-gray-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:bg-gray-300 mt-2 shadow-md"
                >
                  Submit Feedback
                </button>
              </form>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {feedback.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="font-semibold text-sm">No feedback submitted yet.</p>
                  </div>
                ) : (
                  feedback.map(f => (
                    <div key={f.id} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{f.meal} • {f.date}</span>
                          <div className="mt-1 text-sm bg-orange-50 px-2 py-1 rounded inline-block text-orange-600 tracking-widest border border-orange-100">{ '⭐'.repeat(Number(f.rating)) }</div>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-700 leading-relaxed bg-gray-50 p-4 border border-gray-100 rounded-xl">
                        "{f.comment}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
