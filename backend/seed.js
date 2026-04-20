const mongoose = require('mongoose');
const User    = require('./models/User');
const Student = require('./models/Student');
const Room    = require('./models/Room');
const Fees    = require('./models/Fees');

// ── USERS: Admin + Wardens + Staff (unchanged) ────────────────────────────
const seedUsers = [
  { hostelId: 'ADM1', password: 'admin@123', role: 'Admin',  department: null, name: 'Dr. Anil Deshmukh', block: null },
  { hostelId: 'W1',   password: 'wardenA@123', role: 'Warden', department: null, name: 'Mr. Rajesh Sharma', block: 'A' },
  { hostelId: 'W2',   password: 'wardenB@123', role: 'Warden', department: null, name: 'Mrs. Kavita Iyer',  block: 'B' },
  { hostelId: 'W3',   password: 'wardenC@123', role: 'Warden', department: null, name: 'Mr. Imran Khan',    block: 'C' },
  { hostelId: 'HK1',  password: '123', role: 'Staff', department: 'Housekeeper', name: 'HK Staff 1' },
  { hostelId: 'HK2',  password: '123', role: 'Staff', department: 'Housekeeper', name: 'HK Staff 2' },
  { hostelId: 'HK3',  password: '123', role: 'Staff', department: 'Housekeeper', name: 'HK Staff 3' },
  { hostelId: 'HK4',  password: '123', role: 'Staff', department: 'Housekeeper', name: 'HK Staff 4' },
  { hostelId: 'HK5',  password: '123', role: 'Staff', department: 'Housekeeper', name: 'HK Staff 5' },
  { hostelId: 'HK6',  password: '123', role: 'Staff', department: 'Housekeeper', name: 'HK Staff 6' },
  { hostelId: 'HK7',  password: '123', role: 'Staff', department: 'Housekeeper', name: 'HK Staff 7' },
  { hostelId: 'HK8',  password: '123', role: 'Staff', department: 'Housekeeper', name: 'HK Staff 8' },
  { hostelId: 'HK9',  password: '123', role: 'Staff', department: 'Housekeeper', name: 'HK Staff 9' },
  { hostelId: 'HK10', password: '123', role: 'Staff', department: 'Housekeeper', name: 'HK Staff 10' },
  { hostelId: 'SC1',  password: '123', role: 'Staff', department: 'Security', name: 'Security 1' },
  { hostelId: 'SC2',  password: '123', role: 'Staff', department: 'Security', name: 'Security 2' },
  { hostelId: 'SC3',  password: '123', role: 'Staff', department: 'Security', name: 'Security 3' },
  { hostelId: 'SC4',  password: '123', role: 'Staff', department: 'Security', name: 'Security 4' },
  { hostelId: 'SC5',  password: '123', role: 'Staff', department: 'Security', name: 'Security 5' },
];

// ── STUDENTS (80 provided; STU051–STU070 missing from your data) ──────────
const seedStudents = [
  // ── BLOCK A (Boys) ──────────────────────────────────────────────────────
  { studentId:'STU001', name:'Aarav Sharma',    email:'aarav1@gmail.com',    phone:'9876500001', course:'B.Tech CS', roomNo:'A-101', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700001', feesStatus:'Paid'    },
  { studentId:'STU002', name:'Vivaan Patel',    email:'vivaan2@gmail.com',   phone:'9876500002', course:'B.Tech IT', roomNo:'A-101', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700002', feesStatus:'Pending' },
  { studentId:'STU003', name:'Aditya Singh',    email:'aditya3@gmail.com',   phone:'9876500003', course:'B.Tech CS', roomNo:'A-102', status:'In Hostel', parentName:'Mr. Singh',  parentPhone:'9988700003', feesStatus:'Paid'    },
  { studentId:'STU004', name:'Krishna Verma',   email:'krishna4@gmail.com',  phone:'9876500004', course:'B.Tech ME', roomNo:'A-102', status:'In Hostel', parentName:'Mr. Verma',  parentPhone:'9988700004', feesStatus:'Paid'    },
  { studentId:'STU005', name:'Arjun Mehta',     email:'arjun5@gmail.com',    phone:'9876500005', course:'B.Tech CE', roomNo:'A-103', status:'In Hostel', parentName:'Mr. Mehta',  parentPhone:'9988700005', feesStatus:'Pending' },
  { studentId:'STU006', name:'Rohan Das',       email:'rohan6@gmail.com',    phone:'9876500006', course:'B.Tech EE', roomNo:'A-103', status:'In Hostel', parentName:'Mr. Das',    parentPhone:'9988700006', feesStatus:'Paid'    },
  { studentId:'STU007', name:'Kunal Shah',      email:'kunal7@gmail.com',    phone:'9876500007', course:'B.Tech CS', roomNo:'A-104', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700007', feesStatus:'Paid'    },
  { studentId:'STU008', name:'Rahul Nair',      email:'rahul8@gmail.com',    phone:'9876500008', course:'B.Tech IT', roomNo:'A-104', status:'In Hostel', parentName:'Mr. Nair',   parentPhone:'9988700008', feesStatus:'Pending' },
  { studentId:'STU009', name:'Manish Yadav',    email:'manish9@gmail.com',   phone:'9876500009', course:'B.Tech ME', roomNo:'A-105', status:'In Hostel', parentName:'Mr. Yadav',  parentPhone:'9988700009', feesStatus:'Paid'    },
  { studentId:'STU010', name:'Sahil Khan',      email:'sahil10@gmail.com',   phone:'9876500010', course:'B.Tech CE', roomNo:'A-105', status:'In Hostel', parentName:'Mr. Khan',   parentPhone:'9988700010', feesStatus:'Paid'    },
  { studentId:'STU011', name:'Deepak Gupta',    email:'deepak11@gmail.com',  phone:'9876500011', course:'B.Tech CS', roomNo:'A-201', status:'In Hostel', parentName:'Mr. Gupta',  parentPhone:'9988700011', feesStatus:'Paid'    },
  { studentId:'STU012', name:'Nikhil Jain',     email:'nikhil12@gmail.com',  phone:'9876500012', course:'B.Tech IT', roomNo:'A-201', status:'In Hostel', parentName:'Mr. Jain',   parentPhone:'9988700012', feesStatus:'Pending' },
  { studentId:'STU013', name:'Harsh Patel',     email:'harsh13@gmail.com',   phone:'9876500013', course:'B.Tech CS', roomNo:'A-202', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700013', feesStatus:'Paid'    },
  { studentId:'STU014', name:'Yash Mehta',      email:'yash14@gmail.com',    phone:'9876500014', course:'B.Tech CE', roomNo:'A-202', status:'In Hostel', parentName:'Mr. Mehta',  parentPhone:'9988700014', feesStatus:'Paid'    },
  { studentId:'STU015', name:'Rajat Sharma',    email:'rajat15@gmail.com',   phone:'9876500015', course:'B.Tech IT', roomNo:'A-203', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700015', feesStatus:'Pending' },
  { studentId:'STU016', name:'Amit Singh',      email:'amit16@gmail.com',    phone:'9876500016', course:'B.Tech EE', roomNo:'A-203', status:'In Hostel', parentName:'Mr. Singh',  parentPhone:'9988700016', feesStatus:'Paid'    },
  { studentId:'STU017', name:'Sumit Verma',     email:'sumit17@gmail.com',   phone:'9876500017', course:'B.Tech ME', roomNo:'A-204', status:'In Hostel', parentName:'Mr. Verma',  parentPhone:'9988700017', feesStatus:'Paid'    },
  { studentId:'STU018', name:'Rohit Nair',      email:'rohit18@gmail.com',   phone:'9876500018', course:'B.Tech CS', roomNo:'A-205', status:'In Hostel', parentName:'Mr. Nair',   parentPhone:'9988700018', feesStatus:'Paid'    },
  { studentId:'STU019', name:'Varun Shah',      email:'varun19@gmail.com',   phone:'9876500019', course:'B.Tech IT', roomNo:'A-205', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700019', feesStatus:'Pending' },
  { studentId:'STU020', name:'Kishan Yadav',    email:'kishan20@gmail.com',  phone:'9876500020', course:'B.Tech CE', roomNo:'A-206', status:'In Hostel', parentName:'Mr. Yadav',  parentPhone:'9988700020', feesStatus:'Paid'    },
  { studentId:'STU021', name:'Dev Patel',       email:'dev21@gmail.com',     phone:'9876500021', course:'B.Tech CS', roomNo:'A-301', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700021', feesStatus:'Paid'    },
  { studentId:'STU022', name:'Jay Shah',        email:'jay22@gmail.com',     phone:'9876500022', course:'B.Tech IT', roomNo:'A-301', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700022', feesStatus:'Pending' },
  { studentId:'STU023', name:'Omkar Joshi',     email:'omkar23@gmail.com',   phone:'9876500023', course:'B.Tech ME', roomNo:'A-302', status:'In Hostel', parentName:'Mr. Joshi',  parentPhone:'9988700023', feesStatus:'Paid'    },
  { studentId:'STU024', name:'Tushar Gupta',    email:'tushar24@gmail.com',  phone:'9876500024', course:'B.Tech CE', roomNo:'A-302', status:'In Hostel', parentName:'Mr. Gupta',  parentPhone:'9988700024', feesStatus:'Paid'    },
  { studentId:'STU025', name:'Akash Yadav',     email:'akash25@gmail.com',   phone:'9876500025', course:'B.Tech EE', roomNo:'A-303', status:'In Hostel', parentName:'Mr. Yadav',  parentPhone:'9988700025', feesStatus:'Pending' },
  { studentId:'STU026', name:'Chirag Mehta',    email:'chirag26@gmail.com',  phone:'9876500026', course:'B.Tech CS', roomNo:'A-401', status:'In Hostel', parentName:'Mr. Mehta',  parentPhone:'9988700026', feesStatus:'Paid'    },
  { studentId:'STU027', name:'Pratik Nair',     email:'pratik27@gmail.com',  phone:'9876500027', course:'B.Tech IT', roomNo:'A-401', status:'In Hostel', parentName:'Mr. Nair',   parentPhone:'9988700027', feesStatus:'Paid'    },
  { studentId:'STU028', name:'Hardik Shah',     email:'hardik28@gmail.com',  phone:'9876500028', course:'B.Tech CE', roomNo:'A-402', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700028', feesStatus:'Pending' },
  { studentId:'STU029', name:'Nitin Sharma',    email:'nitin29@gmail.com',   phone:'9876500029', course:'B.Tech CS', roomNo:'A-402', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700029', feesStatus:'Paid'    },
  { studentId:'STU030', name:'Vikas Singh',     email:'vikas30@gmail.com',   phone:'9876500030', course:'B.Tech IT', roomNo:'A-403', status:'In Hostel', parentName:'Mr. Singh',  parentPhone:'9988700030', feesStatus:'Paid'    },

  // ── BLOCK B (Boys) ──────────────────────────────────────────────────────
  { studentId:'STU031', name:'Mohit Sharma',    email:'mohit31@gmail.com',   phone:'9876500031', course:'B.Tech CS', roomNo:'B-101', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700031', feesStatus:'Paid'    },
  { studentId:'STU032', name:'Tarun Patel',     email:'tarun32@gmail.com',   phone:'9876500032', course:'B.Tech IT', roomNo:'B-101', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700032', feesStatus:'Pending' },
  { studentId:'STU033', name:'Aakash Singh',    email:'aakash33@gmail.com',  phone:'9876500033', course:'B.Tech CS', roomNo:'B-102', status:'In Hostel', parentName:'Mr. Singh',  parentPhone:'9988700033', feesStatus:'Paid'    },
  { studentId:'STU034', name:'Gaurav Verma',    email:'gaurav34@gmail.com',  phone:'9876500034', course:'B.Tech ME', roomNo:'B-102', status:'In Hostel', parentName:'Mr. Verma',  parentPhone:'9988700034', feesStatus:'Paid'    },
  { studentId:'STU035', name:'Neeraj Mehta',    email:'neeraj35@gmail.com',  phone:'9876500035', course:'B.Tech CE', roomNo:'B-103', status:'In Hostel', parentName:'Mr. Mehta',  parentPhone:'9988700035', feesStatus:'Pending' },
  { studentId:'STU036', name:'Ravi Das',        email:'ravi36@gmail.com',    phone:'9876500036', course:'B.Tech EE', roomNo:'B-103', status:'In Hostel', parentName:'Mr. Das',    parentPhone:'9988700036', feesStatus:'Paid'    },
  { studentId:'STU037', name:'Kartik Shah',     email:'kartik37@gmail.com',  phone:'9876500037', course:'B.Tech CS', roomNo:'B-201', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700037', feesStatus:'Paid'    },
  { studentId:'STU038', name:'Ankit Nair',      email:'ankit38@gmail.com',   phone:'9876500038', course:'B.Tech IT', roomNo:'B-201', status:'In Hostel', parentName:'Mr. Nair',   parentPhone:'9988700038', feesStatus:'Pending' },
  { studentId:'STU039', name:'Suresh Yadav',    email:'suresh39@gmail.com',  phone:'9876500039', course:'B.Tech ME', roomNo:'B-202', status:'In Hostel', parentName:'Mr. Yadav',  parentPhone:'9988700039', feesStatus:'Paid'    },
  { studentId:'STU040', name:'Faizan Khan',     email:'faizan40@gmail.com',  phone:'9876500040', course:'B.Tech CE', roomNo:'B-202', status:'In Hostel', parentName:'Mr. Khan',   parentPhone:'9988700040', feesStatus:'Paid'    },
  { studentId:'STU041', name:'Sameer Khan',     email:'sameer41@gmail.com',  phone:'9876500041', course:'B.Tech CE', roomNo:'B-203', status:'In Hostel', parentName:'Mr. Khan',   parentPhone:'9988700041', feesStatus:'Paid'    },
  { studentId:'STU042', name:'Zaid Sheikh',     email:'zaid42@gmail.com',    phone:'9876500042', course:'B.Tech CS', roomNo:'B-203', status:'In Hostel', parentName:'Mr. Sheikh', parentPhone:'9988700042', feesStatus:'Paid'    },
  { studentId:'STU043', name:'Imran Ansari',    email:'imran43@gmail.com',   phone:'9876500043', course:'B.Tech IT', roomNo:'B-204', status:'In Hostel', parentName:'Mr. Ansari', parentPhone:'9988700043', feesStatus:'Pending' },
  { studentId:'STU044', name:'Asif Qureshi',    email:'asif44@gmail.com',    phone:'9876500044', course:'B.Tech ME', roomNo:'B-204', status:'In Hostel', parentName:'Mr. Qureshi',parentPhone:'9988700044', feesStatus:'Paid'    },
  { studentId:'STU045', name:'Wasim Khan',      email:'wasim45@gmail.com',   phone:'9876500045', course:'B.Tech EE', roomNo:'B-301', status:'In Hostel', parentName:'Mr. Khan',   parentPhone:'9988700045', feesStatus:'Paid'    },
  { studentId:'STU046', name:'Rizwan Shaikh',   email:'rizwan46@gmail.com',  phone:'9876500046', course:'B.Tech CS', roomNo:'B-301', status:'In Hostel', parentName:'Mr. Shaikh', parentPhone:'9988700046', feesStatus:'Pending' },
  { studentId:'STU047', name:'Nadeem Khan',     email:'nadeem47@gmail.com',  phone:'9876500047', course:'B.Tech IT', roomNo:'B-302', status:'In Hostel', parentName:'Mr. Khan',   parentPhone:'9988700047', feesStatus:'Paid'    },
  { studentId:'STU048', name:'Faheem Ansari',   email:'faheem48@gmail.com',  phone:'9876500048', course:'B.Tech CE', roomNo:'B-302', status:'In Hostel', parentName:'Mr. Ansari', parentPhone:'9988700048', feesStatus:'Paid'    },
  { studentId:'STU049', name:'Harshit Jain',    email:'harshit49@gmail.com', phone:'9876500049', course:'B.Tech CS', roomNo:'B-401', status:'In Hostel', parentName:'Mr. Jain',   parentPhone:'9988700049', feesStatus:'Paid'    },
  { studentId:'STU050', name:'Mayank Gupta',    email:'mayank50@gmail.com',  phone:'9876500050', course:'B.Tech IT', roomNo:'B-401', status:'In Hostel', parentName:'Mr. Gupta',  parentPhone:'9988700050', feesStatus:'Pending' },

  // ── BLOCK B continued (STU051–STU070) ───────────────────────────────────
  { studentId:'STU051', name:'Ritesh Sharma',   email:'ritesh51@gmail.com',  phone:'9876500051', course:'B.Tech CS', roomNo:'B-103', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700051', feesStatus:'Paid'    },
  { studentId:'STU052', name:'Dhruv Patel',     email:'dhruv52@gmail.com',   phone:'9876500052', course:'B.Tech IT', roomNo:'B-103', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700052', feesStatus:'Pending' },
  { studentId:'STU053', name:'Karan Singh',     email:'karan53@gmail.com',   phone:'9876500053', course:'B.Tech ME', roomNo:'B-104', status:'In Hostel', parentName:'Mr. Singh',  parentPhone:'9988700053', feesStatus:'Paid'    },
  { studentId:'STU054', name:'Abhishek Verma',  email:'abhishek54@gmail.com',phone:'9876500054', course:'B.Tech CE', roomNo:'B-104', status:'In Hostel', parentName:'Mr. Verma',  parentPhone:'9988700054', feesStatus:'Paid'    },
  { studentId:'STU055', name:'Siddharth Mehta', email:'sid55@gmail.com',     phone:'9876500055', course:'B.Tech CS', roomNo:'B-105', status:'In Hostel', parentName:'Mr. Mehta',  parentPhone:'9988700055', feesStatus:'Pending' },
  { studentId:'STU056', name:'Rohan Shah',      email:'rohan56@gmail.com',   phone:'9876500056', course:'B.Tech IT', roomNo:'B-105', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700056', feesStatus:'Paid'    },
  { studentId:'STU057', name:'Yash Jain',       email:'yash57@gmail.com',    phone:'9876500057', course:'B.Tech EE', roomNo:'B-106', status:'In Hostel', parentName:'Mr. Jain',   parentPhone:'9988700057', feesStatus:'Paid'    },
  { studentId:'STU058', name:'Parth Patel',     email:'parth58@gmail.com',   phone:'9876500058', course:'B.Tech CS', roomNo:'B-202', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700058', feesStatus:'Pending' },
  { studentId:'STU059', name:'Jayesh Shah',     email:'jayesh59@gmail.com',  phone:'9876500059', course:'B.Tech IT', roomNo:'B-202', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700059', feesStatus:'Paid'    },
  { studentId:'STU060', name:'Nilesh Yadav',    email:'nilesh60@gmail.com',  phone:'9876500060', course:'B.Tech ME', roomNo:'B-203', status:'In Hostel', parentName:'Mr. Yadav',  parentPhone:'9988700060', feesStatus:'Paid'    },
  { studentId:'STU061', name:'Amit Kumar',      email:'amit61@gmail.com',    phone:'9876500061', course:'B.Tech CE', roomNo:'B-204', status:'In Hostel', parentName:'Mr. Kumar',  parentPhone:'9988700061', feesStatus:'Paid'    },
  { studentId:'STU062', name:'Vivek Singh',     email:'vivek62@gmail.com',   phone:'9876500062', course:'B.Tech CS', roomNo:'B-204', status:'In Hostel', parentName:'Mr. Singh',  parentPhone:'9988700062', feesStatus:'Pending' },
  { studentId:'STU063', name:'Anurag Sharma',   email:'anurag63@gmail.com',  phone:'9876500063', course:'B.Tech IT', roomNo:'B-205', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700063', feesStatus:'Paid'    },
  { studentId:'STU064', name:'Deepak Patel',    email:'deepak64@gmail.com',  phone:'9876500064', course:'B.Tech CE', roomNo:'B-205', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700064', feesStatus:'Paid'    },
  { studentId:'STU065', name:'Saurabh Verma',   email:'saurabh65@gmail.com', phone:'9876500065', course:'B.Tech ME', roomNo:'B-206', status:'In Hostel', parentName:'Mr. Verma',  parentPhone:'9988700065', feesStatus:'Pending' },
  { studentId:'STU066', name:'Kunal Gupta',     email:'kunal66@gmail.com',   phone:'9876500066', course:'B.Tech CS', roomNo:'B-302', status:'In Hostel', parentName:'Mr. Gupta',  parentPhone:'9988700066', feesStatus:'Paid'    },
  { studentId:'STU067', name:'Manav Jain',      email:'manav67@gmail.com',   phone:'9876500067', course:'B.Tech IT', roomNo:'B-302', status:'In Hostel', parentName:'Mr. Jain',   parentPhone:'9988700067', feesStatus:'Paid'    },
  { studentId:'STU068', name:'Ravi Mehta',      email:'ravi68@gmail.com',    phone:'9876500068', course:'B.Tech CE', roomNo:'B-303', status:'In Hostel', parentName:'Mr. Mehta',  parentPhone:'9988700068', feesStatus:'Pending' },
  { studentId:'STU069', name:'Arpit Shah',      email:'arpit69@gmail.com',   phone:'9876500069', course:'B.Tech CS', roomNo:'B-303', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700069', feesStatus:'Paid'    },
  { studentId:'STU070', name:'Lokesh Yadav',    email:'lokesh70@gmail.com',  phone:'9876500070', course:'B.Tech IT', roomNo:'B-304', status:'In Hostel', parentName:'Mr. Yadav',  parentPhone:'9988700070', feesStatus:'Paid'    },

  // ── BLOCK C (Girls) ─────────────────────────────────────────────────────

  { studentId:'STU071', name:'Ananya Iyer',     email:'ananya71@gmail.com',  phone:'9876500071', course:'B.Tech CS', roomNo:'C-101', status:'In Hostel', parentName:'Mr. Iyer',   parentPhone:'9988700071', feesStatus:'Paid'    },
  { studentId:'STU072', name:'Sneha Reddy',     email:'sneha72@gmail.com',   phone:'9876500072', course:'B.Tech IT', roomNo:'C-101', status:'In Hostel', parentName:'Mr. Reddy',  parentPhone:'9988700072', feesStatus:'Paid'    },
  { studentId:'STU073', name:'Pooja Sharma',    email:'pooja73@gmail.com',   phone:'9876500073', course:'B.Tech CE', roomNo:'C-102', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700073', feesStatus:'Pending' },
  { studentId:'STU074', name:'Kavya Nair',      email:'kavya74@gmail.com',   phone:'9876500074', course:'B.Tech CS', roomNo:'C-102', status:'In Hostel', parentName:'Mr. Nair',   parentPhone:'9988700074', feesStatus:'Paid'    },
  { studentId:'STU075', name:'Neha Patel',      email:'neha75@gmail.com',    phone:'9876500075', course:'B.Tech IT', roomNo:'C-103', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700075', feesStatus:'Paid'    },
  { studentId:'STU076', name:'Riya Singh',      email:'riya76@gmail.com',    phone:'9876500076', course:'B.Tech ME', roomNo:'C-201', status:'In Hostel', parentName:'Mr. Singh',  parentPhone:'9988700076', feesStatus:'Paid'    },
  { studentId:'STU077', name:'Simran Kaur',     email:'simran77@gmail.com',  phone:'9876500077', course:'B.Tech CE', roomNo:'C-201', status:'In Hostel', parentName:'Mr. Kaur',   parentPhone:'9988700077', feesStatus:'Pending' },
  { studentId:'STU078', name:'Aditi Sharma',    email:'aditi78@gmail.com',   phone:'9876500078', course:'B.Tech CS', roomNo:'C-202', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700078', feesStatus:'Paid'    },
  { studentId:'STU079', name:'Ishita Patel',    email:'ishita79@gmail.com',  phone:'9876500079', course:'B.Tech IT', roomNo:'C-202', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700079', feesStatus:'Paid'    },
  { studentId:'STU080', name:'Rashmi Singh',    email:'rashmi80@gmail.com',  phone:'9876500080', course:'B.Tech CE', roomNo:'C-301', status:'In Hostel', parentName:'Mr. Singh',  parentPhone:'9988700080', feesStatus:'Pending' },
  { studentId:'STU081', name:'Nisha Verma',     email:'nisha81@gmail.com',   phone:'9876500081', course:'B.Tech CS', roomNo:'C-301', status:'In Hostel', parentName:'Mr. Verma',  parentPhone:'9988700081', feesStatus:'Paid'    },
  { studentId:'STU082', name:'Komal Shah',      email:'komal82@gmail.com',   phone:'9876500082', course:'B.Tech IT', roomNo:'C-302', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700082', feesStatus:'Paid'    },
  { studentId:'STU083', name:'Divya Nair',      email:'divya83@gmail.com',   phone:'9876500083', course:'B.Tech ME', roomNo:'C-401', status:'In Hostel', parentName:'Mr. Nair',   parentPhone:'9988700083', feesStatus:'Pending' },
  { studentId:'STU084', name:'Megha Iyer',      email:'megha84@gmail.com',   phone:'9876500084', course:'B.Tech CE', roomNo:'C-401', status:'In Hostel', parentName:'Mr. Iyer',   parentPhone:'9988700084', feesStatus:'Paid'    },
  { studentId:'STU085', name:'Shreya Reddy',    email:'shreya85@gmail.com',  phone:'9876500085', course:'B.Tech CS', roomNo:'C-402', status:'In Hostel', parentName:'Mr. Reddy',  parentPhone:'9988700085', feesStatus:'Paid'    },
  { studentId:'STU086', name:'Pallavi Sharma',  email:'pallavi86@gmail.com', phone:'9876500086', course:'B.Tech IT', roomNo:'C-402', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700086', feesStatus:'Pending' },
  { studentId:'STU087', name:'Tanvi Patel',     email:'tanvi87@gmail.com',   phone:'9876500087', course:'B.Tech CE', roomNo:'C-403', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700087', feesStatus:'Paid'    },
  { studentId:'STU088', name:'Nehal Shah',      email:'nehal88@gmail.com',   phone:'9876500088', course:'B.Tech CS', roomNo:'C-403', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700088', feesStatus:'Paid'    },
  { studentId:'STU089', name:'Ruchi Singh',     email:'ruchi89@gmail.com',   phone:'9876500089', course:'B.Tech IT', roomNo:'C-404', status:'In Hostel', parentName:'Mr. Singh',  parentPhone:'9988700089', feesStatus:'Paid'    },
  { studentId:'STU090', name:'Kritika Verma',   email:'kritika90@gmail.com', phone:'9876500090', course:'B.Tech ME', roomNo:'C-404', status:'In Hostel', parentName:'Mr. Verma',  parentPhone:'9988700090', feesStatus:'Pending' },
  { studentId:'STU091', name:'Sonal Gupta',     email:'sonal91@gmail.com',   phone:'9876500091', course:'B.Tech CE', roomNo:'C-405', status:'In Hostel', parentName:'Mr. Gupta',  parentPhone:'9988700091', feesStatus:'Paid'    },
  { studentId:'STU092', name:'Riya Sharma',     email:'riya92@gmail.com',    phone:'9876500092', course:'B.Tech CS', roomNo:'C-405', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700092', feesStatus:'Paid'    },
  // ⚠️  STU093–STU100: your data puts all 8 in C-406 (likely a typo)
  // Kept as-is; capacity set to 8 — please send corrected rooms to fix.
  { studentId:'STU093', name:'Muskan Patel',    email:'muskan93@gmail.com',  phone:'9876500093', course:'B.Tech IT', roomNo:'C-406', status:'In Hostel', parentName:'Mr. Patel',  parentPhone:'9988700093', feesStatus:'Paid'    },
  { studentId:'STU094', name:'Ankita Singh',    email:'ankita94@gmail.com',  phone:'9876500094', course:'B.Tech CE', roomNo:'C-406', status:'In Hostel', parentName:'Mr. Singh',  parentPhone:'9988700094', feesStatus:'Pending' },
  { studentId:'STU095', name:'Preeti Verma',    email:'preeti95@gmail.com',  phone:'9876500095', course:'B.Tech CS', roomNo:'C-406', status:'In Hostel', parentName:'Mr. Verma',  parentPhone:'9988700095', feesStatus:'Paid'    },
  { studentId:'STU096', name:'Swati Shah',      email:'swati96@gmail.com',   phone:'9876500096', course:'B.Tech IT', roomNo:'C-406', status:'In Hostel', parentName:'Mr. Shah',   parentPhone:'9988700096', feesStatus:'Paid'    },
  { studentId:'STU097', name:'Heena Nair',      email:'heena97@gmail.com',   phone:'9876500097', course:'B.Tech ME', roomNo:'C-406', status:'In Hostel', parentName:'Mr. Nair',   parentPhone:'9988700097', feesStatus:'Pending' },
  { studentId:'STU098', name:'Jyoti Iyer',      email:'jyoti98@gmail.com',   phone:'9876500098', course:'B.Tech CE', roomNo:'C-406', status:'In Hostel', parentName:'Mr. Iyer',   parentPhone:'9988700098', feesStatus:'Paid'    },
  { studentId:'STU099', name:'Bhavna Reddy',    email:'bhavna99@gmail.com',  phone:'9876500099', course:'B.Tech CS', roomNo:'C-406', status:'In Hostel', parentName:'Mr. Reddy',  parentPhone:'9988700099', feesStatus:'Paid'    },
  { studentId:'STU100', name:'Kajal Sharma',    email:'kajal100@gmail.com',  phone:'9876500100', course:'B.Tech IT', roomNo:'C-406', status:'In Hostel', parentName:'Mr. Sharma', parentPhone:'9988700100', feesStatus:'Pending' },
];

// ── Auto-derive ROOMS from student data ───────────────────────────────────
function buildRooms(students) {
  const roomMap = {};
  for (const s of students) {
    if (!roomMap[s.roomNo]) {
      roomMap[s.roomNo] = { studentIds: [], block: s.roomNo.charAt(0) };
    }
    roomMap[s.roomNo].studentIds.push(s.studentId);
  }
  return Object.entries(roomMap).map(([roomNo, data]) => {
    const count    = data.studentIds.length;
    // C-406 has 8 assigned — honour it; everything else treat as double (cap 2)
    const capacity = count > 2 ? count : 2;
    return {
      roomNo,
      block:              data.block,
      type:               capacity === 1 ? 'Single' : capacity === 3 ? 'Triple' : 'Double',
      capacity,
      occupants:          count,
      studentIds:         data.studentIds,
      availabilityStatus: count >= capacity ? 'Full' : 'Available',
    };
  }).sort((a, b) => a.roomNo.localeCompare(b.roomNo));
}

// ── Auto-derive FEES (one record per student) ────────────────────────────
function buildFees(students) {
  return students.map((s, i) => ({
    id:          `FEE-${String(i + 1).padStart(3, '0')}`,
    studentId:   s.studentId,
    studentName: s.name,
    roomNo:      s.roomNo,
    amount:      25000,
    dueDate:     '2026-04-30',
    paidDate:    s.feesStatus === 'Paid' ? '2026-04-01' : null,
    status:      s.feesStatus,
    semester:    'Semester 2 2026',
    description: 'Hostel Fee + Mess Charges',
  }));
}

// ── Auto-derive student User accounts ────────────────────────────────────
function buildStudentUsers(students) {
  return students.map(s => ({
    hostelId:   s.studentId,
    password:   'student@123',   // default; should be changed on first login
    role:       'Student',
    department: null,
    name:       s.name,
    block:      null,
  }));
}

// ── RUN SEED ─────────────────────────────────────────────────────────────
mongoose.connect('mongodb://127.0.0.1:27017/hostel_system')
  .then(async () => {
    console.log('✅ Connected to MongoDB. Clearing old data...');

    await User.deleteMany({});
    await Student.deleteMany({});
    await Room.deleteMany({});
    await Fees.deleteMany({});
    console.log('  ✔ Old data cleared');

    const studentUsers = buildStudentUsers(seedStudents);
    const allUsers     = [...seedUsers, ...studentUsers];
    await User.insertMany(allUsers);
    console.log(`  ✔ ${allUsers.length} Users inserted (${seedUsers.length} staff + ${studentUsers.length} students)`);

    await Student.insertMany(seedStudents);
    console.log(`  ✔ ${seedStudents.length} Students inserted`);

    const rooms = buildRooms(seedStudents);
    await Room.insertMany(rooms);
    console.log(`  ✔ ${rooms.length} Rooms derived and inserted`);

    const fees = buildFees(seedStudents);
    await Fees.insertMany(fees);
    console.log(`  ✔ ${fees.length} Fee records inserted`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Summary:');
    console.log(`   Block A: ${seedStudents.filter(s=>s.roomNo.startsWith('A')).length} students`);
    console.log(`   Block B: ${seedStudents.filter(s=>s.roomNo.startsWith('B')).length} students`);
    console.log(`   Block C: ${seedStudents.filter(s=>s.roomNo.startsWith('C')).length} students`);
    console.log(`   ⚠️  Missing: STU051–STU070 (20 students) — please provide their data`);
    console.log(`   ⚠️  C-406 has 8 students assigned — verify if room numbers are correct`);
    console.log('\n📋 Login Credentials:');
    console.log('   Admin   → ID: ADM1       | Password: admin@123');
    console.log('   Warden  → ID: W1         | Password: wardenA@123  (Block A)');
    console.log('   Warden  → ID: W2         | Password: wardenB@123  (Block B)');
    console.log('   Warden  → ID: W3         | Password: wardenC@123  (Block C)');
    console.log('   Student → ID: STU001 etc | Password: student@123');

    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Seeding Error:', err));
