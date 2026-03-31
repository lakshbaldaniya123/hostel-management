import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { MaintenanceContext } from '../context/MaintenanceContext';

// Current logged in student mock profile
const CURRENT_STUDENT = {
  id: 'STU004',
  name: 'Priya R.',
  roomNo: '214'
};

export default function StudentMaintenancePage() {
  const { requests, addRequest, rejectSchedule } = useContext(MaintenanceContext);
  
  const [issueType, setIssueType] = useState('Electrical');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

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
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          setImage(canvas.toDataURL('image/jpeg', 0.5));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Rejection state
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState('I will be in class');

  const myRequests = requests.filter(req => req.studentId === CURRENT_STUDENT.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    addRequest(CURRENT_STUDENT.id, CURRENT_STUDENT.name, CURRENT_STUDENT.roomNo, issueType, description, image);
    setDescription('');
    setIssueType('Electrical');
    setImage(null);
  };

  const handleReject = () => {
    if (!rejectReason) return;
    rejectSchedule(rejectingId, rejectReason);
    setRejectingId(null);
    setRejectReason('I will be in class');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 w-full md:w-2/3">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Maintenance Hub</h1>
              <p className="text-indigo-100 text-sm md:text-base leading-relaxed">
                Log complaints instantly to have hostel staff resolve issues in Room {CURRENT_STUDENT.roomNo}. Check below to see scheduled repair times and updates.
              </p>
            </div>
            {/* Background design */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 right-32 w-48 h-48 bg-purple-400 opacity-10 rounded-full blur-2xl translate-y-1/4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left: Form */}
            <div className="lg:col-span-1 sticky top-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">New Complaint</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Issue Type</label>
                    <div className="relative">
                      <select 
                        value={issueType}
                        onChange={e => setIssueType(e.target.value)}
                        className="w-full appearance-none border-2 border-gray-100 rounded-xl p-3.5 pr-10 text-sm font-semibold focus:border-indigo-500 focus:ring-0 bg-gray-50 outline-none transition-colors"
                      >
                        <option value="Electrical">Electrical</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Cleaning">Cleaning / Hygiene</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Detailed Description</label>
                    <textarea 
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      rows={5}
                      placeholder="Please specify the exact issue..."
                      className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-medium focus:border-indigo-500 focus:ring-0 bg-gray-50 outline-none transition-colors resize-none placeholder:text-gray-300 placeholder:font-normal"
                    ></textarea>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Upload Photo (Optional)</label>
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer bg-gray-50 border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all rounded-xl p-4 flex-1 text-center flex flex-col items-center justify-center min-h-[100px]">
                        <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        <span className="text-sm font-semibold text-gray-500">Click to upload image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                      {image && (
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-100 flex-shrink-0">
                          <img src={image} alt="Preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setImage(null)} className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={!description.trim()}
                    className="w-full bg-gray-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-400 mt-2"
                  >
                    Submit Ticket
                  </button>
                </form>
              </div>
            </div>

            {/* Right: History */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <h3 className="text-lg font-bold text-gray-900">Your Track Record</h3>
                <span className="text-xs font-bold text-gray-400 bg-gray-200 px-3 py-1 rounded-full">{myRequests.length} Total</span>
              </div>
              
              {myRequests.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm text-gray-400 flex flex-col items-center gap-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <p>You have not logged any maintenance complaints yet.</p>
                </div>
              ) : (
                myRequests.map(req => (
                  <div key={req.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl flex-shrink-0 ${
                          req.issueType === 'Electrical' ? 'bg-yellow-50 text-yellow-600' :
                          req.issueType === 'Plumbing' ? 'bg-blue-50 text-blue-600' :
                          req.issueType === 'Furniture' ? 'bg-amber-50 text-amber-700' : 
                          'bg-gray-50 text-gray-600'
                        }`}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-xl">{req.issueType}</h4>
                          <span className="text-xs text-gray-400 font-semibold tracking-wide">Ticket #{req.id} • {new Date(req.registeredAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                        req.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        req.status === 'Scheduled' ? 'bg-indigo-100 text-indigo-700' :
                        req.status === 'Reschedule Requested' ? 'bg-red-50 text-red-600' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    {req.image && (
                      <div className="mb-4 rounded-xl overflow-hidden shadow-sm border border-gray-100" style={{ maxHeight: '200px' }}>
                        <img src={req.image} alt="Issue" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <p className="text-gray-700 text-sm font-medium leading-relaxed mb-6">
                      {req.description}
                    </p>

                    {/* Schedule block */}
                    {req.status === 'Scheduled' && (
                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-white p-3 rounded-xl shadow-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Repair Scheduled For</p>
                            <p className="text-lg font-black text-indigo-900">
                              {new Date(req.scheduledDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'})} at {req.scheduledTime}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setRejectingId(req.id)}
                          className="w-full sm:w-auto px-5 py-2.5 bg-white border-2 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
                        >
                          Reject Time
                        </button>
                      </div>
                    )}

                    {/* Reschedule Requested block */}
                    {req.status === 'Reschedule Requested' && (
                      <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
                        <div className="mt-0.5 text-red-500">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-red-800">Reschedule Requested</p>
                          <p className="text-xs font-medium text-red-600 mt-1">Reason: {req.rejectionReason}</p>
                          <p className="text-xs font-medium text-red-500 mt-2 italic">Awaiting Warden to allocate a new time based on your unavailability.</p>
                        </div>
                      </div>
                    )}

                    {/* Completed block */}
                    {req.status === 'Completed' && (
                      <div className="flex items-center gap-3 bg-green-50/50 p-4 rounded-2xl text-green-700 text-sm font-bold border border-green-100/50">
                        <div className="bg-green-100 p-1.5 rounded-full">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        Maintenance fixed and closed.
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Reject Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Reject Schedule</h3>
              <p className="text-sm text-gray-500 mt-1">Warden will have to assign you a new time slot.</p>
            </div>
            <div className="p-6">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Reason for rejection</label>
              <div className="space-y-3">
                {['I will be in class', 'Not comfortable with this time', 'I am on leave'].map(r => (
                  <label key={r} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${rejectReason === r ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-gray-200 active:bg-gray-50'}`}>
                    <input type="radio" name="reason" className="hidden" checked={rejectReason === r} onChange={() => setRejectReason(r)} />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${rejectReason === r ? 'border-indigo-600' : 'border-gray-300'}`}>
                      {rejectReason === r && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
                    </div>
                    <span className={`text-sm font-semibold ${rejectReason === r ? 'text-indigo-900' : 'text-gray-600'}`}>{r}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex gap-3">
              <button 
                onClick={() => setRejectingId(null)}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shadow-sm"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
