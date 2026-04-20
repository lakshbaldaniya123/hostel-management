const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Student = require('./models/Student');
const Room = require('./models/Room');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hostel_system';

const rawSql = `
INSERT INTO Users VALUES 
('ADM1', 'admin@123', 'Admin', NULL, 'Dr. Anil Deshmukh');

INSERT INTO Users VALUES 
('W1', 'wardenA@123', 'Warden', NULL, 'Mr. Rajesh Sharma'),
('W2', 'wardenB@123', 'Warden', NULL, 'Mrs. Kavita Iyer'),
('W3', 'wardenC@123', 'Warden', NULL, 'Mr. Imran Khan');

INSERT INTO Users VALUES
('HK1','hk@101','Staff','Housekeeper','Sunita Yadav'),
('HK2','hk@102','Staff','Housekeeper','Meena Kumari'),
('HK3','hk@103','Staff','Housekeeper','Suresh Pawar'),
('HK4','hk@104','Staff','Housekeeper','Lata Shinde'),
('HK5','hk@105','Staff','Housekeeper','Ramesh Gupta'),
('HK6','hk@106','Staff','Housekeeper','Kiran Patil'),
('HK7','hk@107','Staff','Housekeeper','Pooja Verma'),
('HK8','hk@108','Staff','Housekeeper','Anita Chauhan'),
('HK9','hk@109','Staff','Housekeeper','Vijay More'),
('HK10','hk@110','Staff','Housekeeper','Rekha Nair');

INSERT INTO Users VALUES
('SC1','sec@201','Staff','Security','Mahesh Singh'),
('SC2','sec@202','Staff','Security','Ravi Thakur'),
('SC3','sec@203','Staff','Security','Iqbal Sheikh'),
('SC4','sec@204','Staff','Security','Deepak Yadav'),
('SC5','sec@205','Staff','Security','Arvind Kumar');

INSERT INTO Students VALUES
-- ================= BLOCK A (Boys) =================
('STU001','Aarav Sharma','aarav1@gmail.com','9876500001','B.Tech CS','A-101','In Hostel','Mr. Sharma','9988700001','Paid'),
('STU002','Vivaan Patel','vivaan2@gmail.com','9876500002','B.Tech IT','A-101','In Hostel','Mr. Patel','9988700002','Pending'),
('STU003','Aditya Singh','aditya3@gmail.com','9876500003','B.Tech CS','A-102','In Hostel','Mr. Singh','9988700003','Paid'),
('STU004','Krishna Verma','krishna4@gmail.com','9876500004','B.Tech ME','A-102','In Hostel','Mr. Verma','9988700004','Paid'),
('STU005','Arjun Mehta','arjun5@gmail.com','9876500005','B.Tech CE','A-102','In Hostel','Mr. Mehta','9988700005','Pending'),
('STU006','Rohan Das','rohan6@gmail.com','9876500006','B.Tech EE','A-103','In Hostel','Mr. Das','9988700006','Paid'), 
('STU007','Kunal Shah','kunal7@gmail.com','9876500007','B.Tech CS','A-104','In Hostel','Mr. Shah','9988700007','Paid'),
('STU008','Rahul Nair','rahul8@gmail.com','9876500008','B.Tech IT','A-104','In Hostel','Mr. Nair','9988700008','Pending'),
('STU009','Manish Yadav','manish9@gmail.com','9876500009','B.Tech ME','A-105','In Hostel','Mr. Yadav','9988700009','Paid'),
('STU010','Sahil Khan','sahil10@gmail.com','9876500010','B.Tech CE','A-105','In Hostel','Mr. Khan','9988700010','Paid'),
('STU011','Deepak Gupta','deepak11@gmail.com','9876500011','B.Tech CS','A-106','In Hostel','Mr. Gupta','9988700011','Paid'),
('STU012','Nikhil Jain','nikhil12@gmail.com','9876500012','B.Tech IT','A-106','In Hostel','Mr. Jain','9988700012','Pending'),
('STU013','Harsh Patel','harsh13@gmail.com','9876500013','B.Tech CS','A-201','In Hostel','Mr. Patel','9988700013','Paid'),
('STU014','Yash Mehta','yash14@gmail.com','9876500014','B.Tech CE','A-201','In Hostel','Mr. Mehta','9988700014','Paid'),
('STU015','Rajat Sharma','rajat15@gmail.com','9876500015','B.Tech IT','A-202','In Hostel','Mr. Sharma','9988700015','Pending'),
('STU016','Amit Singh','amit16@gmail.com','9876500016','B.Tech EE','A-202','In Hostel','Mr. Singh','9988700016','Paid'),
('STU017','Sumit Verma','sumit17@gmail.com','9876500017','B.Tech ME','A-203','In Hostel','Mr. Verma','9988700017','Paid'),
('STU018','Rohit Nair','rohit18@gmail.com','9876500018','B.Tech CS','A-205','In Hostel','Mr. Nair','9988700018','Paid'),
('STU019','Varun Shah','varun19@gmail.com','9876500019','B.Tech IT','A-205','In Hostel','Mr. Shah','9988700019','Pending'),
('STU020','Kishan Yadav','kishan20@gmail.com','9876500020','B.Tech CE','A-206','In Hostel','Mr. Yadav','9988700020','Paid'),

-- ================= BLOCK B (Boys) =================
('STU021','Mohit Sharma','mohit21@gmail.com','9876500021','B.Tech CS','B-101','In Hostel','Mr. Sharma','9988700021','Paid'),
('STU022','Tarun Patel','tarun22@gmail.com','9876500022','B.Tech IT','B-101','In Hostel','Mr. Patel','9988700022','Pending'),
('STU023','Aakash Singh','aakash23@gmail.com','9876500023','B.Tech CS','B-102','In Hostel','Mr. Singh','9988700023','Paid'),
('STU024','Gaurav Verma','gaurav24@gmail.com','9876500024','B.Tech ME','B-102','In Hostel','Mr. Verma','9988700024','Paid'),
('STU025','Neeraj Mehta','neeraj25@gmail.com','9876500025','B.Tech CE','B-102','In Hostel','Mr. Mehta','9988700025','Pending'),
('STU026','Ravi Das','ravi26@gmail.com','9876500026','B.Tech EE','B-103','In Hostel','Mr. Das','9988700026','Paid'),
('STU027','Kartik Shah','kartik27@gmail.com','9876500027','B.Tech CS','B-104','In Hostel','Mr. Shah','9988700027','Paid'),
('STU028','Ankit Nair','ankit28@gmail.com','9876500028','B.Tech IT','B-104','In Hostel','Mr. Nair','9988700028','Pending'),
('STU029','Suresh Yadav','suresh29@gmail.com','9876500029','B.Tech ME','B-105','In Hostel','Mr. Yadav','9988700029','Paid'),
('STU030','Faizan Khan','faizan30@gmail.com','9876500030','B.Tech CE','B-105','In Hostel','Mr. Khan','9988700030','Paid'),

-- ================= BLOCK C (Girls) =================
('STU071','Ananya Iyer','ananya71@gmail.com','9876500071','B.Tech CS','C-101','In Hostel','Mr. Iyer','9988700071','Paid'),
('STU072','Sneha Reddy','sneha72@gmail.com','9876500072','B.Tech IT','C-101','In Hostel','Mr. Reddy','9988700072','Paid'),
('STU073','Pooja Sharma','pooja73@gmail.com','9876500073','B.Tech CE','C-102','In Hostel','Mr. Sharma','9988700073','Pending'),
('STU074','Kavya Nair','kavya74@gmail.com','9876500074','B.Tech CS','C-102','In Hostel','Mr. Nair','9988700074','Paid'),
('STU075','Neha Patel','neha75@gmail.com','9876500075','B.Tech IT','C-103','In Hostel','Mr. Patel','9988700075','Paid'),
('STU076','Riya Singh','riya76@gmail.com','9876500076','B.Tech ME','C-105','In Hostel','Mr. Singh','9988700076','Paid'),
('STU077','Simran Kaur','simran77@gmail.com','9876500077','B.Tech CE','C-105','In Hostel','Mr. Kaur','9988700077','Pending'),

-- ================= BLOCK A (continue) =================
('STU031','Dev Patel','dev31@gmail.com','9876500031','B.Tech CS','A-301','In Hostel','Mr. Patel','9988700031','Paid'),
('STU032','Jay Shah','jay32@gmail.com','9876500032','B.Tech IT','A-301','In Hostel','Mr. Shah','9988700032','Pending'),
('STU033','Omkar Joshi','omkar33@gmail.com','9876500033','B.Tech ME','A-302','In Hostel','Mr. Joshi','9988700033','Paid'),
('STU034','Tushar Gupta','tushar34@gmail.com','9876500034','B.Tech CE','A-302','In Hostel','Mr. Gupta','9988700034','Paid'),
('STU035','Akash Yadav','akash35@gmail.com','9876500035','B.Tech EE','A-303','In Hostel','Mr. Yadav','9988700035','Pending'),
('STU036','Chirag Mehta','chirag36@gmail.com','9876500036','B.Tech CS','A-305','In Hostel','Mr. Mehta','9988700036','Paid'),
('STU037','Pratik Nair','pratik37@gmail.com','9876500037','B.Tech IT','A-305','In Hostel','Mr. Nair','9988700037','Paid'),
('STU038','Hardik Shah','hardik38@gmail.com','9876500038','B.Tech CE','A-306','In Hostel','Mr. Shah','9988700038','Pending'),
('STU039','Nitin Sharma','nitin39@gmail.com','9876500039','B.Tech CS','A-401','In Hostel','Mr. Sharma','9988700039','Paid'),
('STU040','Vikas Singh','vikas40@gmail.com','9876500040','B.Tech IT','A-401','In Hostel','Mr. Singh','9988700040','Paid'),
('STU041','Pankaj Verma','pankaj41@gmail.com','9876500041','B.Tech ME','A-402','In Hostel','Mr. Verma','9988700041','Pending'),
('STU042','Girish Patel','girish42@gmail.com','9876500042','B.Tech CE','A-402','In Hostel','Mr. Patel','9988700042','Paid'),
('STU043','Sandeep Nair','sandeep43@gmail.com','9876500043','B.Tech EE','A-403','In Hostel','Mr. Nair','9988700043','Paid'),
('STU044','Lokesh Gupta','lokesh44@gmail.com','9876500044','B.Tech CS','A-405','In Hostel','Mr. Gupta','9988700044','Paid'),
('STU045','Manav Shah','manav45@gmail.com','9876500045','B.Tech IT','A-405','In Hostel','Mr. Shah','9988700045','Pending'),

-- ================= BLOCK B =================
('STU046','Sameer Khan','sameer46@gmail.com','9876500046','B.Tech CE','B-201','In Hostel','Mr. Khan','9988700046','Paid'),
('STU047','Zaid Sheikh','zaid47@gmail.com','9876500047','B.Tech CS','B-201','In Hostel','Mr. Sheikh','9988700047','Paid'),
('STU048','Imran Ansari','imran48@gmail.com','9876500048','B.Tech IT','B-202','In Hostel','Mr. Ansari','9988700048','Pending'),
('STU049','Asif Qureshi','asif49@gmail.com','9876500049','B.Tech ME','B-202','In Hostel','Mr. Qureshi','9988700049','Paid'),
('STU050','Wasim Khan','wasim50@gmail.com','9876500050','B.Tech EE','B-203','In Hostel','Mr. Khan','9988700050','Paid'),
('STU051','Rizwan Shaikh','rizwan51@gmail.com','9876500051','B.Tech CS','B-205','In Hostel','Mr. Shaikh','9988700051','Pending'),
('STU052','Nadeem Khan','nadeem52@gmail.com','9876500052','B.Tech IT','B-205','In Hostel','Mr. Khan','9988700052','Paid'),
('STU053','Faheem Ansari','faheem53@gmail.com','9876500053','B.Tech CE','B-206','In Hostel','Mr. Ansari','9988700053','Paid'),
('STU054','Harshit Jain','harshit54@gmail.com','9876500054','B.Tech CS','B-301','In Hostel','Mr. Jain','9988700054','Paid'),
('STU055','Mayank Gupta','mayank55@gmail.com','9876500055','B.Tech IT','B-301','In Hostel','Mr. Gupta','9988700055','Pending'),
('STU056','Karan Sharma','karan56@gmail.com','9876500056','B.Tech ME','B-302','In Hostel','Mr. Sharma','9988700056','Paid'),
('STU057','Abhishek Singh','abhishek57@gmail.com','9876500057','B.Tech CE','B-302','In Hostel','Mr. Singh','9988700057','Paid'),
('STU058','Siddharth Patel','sid58@gmail.com','9876500058','B.Tech EE','B-303','In Hostel','Mr. Patel','9988700058','Pending'),
('STU059','Ritesh Shah','ritesh59@gmail.com','9876500059','B.Tech CS','B-305','In Hostel','Mr. Shah','9988700059','Paid'),
('STU060','Dhruv Mehta','dhruv60@gmail.com','9876500060','B.Tech IT','B-305','In Hostel','Mr. Mehta','9988700060','Paid'),
('STU061','Parth Patel','parth61@gmail.com','9876500061','B.Tech CS','B-401','In Hostel','Mr. Patel','9988700061','Paid'),
('STU062','Yogesh Sharma','yogesh62@gmail.com','9876500062','B.Tech IT','B-401','In Hostel','Mr. Sharma','9988700062','Pending'),
('STU063','Deep Shah','deep63@gmail.com','9876500063','B.Tech ME','B-402','In Hostel','Mr. Shah','9988700063','Paid'),
('STU064','Tejas Mehta','tejas64@gmail.com','9876500064','B.Tech CE','B-402','In Hostel','Mr. Mehta','9988700064','Paid'),
('STU065','Alok Singh','alok65@gmail.com','9876500065','B.Tech EE','B-403','In Hostel','Mr. Singh','9988700065','Paid'),
('STU066','Rohit Jain','rohit66@gmail.com','9876500066','B.Tech CS','B-405','In Hostel','Mr. Jain','9988700066','Pending'),
('STU067','Amit Gupta','amit67@gmail.com','9876500067','B.Tech IT','B-405','In Hostel','Mr. Gupta','9988700067','Paid'),
('STU068','Nilesh Patel','nilesh68@gmail.com','9876500068','B.Tech CE','B-406','In Hostel','Mr. Patel','9988700068','Paid'),
('STU069','Jayesh Shah','jayesh69@gmail.com','9876500069','B.Tech ME','B-406','In Hostel','Mr. Shah','9988700069','Pending'),
('STU070','Kishore Yadav','kishore70@gmail.com','9876500070','B.Tech EE','B-406','In Hostel','Mr. Yadav','9988700070','Paid'),

-- ================= BLOCK C (Girls complete) =================
('STU078','Aditi Sharma','aditi78@gmail.com','9876500078','B.Tech CS','C-201','In Hostel','Mr. Sharma','9988700078','Paid'),
('STU079','Ishita Patel','ishita79@gmail.com','9876500079','B.Tech IT','C-201','In Hostel','Mr. Patel','9988700079','Paid'),
('STU080','Rashmi Singh','rashmi80@gmail.com','9876500080','B.Tech CE','C-202','In Hostel','Mr. Singh','9988700080','Pending'),
('STU081','Nisha Verma','nisha81@gmail.com','9876500081','B.Tech CS','C-202','In Hostel','Mr. Verma','9988700081','Paid'),
('STU082','Komal Shah','komal82@gmail.com','9876500082','B.Tech IT','C-203','In Hostel','Mr. Shah','9988700082','Paid'),
('STU083','Divya Nair','divya83@gmail.com','9876500083','B.Tech ME','C-205','In Hostel','Mr. Nair','9988700083','Pending'),
('STU084','Megha Iyer','megha84@gmail.com','9876500084','B.Tech CE','C-205','In Hostel','Mr. Iyer','9988700084','Paid'),
('STU085','Shreya Reddy','shreya85@gmail.com','9876500085','B.Tech CS','C-301','In Hostel','Mr. Reddy','9988700085','Paid'),
('STU086','Pallavi Sharma','pallavi86@gmail.com','9876500086','B.Tech IT','C-301','In Hostel','Mr. Sharma','9988700086','Pending'),
('STU087','Tanvi Patel','tanvi87@gmail.com','9876500087','B.Tech CE','C-302','In Hostel','Mr. Patel','9988700087','Paid'),
('STU088','Nehal Shah','nehal88@gmail.com','9876500088','B.Tech CS','C-302','In Hostel','Mr. Shah','9988700088','Paid'),
('STU089','Ruchi Singh','ruchi89@gmail.com','9876500089','B.Tech IT','C-303','In Hostel','Mr. Singh','9988700089','Paid'),
('STU090','Kritika Verma','kritika90@gmail.com','9876500090','B.Tech ME','C-305','In Hostel','Mr. Verma','9988700090','Pending'),
('STU091','Sonal Gupta','sonal91@gmail.com','9876500091','B.Tech CE','C-305','In Hostel','Mr. Gupta','9988700091','Paid'),
('STU092','Riya Sharma','riya92@gmail.com','9876500092','B.Tech CS','C-401','In Hostel','Mr. Sharma','9988700092','Paid'),
('STU093','Muskan Patel','muskan93@gmail.com','9876500093','B.Tech IT','C-401','In Hostel','Mr. Patel','9988700093','Paid'),
('STU094','Ankita Singh','ankita94@gmail.com','9876500094','B.Tech CE','C-402','In Hostel','Mr. Singh','9988700094','Pending'),
('STU095','Preeti Verma','preeti95@gmail.com','9876500095','B.Tech CS','C-402','In Hostel','Mr. Verma','9988700095','Paid'),
('STU096','Swati Shah','swati96@gmail.com','9876500096','B.Tech IT','C-403','In Hostel','Mr. Shah','9988700096','Paid'),
('STU097','Heena Nair','heena97@gmail.com','9876500097','B.Tech ME','C-405','In Hostel','Mr. Nair','9988700097','Pending'),
('STU098','Jyoti Iyer','jyoti98@gmail.com','9876500098','B.Tech CE','C-405','In Hostel','Mr. Iyer','9988700098','Paid'),
('STU099','Bhavna Reddy','bhavna99@gmail.com','9876500099','B.Tech CS','C-406','In Hostel','Mr. Reddy','9988700099','Paid'),
('STU100','Kajal Sharma','kajal100@gmail.com','9876500100','B.Tech IT','C-406','In Hostel','Mr. Sharma','9988700100','Pending');
`;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const lines = rawSql.split('\n');
    let currentTable = null;

    const usersToInsert = [];
    const studentsToInsert = [];
    
    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('--')) continue;

      if (line.includes('INSERT INTO Users')) {
        currentTable = 'Users';
        continue;
      } else if (line.includes('INSERT INTO Students')) {
        currentTable = 'Students';
        continue;
      }

      if (line.startsWith('(')) {
        // Parse tuple
        let clean = line.replace(/\);?$|\),?$/g, '').trim();
        if (clean.endsWith(',')) clean = clean.slice(0, -1);
        
        // Remove open paren and split by comma
        const values = clean.substring(1).split(',').map(v => v.trim());
        const parsed = values.map(v => {
          if (v === 'NULL') return null;
          return v.replace(/^'|'$/g, '');
        });

        if (currentTable === 'Users') {
          // ('ADM1', 'admin@123', 'Admin', NULL, 'Dr. Anil Deshmukh')
          const role = parsed[2];
          let block = null;
          // Assign Warden blocks
          if (role === 'Warden') {
            if (parsed[0] === 'W1') block = 'A';
            if (parsed[0] === 'W2') block = 'B';
            if (parsed[0] === 'W3') block = 'C';
          }
          
          usersToInsert.push({
            hostelId: parsed[0],
            password: parsed[1],
            role: role,
            department: parsed[3],
            name: parsed[4],
            block: block
          });
        } else if (currentTable === 'Students') {
          // ('STU001','Aarav Sharma','aarav1@gmail.com','9876500001','B.Tech CS','A-101','In Hostel','Mr. Sharma','9988700001','Paid')
          studentsToInsert.push({
            studentId: parsed[0],
            name: parsed[1],
            email: parsed[2],
            phone: parsed[3],
            course: parsed[4],
            roomNo: parsed[5],
            status: parsed[6],
            parentName: parsed[7],
            parentPhone: parsed[8],
            feesStatus: parsed[9],
            entryExitLogs: []
          });

          // Also insert a User login for each student
          usersToInsert.push({
            hostelId: parsed[0],
            password: parsed[0] + '@123', // default password STU001@123
            role: 'Student',
            department: null,
            name: parsed[1],
            block: null
          });
        }
      }
    }

    // Insert Data
    await User.insertMany(usersToInsert);
    console.log("✅ Inserted " + usersToInsert.length + " Users.");

    await Student.insertMany(studentsToInsert);
    console.log("✅ Inserted " + studentsToInsert.length + " Students.");

    // Create Rooms based on students
    const roomMap = {};
    studentsToInsert.forEach(s => {
      if (!roomMap[s.roomNo]) {
        // Determine block
        const block = s.roomNo.split('-')[0];
        roomMap[s.roomNo] = {
          roomNo: s.roomNo,
          capacity: 2, // Defaulting to 2 as per normal setup
          occupants: 0,
          studentIds: [],
          block: block,
          availabilityStatus: 'Available',
          type: 'Double'
        };
      }
      roomMap[s.roomNo].occupants += 1;
      roomMap[s.roomNo].studentIds.push(s.studentId);
      if (roomMap[s.roomNo].occupants >= roomMap[s.roomNo].capacity) {
        roomMap[s.roomNo].availabilityStatus = 'Full';
      }
    });

    const roomsToInsert = Object.values(roomMap);
    await Room.insertMany(roomsToInsert);
    console.log("✅ Inserted " + roomsToInsert.length + " Rooms.");

    console.log('✅ Seeding completed successfully!');
    process.exit(0);

  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
