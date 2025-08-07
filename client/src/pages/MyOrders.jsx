import React, { useEffect, useState } from "react";
import "./MyOrder.css";
import axios from "axios";
import DeliveryTracker from "../components/DeliveryTracker";
import '../components/DeliveryTracker.css';


const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("latestUsername");
    const phone = localStorage.getItem("latestPhone");

    if (!username || !phone) return;

    axios
      .get(`http://localhost:5050/api/order/myorders?username=${username}&phone=${phone}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders", err);
      });
  }, []);

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Order #{order.id}</h3>
            <p><strong>Name:</strong> {order.username}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Total:</strong> ₹{order.total_amount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <div className="order-items">
              {order.items.map((item, i) => (
                <div className="order-item" key={i}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    
                  </div>
                  <DeliveryTracker currentStatus={order.status || "Order Placed"} />

                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
