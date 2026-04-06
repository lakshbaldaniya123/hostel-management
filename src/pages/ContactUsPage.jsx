import React from 'react';
import Sidebar from '../components/Sidebar';

export default function ContactUsPage({ role = "Student" }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} />
      <main className="flex-1 p-8 lg:p-12">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Help & Contact</h1>
        <p className="text-gray-500 mb-10">High Rise PDEU Hostel official contact directories.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-2xl">🏢</span> Hostel Administration
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-gray-900">Chief Warden (High Rise)</h3>
                  <p className="text-sm text-gray-500">Dr. Alok Nath</p>
                  <p className="text-sm font-semibold text-indigo-600 mt-1">+91 98765 43210</p>
                  <p className="text-sm text-gray-500">alok.nath@pdeu.ac.in</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-gray-900">Assistant Warden</h3>
                  <p className="text-sm text-gray-500">Mr. Ramesh Patel</p>
                  <p className="text-sm font-semibold text-indigo-600 mt-1">+91 87654 32109</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-2xl">🛠️</span> Facility Management
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold">M</div>
                <div>
                  <h3 className="font-bold text-gray-900">Maintenance & Electricals</h3>
                  <p className="text-sm text-gray-500">For urgent breakdowns not resolved via the app</p>
                  <p className="text-sm font-semibold text-orange-600 mt-1">+91 1800 123 4455</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold">C</div>
                <div>
                  <h3 className="font-bold text-gray-900">Cleaning Supervisor</h3>
                  <p className="text-sm text-gray-500">Mr. Suresh</p>
                  <p className="text-sm font-semibold text-orange-600 mt-1">+91 99887 77665</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-xl text-white col-span-1 md:col-span-2">
             <div className="flex flex-col md:flex-row justify-between items-center gap-8">
               <div>
                  <h2 className="text-2xl font-black mb-2 flex items-center gap-3">
                    <span className="text-3xl">📍</span> Campus Address
                  </h2>
                  <p className="text-gray-300 leading-relaxed font-medium">
                    High Rise Hostel Building,<br />
                    Pandit Deendayal Energy University (PDEU)<br />
                    Knowledge Corridor, Raisan<br />
                    Gandhinagar, Gujarat 382426
                  </p>
               </div>
               <div className="text-center md:text-right">
                 <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">General Inquiry</p>
                 <a href="mailto:hostel@pdeu.ac.in" className="text-xl font-bold text-indigo-300 hover:text-indigo-200 transition-colors">hostel@pdeu.ac.in</a>
               </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
