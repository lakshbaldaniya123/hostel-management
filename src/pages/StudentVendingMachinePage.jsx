import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { VendingContext } from '../context/VendingContext';

export default function StudentVendingMachinePage() {
  const { vendingItems } = useContext(VendingContext);
  const [selectedMachine, setSelectedMachine] = useState('Block A Lobby');
  
  // Get unique locations dynamically from data, fallback to defaults if empty initially
  const locations = [...new Set(vendingItems.map(item => item.location))];
  const displayLocations = locations.length > 0 ? locations : ['Block A Lobby', 'Block B Ground', 'Central Library'];
  
  const items = vendingItems.filter(item => item.location === selectedMachine);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="Student" />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Smart Vending Machine</h1>
          <p className="text-gray-500 text-sm mt-1">Check live stock before you walk down to the lobby!</p>
        </div>

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

        <div className="bg-gray-800 p-8 rounded-3xl min-h-[600px] border-4 border-gray-900 shadow-2xl max-w-4xl mx-auto flex">
          {/* Glass display */}
          <div className="flex-1 bg-cyan-900/20 border-r-4 border-gray-900 p-6 rounded-l-2xl grid grid-cols-3 gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-400/5 backdrop-blur-[2px] pointer-events-none"></div>
            
            {items.map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-end z-10">
                <div className="text-6xl mb-4 drop-shadow-lg" style={{ opacity: item.stock === 0 ? 0.3 : 1 }}>
                  {item.img}
                </div>
                {/* Spiral holder */}
                <div className="w-full h-4 border-b-4 border-gray-400 rounded-full mb-2"></div>
                
                <div className="bg-black/50 text-white text-xs px-3 py-1 rounded border border-gray-600 w-full text-center">
                  <div className="font-bold">{item.name} · {item.price}</div>
                  <div className={`mt-1 font-mono ${item.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {item.stock > 0 ? `${item.stock} left` : 'OUT OF STOCK'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Control Panel */}
          <div className="w-64 bg-gray-200 rounded-r-2xl p-6 flex flex-col items-center shadow-inner">
            <div className="bg-black text-green-400 font-mono text-xl w-full p-4 rounded text-center shadow-inner border-2 border-gray-400 mb-8">
              INSERT COIN
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-8">
              {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(key => (
                <button key={key} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-3 rounded shadow active:translate-y-1">
                  {key}
                </button>
              ))}
            </div>

            <div className="w-20 h-4 rounded-full bg-black mt-auto shadow-inner"></div>
            <p className="text-xs text-gray-500 font-bold mt-2">CARD READER</p>
          </div>
        </div>
      </main>
    </div>
  );
}
