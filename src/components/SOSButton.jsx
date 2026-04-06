import React, { useState } from 'react';

export default function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    { name: 'Ambulance', number: '108', icon: '🚑', desc: 'Medical emergencies' },
    { name: 'Police', number: '100', icon: '🚓', desc: 'Security & crime' },
    { name: 'Fire Department', number: '101', icon: '🚒', desc: 'Fire hazards' },
    { name: 'Cyber Crime Helpline', number: '1930', icon: '💻', desc: 'Online fraud & harassment' },
    { name: 'Campus Security', number: '9999900000', icon: '🛡️', desc: 'PDEU on-site guards' },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-4 border-red-200 animate-pulse"
        style={{ animationDuration: '3s' }}
      >
        <span className="font-extrabold text-xl tracking-wider">SOS</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
            
            <div className="bg-red-600 p-6 text-white text-center">
              <h2 className="text-3xl font-black tracking-wider mb-2">EMERGENCY</h2>
              <p className="text-red-100 text-sm font-medium">Tap any number to call immediately</p>
            </div>

            <div className="p-6 bg-gray-50 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                {emergencyContacts.map((contact, idx) => (
                  <a 
                    key={idx}
                    href={`tel:${contact.number}`}
                    className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-red-300 hover:bg-red-50 transition-all group"
                  >
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-red-100 rounded-full flex items-center justify-center text-2xl mr-4 transition-colors">
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-red-700">{contact.name}</h3>
                      <p className="text-xs text-gray-500 group-hover:text-red-500">{contact.desc}</p>
                    </div>
                    <div className="text-red-600 font-extrabold tracking-wider bg-red-50 px-3 py-1.5 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
                      {contact.number}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
