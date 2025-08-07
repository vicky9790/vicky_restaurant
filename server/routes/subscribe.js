// server/routes/subscribe.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config(); // ensure env is loaded

// create transporter once with correct credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // must be app password without spaces
  },
  logger: true,
  debug: true,
});

// optional sanity check on startup
transporter.verify((err, success) => {
  if (err) {
    console.error('🚨 Mail transporter verification failed:', err);
  } else {
    console.log('✅ Mail transporter is ready');
  }
});

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  const mailOptions = {
    from: `"Vicky Restaurant" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🎉 Welcome to Vicky Restaurant!',
    html: `
      <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9; border-radius:8px;">
        <h2 style="color:#ff6600;">Welcome!</h2>
        <p>Thanks for subscribing to Vicky Restaurant. We'll keep you updated with delicious offers and new dishes.</p>
        <p style="margin-top:12px;">— <strong>Vicky Restaurant Team</strong></p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Welcome email sent!' });
  } catch (error) {
    console.error('❌ Email Error:', error);
    return res.status(500).json({ message: 'Email sending failed', error: error.message });
  }
});

module.exports = router;
