import React, { createContext, useState, useEffect } from 'react';

export const MessContext = createContext();

const API_URL = '/api/mess';

export const MessProvider = ({ children }) => {
  const [weeklyMenu, setWeeklyMenu] = useState({});
  const [feedback, setFeedback] = useState([]);

  const fetchData = async () => {
    try {
      const menuRes = await fetch(`${API_URL}/menu`);
      const menuData = await menuRes.json();
      setWeeklyMenu(menuData);

      const feedbackRes = await fetch(`${API_URL}/feedback`);
      const feedbackData = await feedbackRes.json();
      setFeedback(feedbackData);
    } catch (err) {
      console.error("Could not fetch mess data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateMenu = async (newMenu) => {
    try {
      const res = await fetch(`${API_URL}/menu`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMenu)
      });
      const saved = await res.json();
      setWeeklyMenu(saved);
      return saved;
    } catch (err) {
      console.error("Error updating menu:", err);
      return null;
    }
  };

  const submitFeedback = async (payload) => {
    try {
      const res = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const newFeedback = await res.json();
      setFeedback(prev => [newFeedback, ...prev]);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const markFeedbackAsRead = async (id) => {
    try {
      const res = await fetch(`${API_URL}/feedback/${id}/read`, { method: 'PUT' });
      const updated = await res.json();
      setFeedback(prev => prev.map(f => f.id === id ? updated : f));
    } catch (err) {
      console.error("Error updating feedback:", err);
    }
  };

  return (
    <MessContext.Provider value={{
      weeklyMenu,
      feedback,
      updateMenu,
      submitFeedback,
      markFeedbackAsRead
    }}>
      {children}
    </MessContext.Provider>
  );
};
