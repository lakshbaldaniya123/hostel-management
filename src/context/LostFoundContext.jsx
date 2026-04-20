import React, { createContext, useState, useEffect } from 'react';

export const LostFoundContext = createContext();

const API_URL = '/api/lostfound';

export const LostFoundProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [logs, setLogs] = useState([]);

  const fetchData = async () => {
    try {
      const authOptions = { headers: {} }; 
      
      const itemsRes = await fetch(`${API_URL}/items`, authOptions);
      const fetchedItems = await itemsRes.json();
      setItems(fetchedItems);

      const logsRes = await fetch(`${API_URL}/logs`, authOptions);
      const fetchedLogs = await logsRes.json();
      setLogs(fetchedLogs);
    } catch(err) {
      console.error("Could not fetch missing items:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-GB'),
      status: 'Open'
    };

    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      const saved = await response.json();
      setItems(prev => [saved, ...prev]);
    } catch(err) { console.error("Error creating item:", err); }
  };

  const resolveItem = async (id, claimerName) => {
    const item = items.find(i => i.id === id);
    if(!item) return;

    const logData = {
      item: item.itemName,
      finder: item.type === 'Found' ? item.posterName : claimerName || 'Unknown',
      claimer: item.type === 'Lost' ? item.posterName : claimerName || 'Unknown',
      foundTime: item.date,
      claimedTime: new Date().toLocaleString('en-GB')
    };

    try {
      const response = await fetch(`${API_URL}/items/${id}/resolve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimerName, logData })
      });
      const updatedItem = await response.json();
      
      setItems(prev => prev.map(i => i.id === id ? updatedItem : i));
      
      // We can also refetch logs or update locally:
      setLogs(prev => [logData, ...prev]);
    } catch(err) { console.error("Error resolving item:", err); }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' });
      setItems(prev => prev.filter(item => item.id !== id));
    } catch(err) { console.error("Error deleting item:", err); }
  };

  return (
    <LostFoundContext.Provider value={{
      items,
      logs,
      addItem,
      resolveItem,
      deleteItem
    }}>
      {children}
    </LostFoundContext.Provider>
  );
};
