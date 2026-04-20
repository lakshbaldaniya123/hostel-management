import React, { createContext, useState, useEffect } from 'react';

export const FeesContext = createContext();

const API_URL = '/api/fees';

export const FeesProvider = ({ children }) => {
  const [feeRecords, setFeeRecords] = useState([]);

  // ── Fetch from backend on mount ─────────────────────────────────────────
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setFeeRecords(data))
      .catch(err => console.error('Could not fetch fee records:', err));
  }, []);

  // ── Mark fees as paid ────────────────────────────────────────────────────
  const payFees = async (studentId) => {
    try {
      // Find the pending record for this student
      const record = feeRecords.find(
        r => (r.studentId === studentId || r.studentName === studentId) && r.status !== 'Paid'
      );
      if (!record) return;

      const updated = await fetch(`${API_URL}/${record.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Paid',
          paidDate: new Date().toISOString().split('T')[0],
          pendingFees: 0,
        }),
      }).then(r => r.json());

      setFeeRecords(prev => prev.map(r => r.id === record.id ? updated : r));
    } catch (err) {
      console.error('Error paying fees:', err);
    }
  };

  // ── Mark penalty as paid ─────────────────────────────────────────────────
  const payPenalties = async (studentId) => {
    try {
      const record = feeRecords.find(
        r => (r.studentId === studentId || r.studentName === studentId) && (r.penalties || 0) > 0
      );
      if (!record) return;

      const updated = await fetch(`${API_URL}/${record.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ penalties: 0 }),
      }).then(r => r.json());

      setFeeRecords(prev => prev.map(r => r.id === record.id ? updated : r));
    } catch (err) {
      console.error('Error paying penalties:', err);
    }
  };

  // ── Deduct penalty from security deposit ─────────────────────────────────
  const deductFromDeposit = async (studentId) => {
    try {
      const record = feeRecords.find(
        r => (r.studentId === studentId || r.studentName === studentId)
      );
      if (!record || !record.penalties || record.penalties <= 0) return;

      const updated = await fetch(`${API_URL}/${record.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          securityDeposit: (record.securityDeposit || 0) - record.penalties,
          penalties: 0,
        }),
      }).then(r => r.json());

      setFeeRecords(prev => prev.map(r => r.id === record.id ? updated : r));
    } catch (err) {
      console.error('Error deducting from deposit:', err);
    }
  };

  // ── Generic update for Admin fee management ──────────────────────────────
  const updateFeeRecord = async (id, updates) => {
    try {
      const updated = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      }).then(r => r.json());
      setFeeRecords(prev => prev.map(r => r.id === id ? updated : r));
    } catch (err) {
      console.error('Error updating fee record:', err);
    }
  };

  return (
    <FeesContext.Provider value={{
      feeRecords,
      payFees,
      payPenalties,
      deductFromDeposit,
      updateFeeRecord,
    }}>
      {children}
    </FeesContext.Provider>
  );
};
