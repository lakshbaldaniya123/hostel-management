import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { VendingContext } from '../context/VendingContext';

export default function WardenVendingMachinePage() {
  const { vendingItems, handleRestock } = useContext(VendingContext);
  const [selectedMachine, setSelectedMachine] = useState('Block A Lobby');
  
  const locations = [...new Set(vendingItems.map(item => item.location))];
  const displayLocations = locations.length > 0 ? locations : ['Block A Lobby', 'Block B Ground', 'Central Library'];
  
  const items = vendingItems.filter(item => item.location === selectedMachine);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="Warden" />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Vending Machine Management</h1>
        
        {/* Location selector tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {displayLocations.map(loc => (
            <button
              key={loc}
              onClick={() => setSelectedMachine(loc)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                selectedMachine === loc 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              📍 {loc === 'Block A Lobby' ? 'A Block' : loc === 'Block B Ground' ? 'B Block' : loc === 'Central Library' ? 'C Block' : loc}
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
                <tr key={item._id} className="hover:bg-gray-50">
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
                      onClick={() => handleRestock(item._id)}
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
