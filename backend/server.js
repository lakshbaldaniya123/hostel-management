const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hostel_system')
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// Routes
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/maintenance', require('./routes/maintenance'));
app.use('/api/students',    require('./routes/students'));
app.use('/api/rooms',       require('./routes/rooms'));
app.use('/api/leaves',      require('./routes/leaves'));
app.use('/api/complaints',  require('./routes/complaints'));
app.use('/api/gatepasses',  require('./routes/gatepasses'));
app.use('/api/fees',        require('./routes/fees'));
app.use('/api/meetings',    require('./routes/meetings'));
app.use('/api/vending',     require('./routes/vending'));
app.use('/api/lostfound',   require('./routes/lostfound'));
app.use('/api/gym',         require('./routes/gym'));
app.use('/api/mess',        require('./routes/mess'));

// Health Check
app.get('/', (req, res) => res.send('🏨 Hostel Management Backend API is Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
