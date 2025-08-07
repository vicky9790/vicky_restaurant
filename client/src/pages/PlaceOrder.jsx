import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const [username, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !address || !phone || cart.length === 0) {
      alert("Please fill all fields and make sure your cart is not empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5050/api/order/place", {
        username,
        phone,
        address,
        items: cart,
      });

      if (response.status === 200) {
        alert("✅ Order placed successfully!");
        // Save username and phone in localStorage
localStorage.setItem("latestUsername", username);
localStorage.setItem("latestPhone", phone);

        navigate("/myorders");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <div className="place-order-container">
      <h2>Place Your Order</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
          type="text" 
          placeholder="Enter your name"
          value={username} 
          onChange={(e) => setName(e.target.value)}
          required
           />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>

        <h3>🛒 Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={
                    item.image?.startsWith("/")
                      ? item.image
                      : `/${item.image}`
                  }
                  alt={item.name}
                  className="cart-image"
                />
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: ₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
            <h3>Total: ₹{totalPrice}</h3>
          </div>
        )}

        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
