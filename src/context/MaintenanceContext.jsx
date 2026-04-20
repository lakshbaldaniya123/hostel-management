import React, { createContext, useState, useEffect } from 'react';

export const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  
  // Base API URL
  const API_URL = '/api/maintenance';

  // Fetch from Backend
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error("Could not fetch maintenance data from backend:", err));
  }, []);

  const addRequest = async (studentId, studentName, roomNo, issueType, description, image = null) => {
    const newRequest = {
      studentId,
      studentName,
      roomNo,
      issueType,
      description,
      image,
      status: 'Pending',
      scheduledDate: null,
      scheduledTime: null,
      registeredAt: new Date().toISOString(),
      rejectionReason: null,
    };
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to submit maintenance request: ${errorData.message}`);
        throw new Error(errorData.message);
      }
      const savedData = await response.json();
      setRequests(prev => [savedData, ...prev]);
    } catch(err) { 
      console.error("Error creating maintenance request:", err); 
    }
  };

  const scheduleRequest = async (requestId, scheduledDate, scheduledTime) => {
    try {
      const response = await fetch(`${API_URL}/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Scheduled', scheduledDate, scheduledTime, rejectionReason: null })
      });
      const updatedReq = await response.json();
      setRequests(prev => prev.map(req => req.id === requestId ? updatedReq : req));
    } catch(err) { console.error("Error scheduling maintenance:", err); }
  };

  const completeRequest = async (requestId) => {
    try {
      const response = await fetch(`${API_URL}/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Completed' })
      });
      const updatedReq = await response.json();
      setRequests(prev => prev.map(req => req.id === requestId ? updatedReq : req));
    } catch(err) { console.error("Error completing maintenance:", err); }
  };

  const rejectSchedule = async (requestId, reason) => {
    try {
      const response = await fetch(`${API_URL}/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Reschedule Requested', scheduledDate: null, scheduledTime: null, rejectionReason: reason })
      });
      const updatedReq = await response.json();
      setRequests(prev => prev.map(req => req.id === requestId ? updatedReq : req));
    } catch(err) { console.error("Error modifying schedule:", err); }
  };

  return (
    <MaintenanceContext.Provider value={{ requests, addRequest, scheduleRequest, completeRequest, rejectSchedule }}>
      {children}
    </MaintenanceContext.Provider>
  );
};
