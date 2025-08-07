// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/Order');
const subscribeRoute = require('./routes/subscribe');

dotenv.config(); // load .env

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/subscribe', subscribeRoute); // uses subscribe.js

app.get('/', (req, res) => {
  res.send('Vicky-Restaurant backend running!');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
