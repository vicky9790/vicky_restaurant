// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/Order');
const subscribeRoute = require('./routes/subscribe');

const app = express();

// Flexible list of allowed origins
const allowedOrigins = [                        // Local development origin
  process.env.FRONTEND_URL || 'https://vicky-restaurant.onrender.com'  // Production frontend origin (set in your .env or Render dashboard)
];

// Robust CORS configuration supporting both dev and prod
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like curl and Postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: No access from origin ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // allow cookies/headers if you use authentication
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/subscribe', subscribeRoute);

// Test endpoint
app.get('/', (req, res) => {
  res.send('Vicky-Restaurant backend running!');
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
