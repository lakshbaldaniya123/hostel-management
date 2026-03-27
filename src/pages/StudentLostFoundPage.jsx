import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function StudentLostFoundPage() {
  const [activeTab, setActiveTab] = useState('board');
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ type: 'Lost', itemName: '', description: '', location: '' });

  useEffect(() => {
    const saved = localStorage.getItem('lostFoundItems');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.itemName || !formData.description) return;

    const newItem = {
      id: Date.now(),
      posterName: 'Shyam',
      room: '204',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...formData,
      status: 'Open'
    };

    const savedItems = localStorage.getItem('lostFoundItems');
    const allItems = savedItems ? JSON.parse(savedItems) : [];
    const updated = [newItem, ...allItems];

    localStorage.setItem('lostFoundItems', JSON.stringify(updated));
    setItems(updated);
    setFormData({ type: 'Lost', itemName: '', description: '', location: '' });
    setActiveTab('board');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-br from-indigo-800 via-purple-700 to-fuchsia-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 w-full md:w-2/3">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Lost & Found Bulletin</h1>
              <p className="text-indigo-100 text-sm md:text-base leading-relaxed">
                A community board to post items you lost or report items you found wandering the hostel.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 flex max-w-sm">
            <button 
              onClick={() => setActiveTab('board')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'board' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Notice Board
            </button>
            <button 
              onClick={() => setActiveTab('post')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'post' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Post an Item
            </button>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 transition-shadow">
            
            {activeTab === 'board' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {items.length === 0 ? (
                   <div className="lg:col-span-2 py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                     <p className="font-bold text-lg text-gray-800 mb-1">Silence is golden!</p>
                     <p className="font-semibold text-sm">No items are currently reported lost or found.</p>
                   </div>
                ) : items.map(item => (
                  <div key={item.id} className="p-6 rounded-3xl border border-gray-200 hover:shadow-lg transition-all flex flex-col relative overflow-hidden group bg-white">
                    {/* Decorative Edge */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.type === 'Lost' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                    
                    <div className="flex justify-between items-start mb-4 pl-3">
                      <div>
                        <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border ${
                          item.type === 'Lost' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {item.type} Item
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mt-3 mb-1">{item.itemName}</h3>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                          {item.date} • {item.posterName} (Room {item.room})
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          item.status === 'Resolved' ? 'bg-gray-100 text-gray-400 border-gray-200 border' : 'bg-indigo-100 text-indigo-700'
                        }`}>
                          {item.status}
                      </span>
                    </div>

                    <div className="pl-3 mt-auto">
                       <p className="text-sm font-medium text-gray-600 bg-gray-50/50 p-4 rounded-xl border border-gray-100 leading-relaxed mb-4">
                         {item.description}
                       </p>
                       {item.location && (
                          <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                             {item.type === 'Lost' ? 'Lost around: ' : 'Found at: '}{item.location}
                          </div>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'post' && (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                 <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 text-center text-indigo-900 font-medium text-sm">
                   Ensure you describe the item properly. False reporting is punishable under hostel rules.
                 </div>

                 <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">Post Type</label>
                    <div className="flex gap-4">
                      <label className={`flex-1 flex justify-center items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${formData.type === 'Lost' ? 'border-red-500 bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <input type="radio" className="hidden" checked={formData.type === 'Lost'} onChange={() => setFormData({...formData, type: 'Lost'})} />
                        <span className={`text-sm font-black uppercase tracking-widest ${formData.type === 'Lost' ? 'text-red-700' : 'text-gray-500'}`}>I Lost An Item</span>
                      </label>
                      <label className={`flex-1 flex justify-center items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${formData.type === 'Found' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <input type="radio" className="hidden" checked={formData.type === 'Found'} onChange={() => setFormData({...formData, type: 'Found'})} />
                        <span className={`text-sm font-black uppercase tracking-widest ${formData.type === 'Found' ? 'text-emerald-700' : 'text-gray-500'}`}>I Found An Item</span>
                      </label>
                    </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Item Name</label>
                  <input 
                    type="text" 
                    required
                    maxLength={50}
                    value={formData.itemName}
                    onChange={e => setFormData({...formData, itemName: e.target.value})}
                    placeholder="e.g. Blue Casio Watch"
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-indigo-500 focus:ring-0 outline-none transition-colors" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Detailed Description</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    placeholder="Color, brand, distinguishing marks..."
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-medium focus:border-indigo-500 focus:ring-0 outline-none transition-colors resize-none placeholder:font-normal placeholder:text-gray-300"
                  ></textarea>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Location (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Canteen, Floor 2 Washroom"
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-indigo-500 focus:ring-0 outline-none transition-colors" 
                  />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button 
                    type="submit"
                    disabled={!formData.itemName || !formData.description}
                    className="w-full bg-gray-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    Broadcast to Notice Board
                  </button>
                </div>
              </form>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
