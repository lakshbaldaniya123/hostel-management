import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function WardenLostFoundPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('lostFoundItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const resolveItem = (id) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, status: 'Resolved' } : item
    );
    setItems(updated);
    localStorage.setItem('lostFoundItems', JSON.stringify(updated));
  };

  const deleteItem = (id) => {
    if (!window.confirm("Delete this post permanently?")) return;
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem('lostFoundItems', JSON.stringify(updated));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Warden" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-gray-800 to-black rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
            <div className="relative z-10 w-full">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Bulletin Moderator</h1>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
                Moderate the community Lost & Found board. Verify handovers and delete stale or inappropriate posts.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Board Postings</h2>
            
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                  <p className="font-semibold text-sm">No items posted.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className={`p-6 rounded-2xl border-2 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center ${item.status === 'Open' ? 'border-indigo-100 bg-white' : 'border-gray-100 opacity-75'}`}>
                    
                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className={`inline-block mb-3 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border ${
                          item.type === 'Lost' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {item.type} POST
                        </span>
                        <h4 className="font-bold text-gray-900 text-lg">{item.itemName}</h4>
                        <span className="text-xs font-semibold text-gray-500 mt-1 block">By {item.posterName} (Room {item.room})</span>
                      </div>
                      
                      <div className="self-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Details</span>
                        <p className="font-medium text-gray-600 text-sm italic">"{item.description}"</p>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 block">{item.date}</span>
                      </div>
                    </div>

                    <div className="flex w-full md:w-32 shrink-0 border-t border-gray-100 md:border-0 pt-4 md:pt-0 justify-end md:justify-center items-center flex-col gap-2">
                       <span className={`px-3 py-1.5 w-full text-center rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                          item.status === 'Open' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-gray-100 text-gray-500 border-gray-200' 
                        }`}>
                          {item.status}
                        </span>
                      {item.status === 'Open' && (
                        <button onClick={() => resolveItem(item.id)} className="w-full px-4 py-2 mt-2 bg-green-50 text-green-700 border border-green-200 rounded-xl text-[10px] uppercase font-bold hover:bg-green-100 transition-colors">
                          Mark Found
                        </button>
                      )}
                      <button onClick={() => deleteItem(item.id)} className="w-full px-4 py-2 mt-2 bg-white text-red-600 border border-red-200 rounded-xl text-[10px] uppercase font-bold hover:bg-red-50 transition-colors">
                          Delete Post
                      </button>
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
