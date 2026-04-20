import React, { createContext, useState, useEffect } from 'react';

export const GatePassContext = createContext();

const API_URL = '/api/gatepasses';

export const GatePassProvider = ({ children }) => {
  const [gatePasses, setGatePasses] = useState([]);

  // ── Fetch from backend on mount ─────────────────────────────────────────
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setGatePasses(data))
      .catch(err => console.error('Could not fetch gate passes:', err));
  }, []);

  // ── Helper: PATCH a gate pass status ────────────────────────────────────
  const _patch = async (id, body) => {
    const updated = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(r => r.json());
    setGatePasses(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  };

  // ── Request a new gate pass ──────────────────────────────────────────────
  const requestPass = async (name, room, dates, reason, studentId, destination = '') => {
    const payload = {
      studentId:   studentId || '',
      studentName: name,
      roomNo:      room,
      destination: destination,
      purpose:     reason,
      exitTime:    '',
      returnTime:  '',
      // Legacy field kept for backwards compat with SecurityGatePassPage
      dates,
      reason,
      name,
      room,
    };
    try {
      const saved = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(r => r.json());
      setGatePasses(prev => [saved, ...prev]);
    } catch (err) {
      console.error('Error requesting gate pass:', err);
    }
  };

  const approvePass    = (id) => _patch(id, { status: 'Approved' });
  const rejectPass     = (id) => _patch(id, { status: 'Rejected' });
  const markExit       = (id) => _patch(id, { status: 'Out of Campus' });
  const markReturn     = (id) => _patch(id, { status: 'Returned' });

  return (
    <GatePassContext.Provider value={{
      gatePasses,
      requestPass,
      approvePass,
      rejectPass,
      markExit,
      markReturn,
    }}>
      {children}
    </GatePassContext.Provider>
  );
};
