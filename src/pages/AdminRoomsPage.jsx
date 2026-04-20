import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { HostelContext } from '../context/HostelContext';

export default function AdminRoomsPage() {
  const { rooms, students } = useContext(HostelContext);

  const blocks = ['A', 'B', 'C', 'D'];

  const getOccupantNames = (studentIds) => {
    if (!studentIds || studentIds.length === 0) return null;
    return studentIds.map(id => {
      const s = students.find(st => st.studentId === id);
      return s ? s.name : id;
    }).join(', ');
  };

  return (
    <div className="flex bg-white font-sans text-gray-800" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar role="Admin" />
      
      <main className="flex-1 flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
        <Topbar />
        
        <div className="p-8 overflow-y-auto" style={{ flex: 1 }}>
          <h1 className="text-2xl font-bold text-[#1f2937] mb-6">Room Allocation</h1>
          
          {/* Block Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {blocks.map(block => {
              const blockRooms = rooms.filter(r => r.block === block);
              const t = blockRooms.reduce((acc, r) => acc + (r.capacity || 2), 0) || 50; // Fallback to 50 if no rooms
              const o = blockRooms.reduce((acc, r) => acc + (r.occupants || 0), 0) || 0;
              const m = blockRooms.filter(r => r.availabilityStatus === 'Maintenance').length || 0;
              const v = Math.max(0, t - o - m);
              const d = { o, t, v, m };
              
              return (
                <div key={block} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-4 text-[#1f2937]">
                    <h2 className="text-[17px] font-bold">Block {block}</h2>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
                    </svg>
                  </div>
                  
                  <div className="flex justify-between items-center text-[15px] mb-2">
                    <span className="text-gray-500">Occupied</span>
                    <span className="text-gray-700">{d.o}/{d.t}</span>
                  </div>
                  <div className="flex justify-between items-center text-[15px] mb-2">
                    <span className="text-gray-500">Vacant</span>
                    <span className="text-green-600">{d.v}</span>
                  </div>
                  <div className="flex justify-between items-center text-[15px] mb-4">
                    <span className="text-gray-500">Maintenance</span>
                    <span className="text-red-500">{d.m}</span>
                  </div>
                  
                  <div className="w-full bg-[#eef2f6] rounded-full h-2 mt-auto overflow-hidden">
                    <div className="bg-[#1f7ca4] h-full rounded-full" style={{ width: `${(d.o/d.t)*100}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[400px]">
            <h2 className="text-[19px] font-bold text-[#1f2937] mb-6">Room Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {rooms.filter(r => r.roomNo.includes('-')).map((room, idx) => {
                let badgeClass = '';
                let visualStatus = '';
                
                if (room.availabilityStatus === 'Maintenance') {
                  badgeClass = 'bg-[#dc2626] text-white';
                  visualStatus = 'Maintenance';
                } else if (room.occupants === 0) {
                  badgeClass = 'bg-[#f3f4f6] text-gray-800';
                  visualStatus = 'Vacant';
                } else if (room.occupants < room.capacity) {
                  badgeClass = 'bg-white text-gray-800 border-gray-200 border';
                  visualStatus = 'Partial';
                } else {
                  badgeClass = 'bg-[#378fa6] text-white'; // Teal/Blue matching image
                  visualStatus = 'Occupied';
                }

                const occupantNames = getOccupantNames(room.studentIds);
                
                return (
                  <div key={room.roomNo} className="border border-gray-100 rounded-[14px] p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-[#1f2937]">{room.roomNo}</h3>
                      <span className={`text-[11px] font-bold px-3 py-[4px] rounded-full ${badgeClass}`}>
                        {visualStatus}
                      </span>
                    </div>
                    <div className="text-[14px] text-gray-500 mb-2">
                      Type: {room.type} • Block {room.block}
                    </div>
                    {occupantNames && (
                      <div className="text-[14px] text-gray-600 mt-2 line-clamp-2">
                        Occupants: {occupantNames}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
