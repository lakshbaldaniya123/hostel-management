import React, { createContext, useState, useEffect } from 'react';

export const GymContext = createContext();

const API_URL = '/api/gym';

export const GymProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchData = async () => {
    try {
      const subsRes = await fetch(`${API_URL}/subscriptions`);
      const subsData = await subsRes.json();
      setSubscriptions(subsData);
    } catch (err) {
      console.error("Could not fetch gym data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const enrollSubscription = async (name, room, planType, price) => {
    const payload = { name, room, plan: planType, fee: price, paymentStatus: 'Pending' };
    try {
      const res = await fetch(`${API_URL}/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const newSub = await res.json();
      // Replace old sub with new checking both name and room
      setSubscriptions(prev => [newSub, ...prev.filter(s => s.name !== name || s.room !== room)]);
      return newSub;
    } catch (err) {
      console.error("Error creating subscription:", err);
      return null;
    }
  };

  const markFeePaid = async (id) => {
    try {
      const res = await fetch(`${API_URL}/subscriptions/${id}/pay`, { method: 'PUT' });
      const updated = await res.json();
      setSubscriptions(prev => prev.map(s => s.id === id ? updated : s));
    } catch (err) {
      console.error("Error updating fee:", err);
    }
  };

  return (
    <GymContext.Provider value={{
      subscriptions,
      enrollSubscription,
      markFeePaid
    }}>
      {children}
    </GymContext.Provider>
  );
};
