import React, { createContext, useState, useEffect } from 'react';

export const VendingContext = createContext();

const API_URL = '/api/vending';

export const VendingProvider = ({ children }) => {
  const [vendingItems, setVendingItems] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setVendingItems(data))
      .catch(err => console.error("Could not fetch vending items:", err));
  }, []);

  const handleRestock = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: 15, status: 'Good' })
      });
      const updatedItem = await response.json();
      setVendingItems(prev => prev.map(item => item._id === id ? updatedItem : item));
    } catch (err) {
      console.error("Error restocking item:", err);
    }
  };

  return (
    <VendingContext.Provider value={{ vendingItems, handleRestock }}>
      {children}
    </VendingContext.Provider>
  );
};
