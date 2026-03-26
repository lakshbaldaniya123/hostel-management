import React, { createContext, useState } from 'react';

export const HostelContext = createContext();

export const HostelProvider = ({ children }) => {
  const [students, setStudents] = useState([
    { 
      studentId: 'STU001', name: 'Roshan M.', email: 'roshan@example.com', phone: '+91 9876543210', 
      course: 'B.Tech IT', roomNo: '201', status: 'In Hostel', parentName: 'Mr. M. Sharma', 
      parentPhone: '+91 9988776655', feesStatus: 'Paid', 
      entryExitLogs: [{ id: 1, type: 'Entry', time: '18:30', date: '26 Mar 2026', gate: 'Main Gate' }] 
    },
    { 
      studentId: 'STU002', name: 'Lakshya B.', email: 'lakshya@example.com', phone: '+91 9876543211', 
      course: 'B.Tech CS', roomNo: '305', status: 'Out', parentName: 'Mr. B. Patel', 
      parentPhone: '+91 9988776644', feesStatus: 'Pending', 
      entryExitLogs: [{ id: 3, type: 'Exit', time: '14:00', date: '26 Mar 2026', gate: 'Gate 2 (Leave)' }] 
    },
    { 
      studentId: 'STU003', name: 'Ankit S.', email: 'ankit@example.com', phone: '+91 9876543212', 
      course: 'B.Tech CE', roomNo: '108', status: 'In Hostel', parentName: 'Mr. S. Kumar', 
      parentPhone: '+91 9988776633', feesStatus: 'Paid', 
      entryExitLogs: [{ id: 5, type: 'Entry', time: '20:15', date: '25 Mar 2026', gate: 'Main Gate' }] 
    },
    { 
      studentId: 'STU004', name: 'Priya R.', email: 'priya@example.com', phone: '+91 9876543213', 
      course: 'B.Sc Physics', roomNo: '214', status: 'In Hostel', parentName: 'Mr. R. Singh', 
      parentPhone: '+91 9988776622', feesStatus: 'Paid', 
      entryExitLogs: [{ id: 7, type: 'Entry', time: '09:10', date: '26 Mar 2026', gate: 'Gate 2' }] 
    },
    { 
      studentId: 'STU005', name: 'Rahul V.', email: 'rahul@example.com', phone: '+91 9876543214', 
      course: 'B.Tech EE', roomNo: 'Unassigned', status: 'Out', parentName: 'Mr. V. Verma', 
      parentPhone: '+91 9988776611', feesStatus: 'Pending', 
      entryExitLogs: [] 
    },
  ]);

  const [rooms, setRooms] = useState([
    { roomNo: '108', capacity: 2, occupants: 1, availabilityStatus: 'Available', studentIds: ['STU003'] },
    { roomNo: '201', capacity: 3, occupants: 1, availabilityStatus: 'Available', studentIds: ['STU001'] },
    { roomNo: '214', capacity: 2, occupants: 1, availabilityStatus: 'Available', studentIds: ['STU004'] },
    { roomNo: '305', capacity: 1, occupants: 1, availabilityStatus: 'Full', studentIds: ['STU002'] },
    { roomNo: '401', capacity: 3, occupants: 0, availabilityStatus: 'Available', studentIds: [] },
    { roomNo: '402', capacity: 2, occupants: 0, availabilityStatus: 'Maintenance', studentIds: [] },
  ]);

  const allocateStudentToRoom = (studentId, newRoomNo) => {
    const student = students.find(s => s.studentId === studentId);
    if (!student) return;
    const oldRoomNo = student.roomNo;
    
    setRooms(prevRooms => prevRooms.map(r => {
      let rCopy = { ...r, studentIds: [...r.studentIds] };
      // Remove from old room
      if (rCopy.roomNo === oldRoomNo) {
        rCopy.studentIds = rCopy.studentIds.filter(id => id !== studentId);
        rCopy.occupants = rCopy.studentIds.length;
        if (rCopy.availabilityStatus !== 'Maintenance') {
          rCopy.availabilityStatus = rCopy.occupants >= rCopy.capacity ? 'Full' : 'Available';
        }
      }
      // Add to new room
      if (rCopy.roomNo === newRoomNo) {
        if (!rCopy.studentIds.includes(studentId)) {
          rCopy.studentIds.push(studentId);
        }
        rCopy.occupants = rCopy.studentIds.length;
        if (rCopy.availabilityStatus !== 'Maintenance') {
          rCopy.availabilityStatus = rCopy.occupants >= rCopy.capacity ? 'Full' : 'Available';
        }
      }
      return rCopy;
    }));

    setStudents(prev => prev.map(s => s.studentId === studentId ? { ...s, roomNo: newRoomNo } : s));
  };

  const removeStudentFromRoom = (studentId) => {
    const student = students.find(s => s.studentId === studentId);
    if (!student) return;
    const oldRoomNo = student.roomNo;

    setRooms(prevRooms => prevRooms.map(r => {
      let rCopy = { ...r, studentIds: [...r.studentIds] };
      if (rCopy.roomNo === oldRoomNo) {
        rCopy.studentIds = rCopy.studentIds.filter(id => id !== studentId);
        rCopy.occupants = rCopy.studentIds.length;
        if (rCopy.availabilityStatus !== 'Maintenance') {
          rCopy.availabilityStatus = rCopy.occupants >= rCopy.capacity ? 'Full' : 'Available';
        }
      }
      return rCopy;
    }));

    setStudents(prev => prev.map(s => s.studentId === studentId ? { ...s, roomNo: 'Unassigned' } : s));
  };

  const updateStudentDetails = (studentId, newDetails) => {
    // We intentionally ignore roomNo in general details updates to preserve workflow
    // Only allocateStudentToRoom should push room changes
    setStudents(prev => prev.map(s => s.studentId === studentId ? { ...s, ...newDetails, roomNo: s.roomNo } : s));
  };

  return (
    <HostelContext.Provider value={{ 
      students, rooms, 
      allocateStudentToRoom, removeStudentFromRoom, updateStudentDetails 
    }}>
      {children}
    </HostelContext.Provider>
  );
};
