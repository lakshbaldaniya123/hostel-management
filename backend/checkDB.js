const mongoose = require('mongoose');

async function check() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hostel_system');
  const User = require('./models/User');
  const hk = await User.findOne({ hostelId: 'HK1' });
  const sc = await User.findOne({ hostelId: 'SC1' });
  console.log('HK1 password is:', hk ? hk.password : 'Not Found');
  console.log('SC1 password is:', sc ? sc.password : 'Not Found');
  process.exit();
}
check();
