import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { HostelContext } from '../context/HostelContext';

export default function WardenStudentsPage() {
  const { students, updateStudentDetails } = useContext(HostelContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.roomNo.includes(searchTerm)
  );

  const openProfile = (student) => {
    setSelectedStudent(student);
    setEditForm(student);
    setIsEditMode(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveDetails = () => {
    updateStudentDetails(editForm.studentId, editForm);
    setSelectedStudent(editForm);
    setIsEditMode(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
      <Sidebar role="Warden" />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Students Directory
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Manage and view all students currently registered in the hostel.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex gap-4 items-center">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors" 
              placeholder="Search by student name, ID, or room number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Student Info</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Course</th>
                  <th className="px-6 py-4 font-semibold">Room No.</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.studentId} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 text-base">{student.name}</div>
                      <div className="text-gray-500 text-xs mt-0.5">ID: {student.studentId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-800">{student.phone}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.course}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-md">{student.roomNo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        student.status === 'In Hostel' ? 'bg-green-100 text-green-700' :
                        student.status === 'Out' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right pr-6">
                      <button 
                        onClick={() => openProfile(student)}
                        className="text-indigo-600 hover:text-indigo-800 text-xs font-medium border border-indigo-200 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                      No students found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Profile Modal Overlay */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 flex items-start justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30 shadow-sm">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{selectedStudent.name}</h2>
                  <p className="text-indigo-100 text-sm font-medium mt-1">{selectedStudent.studentId} • {selectedStudent.course}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Detail Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Student Details - EDITABLE */}
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-indigo-500">🎓</span> Student Details
                  </h3>
                  
                  {isEditMode ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Phone</label>
                        <input type="text" name="phone" value={editForm.phone} onChange={handleEditChange} className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Email</label>
                        <input type="text" name="email" value={editForm.email} onChange={handleEditChange} className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-500 block mb-1">Room No</label>
                          <input type="text" name="roomNo" value={editForm.roomNo} onChange={handleEditChange} className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 block mb-1">Status</label>
                          <select name="status" value={editForm.status} onChange={handleEditChange} className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                            <option value="In Hostel">In Hostel</option>
                            <option value="Out">Out</option>
                            <option value="On Leave">On Leave</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm flex justify-between border-b border-gray-200 pb-1">
                        <span className="text-xs text-gray-500 font-medium">Room</span>
                        <span className="font-bold text-gray-900">{selectedStudent.roomNo}</span>
                      </p>
                      <p className="text-sm flex justify-between border-b border-gray-200 pb-1">
                        <span className="text-xs text-gray-500 font-medium">Status</span>
                        <span className={`font-bold ${selectedStudent.status === 'In Hostel' ? 'text-green-600' : 'text-orange-600'}`}>
                          {selectedStudent.status}
                        </span>
                      </p>
                      <p className="text-sm flex justify-between border-b border-gray-200 pb-1">
                        <span className="text-xs text-gray-500 font-medium">Phone</span>
                        <a href={`tel:${selectedStudent.phone}`} className="text-indigo-600 font-medium hover:underline">{selectedStudent.phone}</a>
                      </p>
                      <p className="text-sm flex justify-between pb-1">
                        <span className="text-xs text-gray-500 font-medium">Email</span>
                        <a href={`mailto:${selectedStudent.email}`} className="text-gray-800 font-medium hover:text-indigo-600 truncate ml-4">{selectedStudent.email}</a>
                      </p>
                    </div>
                  )}
                </div>

                {/* Parental Control & Fees - EDITABLE */}
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-indigo-500">👨‍👩‍👦</span> Parental & Fees
                  </h3>
                  
                  {isEditMode ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Parent Name</label>
                        <input type="text" name="parentName" value={editForm.parentName} onChange={handleEditChange} className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Parent Contact</label>
                        <input type="text" name="parentPhone" value={editForm.parentPhone} onChange={handleEditChange} className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Fees Status</label>
                        <select name="feesStatus" value={editForm.feesStatus} onChange={handleEditChange} className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm flex justify-between border-b border-gray-200 pb-1">
                        <span className="text-xs text-gray-500 font-medium">Guardian</span>
                        <span className="font-bold text-gray-800">{selectedStudent.parentName}</span>
                      </p>
                      <p className="text-sm flex justify-between border-b border-gray-200 pb-1">
                        <span className="text-xs text-gray-500 font-medium">Parent Contact</span>
                        <a href={`tel:${selectedStudent.parentPhone}`} className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                          {selectedStudent.parentPhone}
                        </a>
                      </p>
                      <p className="text-sm flex justify-between pb-1">
                        <span className="text-xs text-gray-500 font-medium">Fees</span>
                        <span className={`font-bold ${selectedStudent.feesStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedStudent.feesStatus}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reporting History (Real-time Entry Exit Data) */}
              <div className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-indigo-500">🕒</span> Entry / Exit Reporting History
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">Live Logs</span>
                </div>
                
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="uppercase bg-white text-gray-400 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-2 font-medium">Type</th>
                      <th className="px-4 py-2 font-medium">Time & Date</th>
                      <th className="px-4 py-2 font-medium">Gate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudent.entryExitLogs && selectedStudent.entryExitLogs.length > 0 ? (
                      selectedStudent.entryExitLogs.map(log => (
                        <tr key={log.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded font-semibold ${log.type === 'Entry' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {log.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {log.time} <span className="text-gray-400 font-normal ml-1">· {log.date}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{log.gate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-4 py-6 text-center text-gray-400 bg-gray-50">No recent entry/exit logs recorded.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => {
                  if (isEditMode) {
                    setIsEditMode(false);
                    setEditForm(selectedStudent); // revert changes
                  } else {
                    setSelectedStudent(null);
                  }
                }}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {isEditMode ? 'Cancel' : 'Close'}
              </button>
              
              {isEditMode ? (
                <button 
                  onClick={saveDetails}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditMode(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Modify Details
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
