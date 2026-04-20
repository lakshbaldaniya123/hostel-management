const mongoose = require('mongoose');
require('dotenv').config();
const Student = require('./models/Student');
const Fees = require('./models/Fees');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hostel_system';

async function seedFees() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB. Seeding Fees...');

    // Clear existing fees to prevent duplicates during this fix
    await Fees.deleteMany({});

    const students = await Student.find();
    const feesToInsert = students.map(s => {
      // If student status is Paid, they paid earlier.
      // If student status is Pending, they haven't paid.
      return {
        id: `FEE-${s.studentId}`,
        studentId: s.studentId,
        studentName: s.name,
        roomNo: s.roomNo,
        amount: 25000,
        dueDate: '2026-04-30',
        paidDate: s.feesStatus === 'Paid' ? '2026-04-01' : null,
        status: s.feesStatus,
        semester: 'Semester 2 2026',
        description: 'Hostel Fee + Mess Charges'
      };
    });

    await Fees.insertMany(feesToInsert);
    console.log(`✅ successfully seeded ${feesToInsert.length} Fee records!`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedFees();
