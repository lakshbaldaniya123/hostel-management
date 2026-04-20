import React, { createContext, useState, useEffect } from 'react';

export const ComplaintContext = createContext();

const API_URL = '/api/complaints';

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);

  // ── Fetch from backend on mount ─────────────────────────────────────────
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(err => console.error('Could not fetch complaints:', err));
  }, []);

  // ── Raise a new complaint ────────────────────────────────────────────────
  const raiseComplaint = async ({ userType, name, mobile, roomNo, description, category }) => {
    const payload = {
      studentId:   '',
      studentName: name,
      roomNo:      userType === 'Student' ? roomNo : (roomNo || null),
      category:    category || userType || 'General',
      description,
      // Keep legacy fields for pages that read them
      userType,
      mobile,
    };
    try {
      const saved = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(r => r.json());
      setComplaints(prev => [saved, ...prev]);
    } catch (err) {
      console.error('Error raising complaint:', err);
    }
  };

  // ── Resolve / update complaint ───────────────────────────────────────────
  const resolveComplaint = async (id, response) => {
    try {
      const updated = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Resolved', response: response || '' }),
      }).then(r => r.json());
      setComplaints(prev => prev.map(c => c.id === id ? updated : c));
    } catch (err) {
      console.error('Error resolving complaint:', err);
    }
  };

  // ── Update complaint status generically ─────────────────────────────────
  const updateComplaintStatus = async (id, status, response) => {
    try {
      const updated = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, response: response || '' }),
      }).then(r => r.json());
      setComplaints(prev => prev.map(c => c.id === id ? updated : c));
    } catch (err) {
      console.error('Error updating complaint:', err);
    }
  };

  return (
    <ComplaintContext.Provider value={{ complaints, raiseComplaint, resolveComplaint, updateComplaintStatus }}>
      {children}
    </ComplaintContext.Provider>
  );
};
