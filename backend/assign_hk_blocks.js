const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hostel_system';

async function assignBlocks() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB. Updating Housekeeper assignments...');

    // Female Housekeepers -> Block C
    const femaleNames = ['Sunita Yadav', 'Meena Kumari', 'Lata Shinde', 'Pooja Verma', 'Anita Chauhan', 'Rekha Nair'];
    // Male Housekeepers -> Block A & B
    const maleNamesA = ['Suresh Pawar', 'Ramesh Gupta'];
    const maleNamesB = ['Kiran Patil', 'Vijay More'];

    // Update female housekeepers
    const resC = await User.updateMany(
      { department: 'Housekeeper', name: { $in: femaleNames } },
      { $set: { block: 'C' } }
    );
    console.log(`✅ Assigned Block C to ${resC.modifiedCount} female housekeepers.`);

    // Update male housekeepers A
    const resA = await User.updateMany(
      { department: 'Housekeeper', name: { $in: maleNamesA } },
      { $set: { block: 'A' } }
    );
    console.log(`✅ Assigned Block A to ${resA.modifiedCount} male housekeepers.`);

    // Update male housekeepers B
    const resB = await User.updateMany(
      { department: 'Housekeeper', name: { $in: maleNamesB } },
      { $set: { block: 'B' } }
    );
    console.log(`✅ Assigned Block B to ${resB.modifiedCount} male housekeepers.`);

    console.log('🎉 Housekeeper assignment completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error updating DB:', err);
    process.exit(1);
  }
}

assignBlocks();
