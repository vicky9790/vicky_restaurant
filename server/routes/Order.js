const express = require('express');
const router = express.Router();
const db = require('../config/db'); // mysql2/promise pool

// Place order
router.post('/place', async (req, res) => {
  try {
    const { username, phone, address, items } = req.body;

    if (!username || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or items' });
    }

    const totalAmount = items.reduce((sum, item) =>
      sum + ((item.price || 0) * (item.quantity || 1)), 0
    );

    // Insert order
    const orderSql = 'INSERT INTO orders (username, phone, address, status, total_amount) VALUES (?, ?, ?, ?, ?)';
    const [orderResult] = await db.query(orderSql, [username, phone, address, 'Order Placed', totalAmount]);

    const orderId = orderResult.insertId;

    // Prepare items
    const orderItems = items.map(item => [
      orderId,
      item.name || "",
      item.price || 0,
      item.image || ""
    ]);

    // Insert items
    const itemsSql = 'INSERT INTO order_items (order_id, name, price, image) VALUES ?';
    await db.query(itemsSql, [orderItems]);

    res.status(200).json({ message: 'Order placed successfully!', orderId });

  } catch (err) {
    console.error('Order placement error:', err);
    res.status(500).json({ message: 'Order creation failed', error: err.message });
  }
});

// Get my orders
router.get('/myorders', async (req, res) => {
  try {
    const { username, phone } = req.query;
    if (!username || !phone) {
      return res.status(400).json({ error: "Username and phone required" });
    }

    const [orderResults] = await db.query(
      "SELECT * FROM orders WHERE username = ? AND phone = ? ORDER BY id DESC",
      [username, phone]
    );

    // Fetch items for each order
    const enrichedOrders = await Promise.all(orderResults.map(async order => {
      const [itemResults] = await db.query(
        "SELECT * FROM order_items WHERE order_id = ?",
        [order.id]
      );
      return { ...order, items: itemResults };
    }));

    res.json(enrichedOrders);
  } catch (err) {
    res.status(500).json({ error: "DB error", details: err.message });
  }
});

// Get all orders with items
router.get('/all', async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders ORDER BY id DESC');
    if (orders.length === 0) return res.status(200).json([]);

    const orderIds = orders.map(o => o.id);
    const [items] = await db.query('SELECT * FROM order_items WHERE order_id IN (?)', [orderIds]);

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
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

module.exports = router;
