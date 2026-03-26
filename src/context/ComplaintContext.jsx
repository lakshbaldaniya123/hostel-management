import React, { createContext, useState } from 'react';

export const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([
    {
      id: 'CMP001',
      userType: 'Student',
      name: 'Lakshya B.',
      mobile: '+91 9876543210',
      roomNo: '305',
      description: 'Loud music from the adjacent room late at night disrupting study time.',
      status: 'Pending',
      registeredAt: '2026-03-24T22:30:00Z'
    },
    {
      id: 'CMP002',
      userType: 'Staff',
      name: 'Ramesh Singh',
      mobile: '+91 9988776655',
      roomNo: null,
      description: 'Main corridor lights are broken on the 2nd floor, unsafe for night rounds.',
      status: 'Resolved',
      registeredAt: '2026-03-25T14:15:00Z'
    },
    {
      id: 'CMP003',
      userType: 'Security',
      name: 'Guard Sharma',
      mobile: '+91 8877665544',
      roomNo: 'Gate 2',
      description: 'Found unknown individuals loitering near Block C after curfew hours.',
      status: 'Pending',
      registeredAt: new Date(Date.now() - 3600000).toISOString()
    }
  ]);

  const raiseComplaint = ({ userType, name, mobile, roomNo, description }) => {
    const newComplaint = {
      id: `CMP00${complaints.length + 1}`,
      userType,
      name,
      mobile,
      roomNo: userType === 'Student' ? roomNo : null,
      description,
      status: 'Pending',
      registeredAt: new Date().toISOString()
    };
    setComplaints(prev => [newComplaint, ...prev]);
  };

  const resolveComplaint = (id) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
  };

  return (
    <ComplaintContext.Provider value={{ complaints, raiseComplaint, resolveComplaint }}>
      {children}
    </ComplaintContext.Provider>
  );
};
