import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// ── Fake room data ──
const roomData = {
  roomNumber: '204',
  block: 'A',
  floor: '2nd Floor',
  type: 'Triple Sharing',
  status: 'Occupied',
};

const roommates = [
  {
    id: 1,
    name: 'Roshan Moradiya',
    rollNumber: 'CE21B001',
    phone: '+91 98765 43210',
    department: 'Computer Engineering',
    avatar: 'RM',
    avatarColor: 'bg-teal-100 text-teal-700',
  },
  {
    id: 2,
    name: 'Lakshya Baldaniya',
    rollNumber: 'CE21B002',
    phone: '+91 91234 56789',
    department: 'Computer Engineering',
    avatar: 'LB',
    avatarColor: 'bg-indigo-100 text-indigo-700',
  },
];

const initialCleaningHistory = [
  { id: 1, date: 'Today, 8:00 AM', status: 'Cleaned', by: 'Ramesh' },
  { id: 2, date: 'Yesterday, 9:15 AM', status: 'Cleaned', by: 'Ramesh' },
  { id: 3, date: '22 Mar, 8:45 AM', status: 'Cleaned', by: 'Suresh' },
];

export default function MyRoomPage() {
  const navigate = useNavigate();

  const [cleanStatus, setCleanStatus] = useState('Cleaned');
  const [requesting, setRequesting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastCleaned, setLastCleaned] = useState('Today, 8:00 AM');
  const [cleaningHistory, setCleaningHistory] = useState(initialCleaningHistory);
  
  // States for marking as cleaned by student
  const [isMarkingCleaned, setIsMarkingCleaned] = useState(false);
  const [housekeeperName, setHousekeeperName] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleRequestCleaning() {
    setRequesting(true);
    setTimeout(() => {
      setRequesting(false);
      setCleanStatus('Requested');
      setLastCleaned('Just now — awaiting housekeeper');
      setShowSuccess(true);
      
      // Add fake request to history
      setCleaningHistory([
        { id: Date.now(), date: new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }), status: 'Requested', by: 'You' },
        ...cleaningHistory
      ]);

      setTimeout(() => setShowSuccess(false), 4000);
    }, 1200);
  }

  function handleConfirmCleaning(e) {
    e.preventDefault();
    if (rating === 0) {
      alert("Please provide a star rating.");
      return;
    }

    const currentDateTime = new Date().toLocaleString('en-US', { 
      weekday: 'short', month: 'short', day: 'numeric', 
      hour: 'numeric', minute: 'numeric', hour12: true 
    });

    setCleanStatus('Cleaned');
    setLastCleaned(currentDateTime);
    
    // Add real completion to history
    setCleaningHistory([
      { id: Date.now(), date: currentDateTime, status: 'Cleaned', by: housekeeperName },
      ...cleaningHistory
    ]);

    setIsMarkingCleaned(false);
    setHousekeeperName('');
    setRating(0);
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Room
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Your room details, roommates, and housekeeping status.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-teal-50 border border-teal-100 px-4 py-2 rounded-xl">
            <div className="text-right">
              <span className="block text-lg font-bold text-teal-700">Room {roomData.roomNumber}</span>
              <span className="text-xs text-gray-500">Block {roomData.block} · {roomData.floor}</span>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {showSuccess && (
          <div className="mb-8 flex items-start gap-3 bg-teal-50 border border-teal-200 rounded-xl p-4 text-teal-800 animate-fade-in">
            <span className="text-xl">✅</span>
            <div>
              <div className="font-semibold text-sm">Cleaning request sent!</div>
              <div className="text-xs text-teal-600 mt-1">
                The housekeeper has been notified in the staff portal. Your room will be cleaned shortly.
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-8">
            
            {/* Room Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Room Information</h2>
                  <p className="text-xs text-gray-500 mt-1">Your allocated room details</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-500">Room Number</span>
                  <span className="text-sm font-medium text-gray-900">Room {roomData.roomNumber}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-500">Block</span>
                  <span className="text-sm font-medium text-gray-900">Block {roomData.block}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-500">Floor</span>
                  <span className="text-sm font-medium text-gray-900">{roomData.floor}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-500">Room Type</span>
                  <span className="text-sm font-medium text-gray-900">{roomData.type}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700">
                    ● {roomData.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Housekeeping Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6v10H9z"/><path d="M9 13c0 2-1 4-3 5h12c-2-1-3-3-3-5"/><line x1="12" y1="13" x2="12" y2="19"/></svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Housekeeping</h2>
                  <p className="text-xs text-gray-500 mt-1">Cleaning status and requests</p>
                </div>
              </div>

              {/* Status Box */}
              <div className={`rounded-xl p-4 mb-5 flex items-center gap-3 border ${
                cleanStatus === 'Cleaned' ? 'bg-teal-50 border-teal-100' : 'bg-indigo-50 border-indigo-100'
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full ${cleanStatus === 'Cleaned' ? 'bg-teal-500' : 'bg-indigo-500'}`}></div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    Current Status — <span className={cleanStatus === 'Cleaned' ? 'text-teal-700' : 'text-indigo-700'}>{cleanStatus}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Last updated: {lastCleaned}</div>
                </div>
              </div>

              {/* Action Buttons Logic */}
              {cleanStatus !== 'Requested' ? (
                <div className="flex flex-col gap-3 border border-gray-100 bg-gray-50/50 p-4 rounded-xl">
                  <div className="text-sm font-medium text-gray-800 mb-2">Is your room cleaned today?</div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleRequestCleaning}
                      disabled={requesting}
                      className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
                        requesting
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white border text-gray-700 hover:bg-gray-50 shadow-sm border-gray-200'
                      }`}
                    >
                      {requesting ? 'Wait...' : 'No, Request Cleaning'}
                    </button>
                    <button
                      onClick={() => setIsMarkingCleaned(true)}
                      className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium text-sm shadow-sm transition-colors"
                    >
                      Yes, Mark Cleaned
                    </button>
                  </div>

                  {isMarkingCleaned && (
                    <form onSubmit={handleConfirmCleaning} className="flex flex-col gap-3 mt-4 animate-fade-in bg-white p-4 rounded-xl border border-gray-200">
                      <div className="text-sm font-bold text-gray-800 mb-1">Daily Housekeeping Review</div>
                      
                      <div className="flex space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`text-2xl transition-transform ${star <= (hover || rating) ? "text-yellow-400 scale-110" : "text-gray-300"}`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                          >
                            ★
                          </button>
                        ))}
                      </div>

                      <input 
                        type="text" 
                        placeholder="Housekeeper's name (Optional)"
                        value={housekeeperName}
                        onChange={(e) => setHousekeeperName(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500"
                      />

                      <textarea
                        placeholder="Write a review about today's cleaning... (Optional)"
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 min-h-[60px] resize-none"
                      />

                      <div className="flex items-center gap-2">
                        <label className="flex-1 px-3 py-2.5 border-2 border-dashed border-gray-200 hover:border-teal-400 rounded-lg text-xs font-semibold text-gray-500 hover:text-teal-600 text-center cursor-pointer hover:bg-teal-50 transition-all">
                          📷 Upload Photo Proof
                          <input type="file" className="hidden" accept="image/*" />
                        </label>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <button 
                          type="submit"
                          className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                        >
                          Submit Review
                        </button>
                        <button 
                          type="button"
                          onClick={() => setIsMarkingCleaned(false)}
                          className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-3 border border-indigo-100 bg-indigo-50/50 p-4 rounded-xl">
                  <div className="text-sm font-medium text-indigo-800 mb-1">Has the housekeeper finished cleaning?</div>
                  {isMarkingCleaned ? (
                    <form onSubmit={handleConfirmCleaning} className="flex flex-col gap-3 mt-2 animate-fade-in bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                      <div className="text-sm font-bold text-indigo-900 mb-1">Daily Housekeeping Review</div>
                      
                      <div className="flex space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`text-2xl transition-transform ${star <= (hover || rating) ? "text-yellow-400 scale-110" : "text-gray-300"}`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                          >
                            ★
                          </button>
                        ))}
                      </div>

                      <input 
                        type="text" 
                        placeholder="Housekeeper's name (Optional)"
                        value={housekeeperName}
                        onChange={(e) => setHousekeeperName(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                      />

                      <textarea
                        placeholder="Write a review about today's cleaning... (Optional)"
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 min-h-[60px] resize-none"
                      />

                      <div className="flex items-center gap-2">
                        <label className="flex-1 px-3 py-2.5 border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-lg text-xs font-semibold text-indigo-500 hover:text-indigo-700 text-center cursor-pointer hover:bg-indigo-50 transition-all">
                          📷 Upload Photo Proof
                          <input type="file" className="hidden" accept="image/*" />
                        </label>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <button 
                          type="submit"
                          className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                        >
                          Submit Review
                        </button>
                        <button 
                          type="button"
                          onClick={() => setIsMarkingCleaned(false)}
                          className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-sm font-bold rounded-lg transition-colors border border-indigo-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => setIsMarkingCleaned(true)}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      ✓ Yes, Mark as Cleaned
                    </button>
                  )}
                </div>
              )}

              {/* Cleaning History */}
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-8 mb-4">Cleaning History</h3>
              <div className="space-y-4">
                {cleaningHistory.map((h, i) => (
                  <div key={h.id} className="flex gap-4">
                    <div className="flex flex-col items-center w-4 mt-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${h.status === 'Cleaned' ? 'bg-teal-500' : 'bg-indigo-500'}`} />
                      {i < cleaningHistory.length - 1 && <div className="w-px h-full bg-gray-100 mt-1" />}
                    </div>
                    <div className="pb-2">
                      <div className="text-sm font-medium text-gray-900">{h.date}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {h.by} · <span className={h.status === 'Cleaned' ? 'text-teal-600' : 'text-indigo-600'}>{h.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-8">
            
            {/* Roommates Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Roommates</h2>
                  <p className="text-xs text-gray-500 mt-1">{roommates.length} roommates in Room {roomData.roomNumber}</p>
                </div>
              </div>

              <div className="space-y-5">
                {roommates.map((r) => (
                  <div key={r.id} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${r.avatarColor}`}>
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900">{r.name}</div>
                      <div className="text-xs text-teal-600 font-medium mb-3">{r.department}</div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs">
                          <svg className="text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><circle cx="9" cy="14" r="2"/><path d="M15 11h2"/><path d="M15 15h2"/></svg>
                          <span className="text-gray-500">Roll No:</span>
                          <span className="font-semibold text-gray-800">{r.rollNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <svg className="text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.06 6.06l.98-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          <span className="text-gray-500">Phone:</span>
                          <span className="font-semibold text-gray-800">{r.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>



          </div>
        </div>
      </main>
    </div>
  );
}