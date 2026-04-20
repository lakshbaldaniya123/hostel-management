import React, { createContext, useState, useEffect } from 'react';

export const LeaveContext = createContext();

const API_URL = '/api/leaves';

export const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useState([]);

  // ── Fetch all leave requests from backend ──────────────────────────────
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setLeaves(data))
      .catch(err => console.error('Could not fetch leave requests:', err));
  }, []);

  // ── Submit a new leave request ─────────────────────────────────────────
  const addLeave = async (newLeave) => {
    try {
      const saved = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeave),
      }).then(r => r.json());
      setLeaves(prev => [saved, ...prev]);
    } catch (err) {
      console.error('Error submitting leave request:', err);
    }
  };

  // ── Update leave status (Approved / Rejected) ──────────────────────────
  const updateLeaveStatus = async (id, newStatus) => {
    try {
      const updated = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      }).then(r => r.json());
      setLeaves(prev => prev.map(l => l.id === id ? updated : l));
    } catch (err) {
      console.error('Error updating leave status:', err);
    }
  };

  return (
    <LeaveContext.Provider value={{ leaves, addLeave, updateLeaveStatus }}>
      {children}
    </LeaveContext.Provider>
  );
};
