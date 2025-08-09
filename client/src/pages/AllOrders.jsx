// src/pages/AllOrders.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const stages = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];

const DeliveryTracker = ({ status }) => {
  const currentIndex = stages.indexOf(status);
  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      {stages.map((stage, index) => (
        <div
          key={stage}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            background: index <= currentIndex ? "#28a745" : "#dee2e6",
            color: index <= currentIndex ? "white" : "black",
            transition: "all 0.3s ease"
          }}
        >
          {stage}
        </div>
      ))}
    </div>
  );
};

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/order/all`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Order fetch error:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              marginBottom: "20px",
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: "#f8f9fa"
            }}
          >
            <h4>User: {order.username}</h4>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <DeliveryTracker status={order.status} />

            <h5 style={{ marginTop: "15px" }}>Items:</h5>
            <ul style={{ paddingLeft: "20px" }}>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ₹{item.price}
                  </li>
                ))
              ) : (
                <li>No items found</li>
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AllOrders;
