import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { LostFoundContext } from '../context/LostFoundContext';
import { useAuth } from '../context/AuthContext';

export default function UniversalLostFoundPage({ fixedRole = "Student" }) {
  const { items, logs, addItem, resolveItem, deleteItem } = useContext(LostFoundContext);
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('board');
  const [formData, setFormData] = useState({ type: 'Lost', itemName: '', description: '', location: '', image: null, contactName: '', contactNumber: '' });

  const canModerate = fixedRole === 'Warden' || fixedRole === 'Admin';
  const CURRENT_USER = currentUser?.name || 'Student';
  const CURRENT_ROOM = currentUser?.roomNo || 'Unassigned';

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 500;
          const MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
          setFormData({ ...formData, image: compressedDataUrl });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.itemName || !formData.description || !formData.contactName || !formData.contactNumber) return;

    const newItem = {
      id: Date.now(),
      posterName: fixedRole === 'Student' ? CURRENT_USER : `${fixedRole} (Staff)`,
      room: fixedRole === 'Student' ? CURRENT_ROOM : 'N/A',
      date: new Date().toLocaleDateString('en-GB'),
      ...formData,
      status: 'Open'
    };

    addItem(newItem);
    setFormData({ type: 'Lost', itemName: '', description: '', location: '', image: null, contactName: '', contactNumber: '' });
    setActiveTab('board');
  };

  const handleResolve = (id) => {
    let claimer = null;
    if (fixedRole === 'Warden' || fixedRole === 'Admin') {
      claimer = window.prompt("Enter the name of the person claiming this item (for logs):");
      if (!claimer) return;
    }
    resolveItem(id, claimer);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this post permanently?")) return;
    deleteItem(id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role={fixedRole} />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-br from-indigo-800 via-purple-700 to-fuchsia-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 w-full md:w-2/3">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Lost & Found Bulletin</h1>
              <p className="text-indigo-100 text-sm md:text-base leading-relaxed">
                A community board to post items you lost or report items you found wandering the hostel.
                {canModerate && " (Moderator View)"}
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 flex max-w-md">
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
            {canModerate && (
              <button 
                onClick={() => setActiveTab('reports')}
                className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all border-2 ${activeTab === 'reports' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 border-indigo-600' : 'text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100 mx-2'}`}
              >
                📊 Transaction Logs
              </button>
            )}
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
                          {item.date} • {item.posterName} {item.room !== 'N/A' && `(Room ${item.room})`}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            item.status === 'Resolved' ? 'bg-gray-100 text-gray-400 border-gray-200 border' : 'bg-indigo-100 text-indigo-700'
                          }`}>
                            {item.status}
                        </span>
                        {canModerate && (
                          <div className="flex gap-2 mt-1">
                            {item.status === 'Open' && (
                              <button onClick={() => handleResolve(item.id)} className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-[10px] font-bold hover:bg-green-100">
                                Resolve
                              </button>
                            )}
                            <button onClick={() => handleDelete(item.id)} className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-[10px] font-bold hover:bg-red-100">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pl-3 mt-auto">
                       {item.image && (
                         <div className="mb-4 rounded-xl overflow-hidden shadow-sm" style={{ maxHeight: '180px' }}>
                           <img src={item.image} alt={item.itemName} className="w-full h-full object-cover" />
                         </div>
                       )}
                       <p className="text-sm font-medium text-gray-600 bg-gray-50/50 p-4 rounded-xl border border-gray-100 leading-relaxed mb-4">
                         {item.description}
                       </p>
                       <div className="mt-3 flex flex-wrap gap-4 border-t border-gray-100 pt-3">
                          {item.location && (
                             <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                {item.type === 'Lost' ? 'Lost around: ' : 'Found at: '}{item.location}
                             </div>
                          )}
                          <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                             Contact: {item.contactName || item.posterName} ({item.contactNumber || 'N/A'})
                          </div>
                       </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Contact Person</label>
                    <input 
                      type="text" 
                      required
                      value={formData.contactName}
                      onChange={e => setFormData({...formData, contactName: e.target.value})}
                      placeholder="e.g. Lakshya B."
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-indigo-500 focus:ring-0 outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Contact Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.contactNumber}
                      onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                      placeholder="e.g. 9876543210"
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-indigo-500 focus:ring-0 outline-none transition-colors" 
                    />
                  </div>
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

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Upload Photo (Optional)</label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-gray-50 border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all rounded-xl p-4 flex-1 text-center flex flex-col items-center justify-center min-h-[100px]">
                      <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      <span className="text-sm font-semibold text-gray-500">Click to upload image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    {formData.image && (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-100 flex-shrink-0">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setFormData({...formData, image: null})} className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button 
                    type="submit"
                    disabled={!formData.itemName || !formData.description || !formData.contactName || !formData.contactNumber}
                    className="w-full bg-gray-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    Broadcast to Notice Board
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'reports' && canModerate && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="p-4 font-semibold rounded-tl-2xl">Item Claimed</th>
                      <th className="p-4 font-semibold">Found By</th>
                      <th className="p-4 font-semibold">Found Timestamp</th>
                      <th className="p-4 font-semibold">Claimed By</th>
                      <th className="p-4 font-semibold rounded-tr-2xl">Claimed Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-800">
                    {logs.map((log, i) => (
                      <tr key={i} className="hover:bg-indigo-50 transition-colors">
                        <td className="p-4 font-bold text-indigo-700">{log.item}</td>
                        <td className="p-4">{log.finder}</td>
                        <td className="p-4 text-xs font-mono text-gray-500 bg-gray-50/50">{log.foundTime}</td>
                        <td className="p-4">{log.claimer}</td>
                        <td className="p-4 text-xs font-mono text-gray-500 bg-gray-50/50">{log.claimedTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
