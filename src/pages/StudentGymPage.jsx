import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const TIME_SLOTS = [
  '06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '08:00 AM - 09:00 AM',
  '04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM', '08:00 PM - 09:00 PM'
];

export default function StudentGymPage() {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [myBookings, setMyBookings] = useState([]);
  
  // Subscription state
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    // Load Bookings
    const savedBookings = localStorage.getItem('gymBookings');
    if (savedBookings) {
      setMyBookings(JSON.parse(savedBookings).filter(b => b.name === 'Shyam'));
    }
    
    // Load Subscription
    const savedSubs = localStorage.getItem('gymSubscriptions');
    if (savedSubs) {
      const allSubs = JSON.parse(savedSubs);
      const mySub = allSubs.find(s => s.name === 'Shyam');
      if (mySub) setSubscription(mySub);
    }
  }, []);

  const handleEnroll = (planType, price) => {
    const newSub = {
      id: Date.now(),
      name: 'Shyam',
      room: '204',
      plan: planType,
      fee: price,
      paymentStatus: 'Pending',
      enrolledAt: new Date().toISOString()
    };
    
    const savedSubs = localStorage.getItem('gymSubscriptions');
    const allSubs = savedSubs ? JSON.parse(savedSubs) : [];
    
    // Remove old sub if exists
    const filteredSubs = allSubs.filter(s => s.name !== 'Shyam');
    const updatedSubs = [newSub, ...filteredSubs];
    
    localStorage.setItem('gymSubscriptions', JSON.stringify(updatedSubs));
    setSubscription(newSub);
    setActiveTab('book');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot || !selectedDate) return;

    if (!subscription) {
      alert("You must enroll in a Gym Membership plan first.");
      setActiveTab('membership');
      return;
    }

    // Check if already has active booking
    const hasActive = myBookings.some(b => b.status === 'Active');
    if (hasActive) {
      alert('You already have an active gym booking. Please wait for it to pass or cancel it.');
      return;
    }

    const newBooking = {
      id: Date.now(),
      name: 'Shyam',
      room: '204',
      date: selectedDate,
      timeSlot: selectedSlot,
      status: 'Active',
      bookedAt: new Date().toISOString()
    };

    const saved = localStorage.getItem('gymBookings');
    const allBookings = saved ? JSON.parse(saved) : [];
    const updated = [newBooking, ...allBookings];

    localStorage.setItem('gymBookings', JSON.stringify(updated));
    setMyBookings([newBooking, ...myBookings]);
    
    setSelectedSlot(''); setSelectedDate('');
    setActiveTab('history');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Student" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full md:w-auto mt-16 md:mt-0">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative z-10 w-full md:w-2/3">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Fitness Center</h1>
              <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
                Manage your gym subscription and reserve daily 1-hour slots.
              </p>
            </div>
            
            {/* Quick Stats / Warning */}
            {subscription && (
              <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shrink-0 w-full md:w-64">
                 <div className="text-[10px] font-black tracking-widest uppercase text-emerald-200 mb-1">Your Membership</div>
                 <div className="text-xl font-bold mb-3">{subscription.plan}</div>
                 
                 <div className="text-[10px] font-black tracking-widest uppercase text-emerald-200 mb-1">Fee Status</div>
                 {subscription.paymentStatus === 'Pending' ? (
                   <div className="bg-red-500/20 text-red-100 px-3 py-1.5 rounded-lg border border-red-500/30 text-xs font-bold flex justify-between items-center">
                     <span>Pending Fees:</span>
                     <span>₹{subscription.fee}</span>
                   </div>
                 ) : (
                   <div className="bg-emerald-800/40 text-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-400/30 text-xs font-bold flex justify-between items-center">
                     <span>Paid</span>
                     <span>₹0</span>
                   </div>
                 )}
              </div>
            )}
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('membership')}
              className={`flex-1 min-w-[150px] py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'membership' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Subscription Plan
            </button>
            <button 
              onClick={() => setActiveTab('book')}
              className={`flex-1 min-w-[150px] py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'book' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Book Daily Slot
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 min-w-[150px] py-3 text-sm font-bold rounded-2xl transition-all ${activeTab === 'history' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              My Bookings
            </button>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 transition-shadow">
            
            {/* --- SUBSCRIPTION TAB --- */}
            {activeTab === 'membership' && (
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Choose Your Fitness Path</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Select a monthly subscription that fits your needs. Subscribing will automatically add the total amount to your pending hostel dues, which must be cleared with the Warden.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                   
                   {/* Standard Plan */}
                   <div className={`relative p-8 rounded-3xl border-2 flex flex-col transition-all ${(subscription && subscription.plan === 'Standard Access') ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                     {(subscription && subscription.plan === 'Standard Access') && (
                       <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 bg-emerald-500 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-md border-2 border-white">
                         Current Plan
                       </div>
                     )}
                     <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Base</div>
                     <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Standard Access</h3>
                     <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-black text-gray-900">₹500</span>
                        <span className="text-sm font-bold text-gray-400">/ month</span>
                     </div>
                     <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Full Gym Access (All Hours)
                        </li>
                        <li className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Daily Slot Booking
                        </li>
                        <li className="flex items-center gap-3 text-sm font-semibold text-gray-400 opacity-60">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          No Personal Trainer
                        </li>
                     </ul>
                     <button 
                       onClick={() => handleEnroll('Standard Access', 500)}
                       className={`w-full py-4 rounded-xl text-sm font-bold transition-all ${(subscription && subscription.plan === 'Standard Access') ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-gray-900 text-white hover:bg-black shadow-lg hover:shadow-xl'}`}
                     >
                       {(subscription && subscription.plan === 'Standard Access') ? 'Actively Enrolled' : 'Enroll in Standard'}
                     </button>
                   </div>

                   {/* Premium Plan */}
                   <div className={`relative p-8 rounded-3xl border-2 flex flex-col transition-all ${(subscription && subscription.plan === 'Premium w/ Trainer') ? 'border-indigo-500 bg-indigo-50/50' : 'border-indigo-100 hover:border-indigo-200 bg-gradient-to-b from-indigo-50/30 to-white'}`}>
                     {(subscription && subscription.plan === 'Premium w/ Trainer') && (
                       <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 bg-indigo-500 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-md border-2 border-white">
                         Current Plan
                       </div>
                     )}
                     <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Recommended</div>
                     <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Premium w/ Trainer</h3>
                     <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-black text-indigo-700">₹1000</span>
                        <span className="text-sm font-bold text-gray-400">/ month</span>
                     </div>
                     <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Full Gym Access (All Hours)
                        </li>
                        <li className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Daily Slot Booking
                        </li>
                        <li className="flex items-center gap-3 text-sm font-bold text-indigo-900 bg-indigo-100/50 p-2 rounded-lg -ml-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Dedicated Personal Trainer
                        </li>
                     </ul>
                     <button 
                       onClick={() => handleEnroll('Premium w/ Trainer', 1000)}
                       className={`w-full py-4 rounded-xl text-sm font-bold transition-all ${(subscription && subscription.plan === 'Premium w/ Trainer') ? 'bg-indigo-100 text-indigo-700 cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/25'}`}
                     >
                       {(subscription && subscription.plan === 'Premium w/ Trainer') ? 'Actively Enrolled' : 'Enroll in Premium'}
                     </button>
                   </div>
                </div>
              </div>
            )}

            {/* --- BOOKING TAB --- */}
            {activeTab === 'book' && (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                {!subscription && (
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-red-800 text-sm font-bold flex items-center gap-3 mb-6">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                     You cannot book slots until you enroll in a Gym Membership plan.
                  </div>
                )}
                
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Select Date</label>
                  <input 
                    type="date" 
                    required
                    disabled={!subscription}
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} 
                    className="w-full border-2 border-gray-100 rounded-xl p-3.5 text-sm font-semibold focus:border-emerald-500 focus:ring-0 outline-none transition-colors disabled:opacity-50 disabled:bg-gray-100 cursor-not-allowed" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Available Hourly Slots</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {TIME_SLOTS.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        disabled={!subscription}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 rounded-xl text-sm font-bold border-2 transition-all ${
                          !subscription ? 'opacity-50 border-gray-100 cursor-not-allowed bg-gray-50' :
                          selectedSlot === slot 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                            : 'border-gray-100 hover:border-emerald-200 text-gray-600'
                        }`}
                      >
                         {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button 
                    type="submit"
                    disabled={!selectedSlot || !selectedDate || !subscription}
                    className="w-full bg-gray-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}

            {/* --- HISTORY TAB --- */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                {myBookings.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                    <p className="font-semibold text-sm">You haven't booked any sessions recently.</p>
                  </div>
                ) : (
                  myBookings.map(b => (
                    <div key={b.id} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4 items-center">
                          <div className={`p-3 rounded-xl border ${b.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          </div>
                          <div>
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-0.5">{new Date(b.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'})}</span>
                            <h4 className="font-bold text-gray-900 text-lg">{b.timeSlot}</h4>
                          </div>
                        </div>
                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          b.status === 'Active' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {b.status}
                        </span>
                      </div>
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
