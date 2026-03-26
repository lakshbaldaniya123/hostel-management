import React, { createContext, useState } from 'react';

export const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([
    {
      id: 'MTG001',
      title: 'Hostel Decorum Rules',
      targetRole: 'Student', // 'Student', 'Housekeeper', 'Security', 'All'
      description: 'Mandatory meeting to discuss noise levels and updated curfew policies.',
      date: '2026-03-28',
      time: '18:00',
      createdAt: '2026-03-24T10:00:00Z'
    },
    {
      id: 'MTG002',
      title: 'Monthly Safety Protocol',
      targetRole: 'Security',
      description: 'Reviewing modern entry/exit logging processes and dealing with loitering.',
      date: '2026-03-30',
      time: '09:00',
      createdAt: '2026-03-25T14:30:00Z'
    },
    {
      id: 'MTG003',
      title: 'General Premises Status',
      targetRole: 'All',
      description: 'Open floor regarding upcoming holiday closures and utility maintenance.',
      date: '2026-04-05',
      time: '19:00',
      createdAt: '2026-03-26T08:15:00Z'
    }
  ]);

  const scheduleMeeting = ({ title, targetRole, description, date, time }) => {
    const newMeeting = {
      id: `MTG00${meetings.length + 1}`,
      title,
      targetRole,
      description,
      date,
      time,
      createdAt: new Date().toISOString()
    };
    setMeetings(prev => [newMeeting, ...prev]);
  };

  return (
    <MeetingContext.Provider value={{ meetings, scheduleMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
};
