// server/routes/Order.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // adjust path if needed

// Place order
router.post('/place', (req, res) => {
  const { username, phone, address, items } = req.body;

  if (!username || !phone || !address || !items || items.length === 0) {
    return res.status(400).json({ message: 'Missing required fields or items' });
  }

  const totalAmount = items.reduce((sum, item) =>
    sum + ((item.price || 0) * (item.quantity || 1)), 0);

  const orderSql = 'INSERT INTO orders (username, phone, address, status, total_amount) VALUES (?, ?, ?, ?, ?)';

  db.query(orderSql, [username, phone, address, 'Order Placed', totalAmount], (err, result) => {
    if (err) {
      console.error('Order insert error:', err);
      return res.status(500).json({ message: 'Order creation failed', error: err.message });
    }

    const orderId = result.insertId;
    const orderItems = items.map(item => [
      orderId,
      item.name || "",
      item.price || 0,
      item.image || ""
    ]);

    const itemsSql = 'INSERT INTO order_items (order_id, name, price, image) VALUES ?';
    db.query(itemsSql, [orderItems], (err) => {
      if (err) {
        console.error('Order items insert error:', err);
        return res.status(500).json({ message: 'Failed to save order items', error: err.message });
      }
      res.status(200).json({ message: 'Order placed successfully!' });
    });
  });
});

// GET /api/order/user/:userId
router.get('/myorders', (req, res) => {
  const { username, phone } = req.query;

  if (!username || !phone) {
    return res.status(400).json({ error: "Username and phone required" });
  }

  db.query(
    "SELECT * FROM orders WHERE username = ? AND phone = ? ORDER BY id DESC",
    [username, phone],
    async (err, orderResults) => {
      if (err) return res.status(500).json({ error: "DB error", details: err });

      const enrichedOrders = await Promise.all(
        orderResults.map(async (order) => {
          return new Promise((resolve) => {
            db.query(
              "SELECT * FROM order_items WHERE order_id = ?",
              [order.id],
              (err, itemResults) => {
                if (err) resolve({ ...order, items: [] });
                else resolve({ ...order, items: itemResults });
              }
            );
          });
        })
      );

      res.json(enrichedOrders);
    }
  );
});



// Get all orders with items
router.get('/all', (req, res) => {
  const sql = 'SELECT * FROM orders ORDER BY id DESC';

  db.query(sql, (err, orders) => {
    if (err) return res.status(500).json({ message: 'Error fetching orders' });

    const orderIds = orders.map(o => o.id);
    if (orderIds.length === 0) return res.status(200).json([]);

    const itemsSql = 'SELECT * FROM order_items WHERE order_id IN (?)';

    db.query(itemsSql, [orderIds], (err, items) => {
      if (err) return res.status(500).json({ message: 'Error fetching items' });

      const itemsMap = {};
      items.forEach(item => {
        if (!itemsMap[item.order_id]) itemsMap[item.order_id] = [];
        itemsMap[item.order_id].push(item);
      });

      const enrichedOrders = orders.map(order => ({
        ...order,
        items: itemsMap[order.id] || []
      }));

      res.status(200).json(enrichedOrders);
    });
  });
});

// Basic GET for health check
router.get('/place', (req, res) => {
  res.send('✅ This is the order placement endpoint. Use POST to place an order.');
});

module.exports = router;
