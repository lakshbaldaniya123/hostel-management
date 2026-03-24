import React, { createContext, useState } from 'react';

export const LeaveContext = createContext();

const initialLeaves = [
  {
    id: 'LV-1009',
    studentName: 'Lakshya Baldaniya',
    roomNo: 'A-204',
    parentPhone: '+91 91234 56789',
    fromDate: '2026-03-30',
    fromTime: '10:00',
    toDate: '2026-04-05',
    toTime: '18:00',
    reason: "Attending sister's wedding ceremony in my hometown.",
    status: 'Pending'
  },
  {
    id: 'LV-1008',
    studentName: 'Aman Sharma',
    roomNo: 'B-112',
    parentPhone: '+91 98765 43210',
    fromDate: '2026-03-25',
    fromTime: '06:00',
    toDate: '2026-03-26',
    toTime: '20:00',
    reason: 'Medical checkup and dentist appointment.',
    status: 'Pending'
  },
  {
    id: 'LV-1001',
    studentName: 'Roshan Moradiya',
    roomNo: 'A-204',
    parentPhone: '+91 99887 77665',
    fromDate: '2026-03-10',
    fromTime: '08:00',
    toDate: '2026-03-12',
    toTime: '18:00',
    reason: 'Going home for a family function.',
    status: 'Approved'
  }
];

export const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useState(initialLeaves);

  const addLeave = (newLeave) => {
    // Inject default student details for the demo
    const leaveWithDetails = {
      ...newLeave,
      studentName: 'Shyam',       // Default demo student
      roomNo: '204',
      parentPhone: '+91 98765 43210'
    };
    setLeaves([leaveWithDetails, ...leaves]);
  };

  const updateLeaveStatus = (id, newStatus) => {
    setLeaves(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  return (
    <LeaveContext.Provider value={{ leaves, addLeave, updateLeaveStatus }}>
      {children}
    </LeaveContext.Provider>
  );
};
