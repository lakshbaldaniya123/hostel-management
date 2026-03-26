import React, { createContext, useState } from 'react';

export const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [requests, setRequests] = useState([
    {
      id: 'M001',
      studentId: 'STU001',
      studentName: 'Roshan M.',
      roomNo: '201',
      issueType: 'Electrical',
      description: 'Fan is making a loud noise and speed is very slow.',
      status: 'Scheduled',
      scheduledDate: '2026-03-27',
      scheduledTime: '14:30',
      registeredAt: '2026-03-25T10:00:00Z',
      rejectionReason: null,
    },
    {
      id: 'M002',
      studentId: 'STU002',
      studentName: 'Lakshya B.',
      roomNo: '305',
      issueType: 'Plumbing',
      description: 'The tap in the attached washroom is leaking continuously.',
      status: 'Pending',
      scheduledDate: null,
      scheduledTime: null,
      registeredAt: '2026-03-26T08:15:00Z',
      rejectionReason: null,
    },
    {
      id: 'M003',
      studentId: 'STU003',
      studentName: 'Ankit S.',
      roomNo: '108',
      issueType: 'Furniture',
      description: 'Study table leg is broken.',
      status: 'Completed',
      scheduledDate: '2026-03-22',
      scheduledTime: '11:00',
      registeredAt: '2026-03-20T09:45:00Z',
      rejectionReason: null,
    }
  ]);

  const addRequest = (studentId, studentName, roomNo, issueType, description) => {
    const newRequest = {
      id: `M00${requests.length + 1}`,
      studentId,
      studentName,
      roomNo,
      issueType,
      description,
      status: 'Pending',
      scheduledDate: null,
      scheduledTime: null,
      registeredAt: new Date().toISOString(),
      rejectionReason: null,
    };
    setRequests(prev => [newRequest, ...prev]);
  };

  const scheduleRequest = (requestId, scheduledDate, scheduledTime) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'Scheduled', scheduledDate, scheduledTime, rejectionReason: null } 
        : req
    ));
  };

  const completeRequest = (requestId) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'Completed' } 
        : req
    ));
  };

  const rejectSchedule = (requestId, reason) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'Reschedule Requested', scheduledDate: null, scheduledTime: null, rejectionReason: reason } 
        : req
    ));
  };

  return (
    <MaintenanceContext.Provider value={{ requests, addRequest, scheduleRequest, completeRequest, rejectSchedule }}>
      {children}
    </MaintenanceContext.Provider>
  );
};
