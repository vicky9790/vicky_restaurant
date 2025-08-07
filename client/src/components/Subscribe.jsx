import React, { useState } from "react";
import axios from "axios";
import "./Subscribe.css";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5050/api/subscribe", {
        email,
      });
      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <div className="subscribe-section">
      <div className="subscribe-box">
        <h2>Subscribe for Updates</h2>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && <p className="subscribe-message">{message}</p>}
      </div>
    </div>
  );
};

export default Subscribe;
