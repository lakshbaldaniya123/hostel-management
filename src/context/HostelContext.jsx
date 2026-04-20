import React, { createContext, useState, useEffect } from 'react';

export const HostelContext = createContext();

const API = '/api';

export const HostelProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);

  // ── Fetch from backend on mount ─────────────────────────────────────────
  useEffect(() => {
    fetch(`${API}/students`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error('Could not fetch students:', err));

    fetch(`${API}/rooms`)
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error('Could not fetch rooms:', err));
  }, []);

  // ── Helpers to sync two rooms at once ───────────────────────────────────
  const _patchRoom = async (roomNo, body) => {
    const res = await fetch(`${API}/rooms/${encodeURIComponent(roomNo)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.json();
  };

  // ── Allocate student to a new room ──────────────────────────────────────
  const allocateStudentToRoom = async (studentId, newRoomNo) => {
    const student = students.find(s => s.studentId === studentId);
    if (!student) return;
    const oldRoomNo = student.roomNo;

    try {
      // Update student record
      const updatedStudent = await fetch(`${API}/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomNo: newRoomNo }),
      }).then(r => r.json());

      // Update old room — remove student
      const oldRoom = rooms.find(r => r.roomNo === oldRoomNo);
      if (oldRoom) {
        const newIds = oldRoom.studentIds.filter(id => id !== studentId);
        const updatedOld = await _patchRoom(oldRoomNo, {
          studentIds: newIds,
          occupants: newIds.length,
          availabilityStatus: oldRoom.availabilityStatus === 'Maintenance'
            ? 'Maintenance'
            : newIds.length >= oldRoom.capacity ? 'Full' : 'Available',
        });
        setRooms(prev => prev.map(r => r.roomNo === oldRoomNo ? updatedOld : r));
      }

      // Update new room — add student
      const newRoom = rooms.find(r => r.roomNo === newRoomNo);
      if (newRoom) {
        const newIds = newRoom.studentIds.includes(studentId)
          ? newRoom.studentIds
          : [...newRoom.studentIds, studentId];
        const updatedNew = await _patchRoom(newRoomNo, {
          studentIds: newIds,
          occupants: newIds.length,
          availabilityStatus: newRoom.availabilityStatus === 'Maintenance'
            ? 'Maintenance'
            : newIds.length >= newRoom.capacity ? 'Full' : 'Available',
        });
        setRooms(prev => prev.map(r => r.roomNo === newRoomNo ? updatedNew : r));
      }

      setStudents(prev => prev.map(s => s.studentId === studentId ? updatedStudent : s));
    } catch (err) {
      console.error('Error allocating student to room:', err);
    }
  };

  // ── Remove student from room ─────────────────────────────────────────────
  const removeStudentFromRoom = async (studentId) => {
    const student = students.find(s => s.studentId === studentId);
    if (!student) return;
    const oldRoomNo = student.roomNo;

    try {
      const updatedStudent = await fetch(`${API}/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomNo: 'Unassigned' }),
      }).then(r => r.json());

      const oldRoom = rooms.find(r => r.roomNo === oldRoomNo);
      if (oldRoom) {
        const newIds = oldRoom.studentIds.filter(id => id !== studentId);
        const updatedOld = await _patchRoom(oldRoomNo, {
          studentIds: newIds,
          occupants: newIds.length,
          availabilityStatus: oldRoom.availabilityStatus === 'Maintenance'
            ? 'Maintenance'
            : newIds.length >= oldRoom.capacity ? 'Full' : 'Available',
        });
        setRooms(prev => prev.map(r => r.roomNo === oldRoomNo ? updatedOld : r));
      }

      setStudents(prev => prev.map(s => s.studentId === studentId ? updatedStudent : s));
    } catch (err) {
      console.error('Error removing student from room:', err);
    }
  };

  // ── Update student details ───────────────────────────────────────────────
  const updateStudentDetails = async (studentId, newDetails) => {
    try {
      const { roomNo: _ignored, ...safeDetails } = newDetails;
      const updatedStudent = await fetch(`${API}/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(safeDetails),
      }).then(r => r.json());
      setStudents(prev => prev.map(s => s.studentId === studentId ? updatedStudent : s));
    } catch (err) {
      console.error('Error updating student details:', err);
    }
  };

  // ── Enroll a brand-new student (Admin only) ──────────────────────────────
  const enrollStudent = async (formData) => {
    const res = await fetch(`${API}/students/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Enrollment failed');

    // Update local state immediately — no need to refetch
    setStudents(prev => [...prev, data.student]);
    setRooms(prev => prev.map(r =>
      r.roomNo === data.assignedRoom
        ? { ...r,
            occupants:  r.occupants + 1,
            studentIds: [...r.studentIds, data.student.studentId],
            availabilityStatus: (r.occupants + 1) >= r.capacity ? 'Full' : 'Available',
          }
        : r
    ));
    return data; // { student, assignedRoom, loginId, password, message }
  };

  return (
    <HostelContext.Provider value={{
      students, rooms,
      allocateStudentToRoom, removeStudentFromRoom, updateStudentDetails, enrollStudent,
    }}>
      {children}
    </HostelContext.Provider>
  );
};
