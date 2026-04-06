import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const initialMachinesData = {
  'Block A Lobby': [
    { id: 1, name: 'Lays Classic', price: '₹20', stock: 5, status: 'Low' },
    { id: 2, name: 'Red Bull', price: '₹120', stock: 0, status: 'Empty' },
    { id: 3, name: 'Dairy Milk', price: '₹40', stock: 12, status: 'Good' },
  ],
  'Block B Ground': [
    { id: 4, name: 'Oreo', price: '₹30', stock: 0, status: 'Empty' },
    { id: 5, name: 'Mountain Dew', price: '₹40', stock: 5, status: 'Low' },
  ],
  'Central Library': [
    { id: 6, name: 'Energy Drink', price: '₹110', stock: 0, status: 'Empty' },
    { id: 7, name: 'Dark Choco', price: '₹90', stock: 2, status: 'Low' },
  ]
};

export default function WardenVendingMachinePage() {
  const [machines, setMachines] = useState(initialMachinesData);
  const [selectedMachine, setSelectedMachine] = useState('Block A Lobby');
  
  const items = machines[selectedMachine];

  const handleRestock = (id) => {
    setMachines({
      ...machines,
      [selectedMachine]: machines[selectedMachine].map(i => 
        i.id === id ? { ...i, stock: 15, status: 'Good' } : i
      )
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="Warden" />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Vending Machine Management</h1>
        
        {/* Location selector tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {Object.keys(machines).map(loc => (
            <button
              key={loc}
              onClick={() => setSelectedMachine(loc)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                selectedMachine === loc 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              📍 {loc}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
            <h3 className="text-gray-500 text-sm font-medium">Out of Stock Items</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{items.filter(i => i.stock === 0).length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-sm font-medium text-gray-500 rounded-tl-xl">Item</th>
                <th className="p-4 text-sm font-medium text-gray-500">Price</th>
                <th className="p-4 text-sm font-medium text-gray-500">Stock Level</th>
                <th className="p-4 text-sm font-medium text-gray-500 rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{item.name}</td>
                  <td className="p-4 text-gray-600">{item.price}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      item.stock === 0 ? 'bg-red-100 text-red-700' :
                      item.stock < 10 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.stock} left
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleRestock(item.id)}
                      className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 font-medium text-sm transition-colors"
                    >
                      Restock (+15)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
