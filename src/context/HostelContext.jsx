import React, { createContext, useState } from 'react';

export const HostelContext = createContext();

export const HostelProvider = ({ children }) => {
  const [students, setStudents] = useState([
    { 
      studentId: 'STU001', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 9876543210', 
      course: 'B.Tech IT', roomNo: 'A-101', status: 'In Hostel', parentName: 'Mr. Sharma', 
      parentPhone: '+91 9988776655', feesStatus: 'Paid', 
      entryExitLogs: [] 
    },
    { 
      studentId: 'STU002', name: 'Deepak Verma', email: 'deepak@example.com', phone: '+91 9876543211', 
      course: 'B.Tech CS', roomNo: 'A-101', status: 'In Hostel', parentName: 'Mr. Verma', 
      parentPhone: '+91 9988776644', feesStatus: 'Pending', 
      entryExitLogs: [] 
    },
    { 
      studentId: 'STU003', name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 9876543212', 
      course: 'B.Tech CE', roomNo: 'A-102', status: 'In Hostel', parentName: 'Mr. Reddy', 
      parentPhone: '+91 9988776633', feesStatus: 'Paid', 
      entryExitLogs: [] 
    },
    { 
      studentId: 'STU004', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 9876543213', 
      course: 'B.Sc Physics', roomNo: 'B-205', status: 'In Hostel', parentName: 'Mr. Patel', 
      parentPhone: '+91 9988776622', feesStatus: 'Paid', 
      entryExitLogs: [] 
    },
    { 
      studentId: 'STU005', name: 'Anita Singh', email: 'anita@example.com', phone: '+91 9876543214', 
      course: 'B.Tech EE', roomNo: 'B-205', status: 'In Hostel', parentName: 'Mr. Singh', 
      parentPhone: '+91 9988776611', feesStatus: 'Pending', 
      entryExitLogs: [] 
    },
    { 
      studentId: 'STU006', name: 'Ananya Gupta', email: 'ananya@example.com', phone: '+91 9876543215', 
      course: 'B.Tech ME', roomNo: 'D-401', status: 'In Hostel', parentName: 'Mr. Gupta', 
      parentPhone: '+91 9988776600', feesStatus: 'Paid', 
      entryExitLogs: [] 
    },
  ]);

  const [rooms, setRooms] = useState([
    { roomNo: 'A-101', capacity: 2, occupants: 2, availabilityStatus: 'Full', studentIds: ['STU001', 'STU002'], block: 'A', type: 'Double' },
    { roomNo: 'A-102', capacity: 1, occupants: 1, availabilityStatus: 'Full', studentIds: ['STU003'], block: 'A', type: 'Single' },
    { roomNo: 'A-103', capacity: 2, occupants: 0, availabilityStatus: 'Available', studentIds: [], block: 'A', type: 'Double' },
    { roomNo: 'B-205', capacity: 3, occupants: 2, availabilityStatus: 'Available', studentIds: ['STU004', 'STU005'], block: 'B', type: 'Triple' },
    { roomNo: 'C-312', capacity: 2, occupants: 0, availabilityStatus: 'Maintenance', studentIds: [], block: 'C', type: 'Double' },
    { roomNo: 'D-401', capacity: 1, occupants: 1, availabilityStatus: 'Full', studentIds: ['STU006'], block: 'D', type: 'Single' },
    // A few old ones to preserve existing structure for other pages if needed
    { roomNo: '108', capacity: 2, occupants: 0, availabilityStatus: 'Available', studentIds: [], block: 'A', type: 'Double' },
    { roomNo: '201', capacity: 3, occupants: 0, availabilityStatus: 'Available', studentIds: [], block: 'B', type: 'Triple' },
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
