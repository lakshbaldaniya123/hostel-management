import React, { createContext, useState, useEffect } from 'react';

export const MeetingContext = createContext();

const API_URL = '/api/meetings';

export const MeetingProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([]);

  // Fetch meetings from database on load
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMeetings(data))
      .catch(err => console.error("Could not fetch meetings from backend:", err));
  }, []);

  const scheduleMeeting = async ({ title, targetRole, description, date, time }) => {
    const newMeeting = {
      id: `MTG${Date.now()}`,
      title,
      targetRole,
      description,
      date,
      time,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeeting)
      });
      const savedData = await response.json();
      setMeetings(prev => [savedData, ...prev]);
    } catch (err) {
      console.error("Error creating meeting:", err);
    }
  };

  return (
    <MeetingContext.Provider value={{ meetings, scheduleMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
};
