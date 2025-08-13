const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/Order');
const subscribeRoute = require('./routes/subscribe');

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000', // Local dev
  'https://vicky-restaurant.onrender.com', // Prod frontend
  process.env.FRONTEND_URL // Optional from .env
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman / curl
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error(`CORS policy: No access from origin ${origin}`), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/subscribe', subscribeRoute);

// Health check
app.get('/', (req, res) => {
  res.send('✅ Vicky-Restaurant backend running!');
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
