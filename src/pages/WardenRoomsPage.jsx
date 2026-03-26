import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { HostelContext } from '../context/HostelContext';

export default function WardenRoomsPage() {
  const { students, rooms, allocateStudentToRoom, removeStudentFromRoom } = useContext(HostelContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modal states for allocating/releasing
  const [selectedRoomNo, setSelectedRoomNo] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'ALLOCATE' or 'RELEASE'
  const [studentInputId, setStudentInputId] = useState('');

  // derived state for selected room to keep it fresh
  const selectedRoom = rooms.find(r => r.roomNo === selectedRoomNo) || null;

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNo.includes(searchTerm);
    const matchesFilter = filterStatus === 'All' ? true : room.availabilityStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStudentName = (id) => {
    const s = students.find(st => st.studentId === id);
    return s ? s.name : 'Unknown';
  };

  const handleAllocate = () => {
    if (!studentInputId) return;
    allocateStudentToRoom(studentInputId, selectedRoom.roomNo);
    closeModal();
  };

  const handleRelease = (studentId) => {
    removeStudentFromRoom(studentId);
  };

  const closeModal = () => {
    setSelectedRoomNo(null);
    setModalAction(null);
    setStudentInputId('');
  };

  // derived unassigned students to easily select them as partners
  const availableStudents = students.filter(s => s.roomNo !== selectedRoomNo);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar role="Warden" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Hostel Rooms Overview
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Group room partners and manage room capacities instantly updating global bounds.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col text-right">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Capacity</span>
              <span className="text-lg font-bold text-gray-900">
                {rooms.reduce((acc, r) => acc + (r.availabilityStatus !== 'Maintenance' ? r.capacity : 0), 0)}
              </span>
            </div>
            <div className="w-1 h-8 bg-gray-200 mx-2 rounded-full"></div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Occupied</span>
              <span className="text-lg font-bold text-indigo-600">
                {rooms.reduce((acc, r) => acc + r.occupants, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar (Search & Filter) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors" 
              placeholder="Search room number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {['All', 'Available', 'Full', 'Maintenance'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filterStatus === status 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {status} {status !== 'All' && `(${rooms.filter(r => r.availabilityStatus === status).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <div key={room.roomNo} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              
              <div className="p-5 border-b border-gray-50 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-indigo-500 text-lg">🚪</span> {room.roomNo}
                  </h3>
                  <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">
                    Capacity: {room.capacity}
                  </p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  room.availabilityStatus === 'Available' ? 'bg-green-100 text-green-700 border border-green-200/50' :
                  room.availabilityStatus === 'Full' ? 'bg-red-50 text-red-600 border border-red-100' :
                  'bg-orange-100 text-orange-700 border border-orange-200/50'
                }`}>
                  {room.availabilityStatus}
                </span>
              </div>
              
              <div className="p-5 flex-1 bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-700">Occupancy</span>
                  <span className="text-sm font-bold text-indigo-600">{room.occupants} / {room.capacity}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${room.availabilityStatus === 'Available' ? 'bg-green-500' : room.availabilityStatus === 'Maintenance' ? 'bg-orange-400' : 'bg-red-500'}`} 
                    style={{ width: `${room.capacity === 0 ? 0 : (room.occupants / room.capacity) * 100}%` }}
                  ></div>
                </div>

                <div className="space-y-1.5">
                  {room.studentIds.length > 0 ? (
                    room.studentIds.map((stId, idx) => (
                      <div key={idx} className="text-sm text-gray-600 flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                          {getStudentName(stId)}
                        </div>
                        <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">partner</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400 italic">No students allocated</div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white border-t border-gray-50 flex gap-2">
                <button 
                  disabled={room.availabilityStatus === 'Full' || room.availabilityStatus === 'Maintenance'}
                  onClick={() => { setSelectedRoomNo(room.roomNo); setModalAction('ALLOCATE'); }}
                  className="flex-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Allocate Partner
                </button>
                <button 
                  disabled={room.studentIds.length === 0}
                  onClick={() => { setSelectedRoomNo(room.roomNo); setModalAction('RELEASE'); }}
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Release
                </button>
              </div>

            </div>
          ))}

          {filteredRooms.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400">
              No rooms found matching your criteria.
            </div>
          )}
        </div>
      </main>

      {/* Allocation / Release Modal */}
      {selectedRoom && modalAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className={`p-5 text-white ${modalAction === 'ALLOCATE' ? 'bg-indigo-600' : 'bg-red-600'}`}>
              <h3 className="text-lg font-bold">
                {modalAction === 'ALLOCATE' ? `Allocate Partner to Room ${selectedRoom.roomNo}` : `Release Room ${selectedRoom.roomNo}`}
              </h3>
              <p className="text-sm opacity-80 mt-1">
                {modalAction === 'ALLOCATE' ? 'Select an unassigned or reassigning student.' : 'Select a student to remove from this room.'}
              </p>
            </div>
            
            <div className="p-6">
              {modalAction === 'ALLOCATE' && (
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Select Student</label>
                  <select 
                    value={studentInputId}
                    onChange={(e) => setStudentInputId(e.target.value)}
                    className="w-full border border-gray-300 bg-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    autoFocus
                  >
                    <option value="" disabled>-- Choose a student --</option>
                    {availableStudents.map(s => (
                      <option key={s.studentId} value={s.studentId}>
                        {s.name} ({s.studentId}) - Currently: {s.roomNo}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {modalAction === 'RELEASE' && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Current Occupants</label>
                  {selectedRoom.studentIds.length > 0 ? (
                    selectedRoom.studentIds.map(stId => (
                      <div key={stId} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                        <span className="text-sm font-bold text-gray-800">{getStudentName(stId)}</span>
                        <button 
                          onClick={() => handleRelease(stId)}
                          className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-md transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">Room is now empty.</p>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                {modalAction === 'ALLOCATE' ? 'Cancel' : 'Done'}
              </button>
              {modalAction === 'ALLOCATE' && (
                <button 
                  onClick={handleAllocate}
                  disabled={!studentInputId}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  Confirm Allocation
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
