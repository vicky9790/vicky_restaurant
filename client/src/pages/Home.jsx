import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext'; // ✅ Make sure the path is correct
import './Home.css';
import { FaUtensils, FaMotorcycle, FaStar } from 'react-icons/fa';

const Home = () => {
  const [email, setEmail] = useState('');
  const { addToCart } = useCart(); // ✅ This gives access to addToCart

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API}/api/subscribe`, { email });
      alert('✅ Subscribed Successfully!');
      setEmail('');
    } catch (err) {
      console.error('❌ Subscription failed:', err);
      alert('❌ Failed to subscribe. Please try again later.');
    }
  };

  const specialItem = {
    id: 'special-nonveg-combo',
    name: 'Non-Veg Combo',
    price: 199,
    image: '/images/nonvegmeals.jpg',
    description: 'Includes Chicken Biryani, 2 pieces of Chicken 65, Raitha, and a soft drink.',
    quantity: 1,
  };

  const handleAddToCart = () => {
    addToCart(specialItem);
    alert('✅ Added to cart!');
  };

  return (
    <div className="home-page">

      {/* 🔥 Hero Section */}
      <div className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Vicky&apos;s Restaurant</h1>
          <p>Delicious South Indian Veg & Non-Veg Dishes</p>
          <div className="hero-buttons">
            <Link to="/menu" className="animated-btn orange">View Menu</Link>
            <Link to="/cart" className="animated-btn white">Order Now</Link>
          </div>
        </div>
      </div>

      {/* 🍽️ Popular Dishes */}
      <section className="popular-menu">
        <h2>Popular Dishes</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <img src="/images/cbiriyani.jpeg" alt="Biryani" />
            <h3>Chicken Biryani</h3>
            <p>Spicy, fragrant biryani with tender chicken pieces.</p>
          </div>
          <div className="menu-card">
            <img src="/images/dosa.jpg" alt="Dosa" />
            <h3>Masala Dosa</h3>
            <p>Crispy dosa stuffed with potato masala, served with chutneys.</p>
          </div>
          <div className="menu-card">
            <img src="/images/southindianmeals.jpg" alt="Meals" />
            <h3>South Indian Meals</h3>
            <p>Complete vegetarian meals with rice, sambar, rasam and more.</p>
          </div>
        </div>
      </section>

      {/* ⭐ Features */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaUtensils className="feature-icon" />
            <h4>Authentic Flavors</h4>
            <p>Traditional South Indian taste made with love and quality.</p>
          </div>
          <div className="feature-card">
            <FaMotorcycle className="feature-icon" />
            <h4>Fast Delivery</h4>
            <p>Hot and fresh food delivered to your doorstep on time.</p>
          </div>
          <div className="feature-card">
            <FaStar className="feature-icon" />
            <h4>Highly Rated</h4>
            <p>Customers love our food, service, and variety of options.</p>
          </div>
        </div>
      </section>

      {/* ❤️ Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"The best biryani in town! Tastes like home. Highly recommend."</p>
            <h4>- Arjun K.</h4>
          </div>
          <div className="testimonial-card">
            <p>"Very clean and quick delivery. Dosa was crispy and flavorful!"</p>
            <h4>- Meena S.</h4>
          </div>
          <div className="testimonial-card">
            <p>"Love the combo meals! Great value and real South Indian taste."</p>
            <h4>- Ravi M.</h4>
          </div>
        </div>
      </section>

      {/* 🔥 Special Offer */}
      <section className="special-offer">
        <h2>🔥 Today's Special</h2>
        <div className="offer-card">
          <img src={specialItem.image} alt={specialItem.name} />
          <div className="offer-details">
            <h3>{specialItem.name} @ ₹{specialItem.price}</h3>
            <p>{specialItem.description}</p>
            <button onClick={handleAddToCart} className="animated-btn orange">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* 📍 Location */}
      <section className="location-hours">
        <h2>📍 Visit Us</h2>
        <div className="info-grid">
          <div>
            <h4>📍 Coimbatore</h4>
            <p>2nd street, Gandhipuram, Coimbatore, Tamil Nadu - 641012</p>
          </div>
          <div>
            <h4>⏰ Opening Hours:</h4>
            <p>Mon–Sun: 10:00 AM – 10:30 PM</p>
          </div>
        </div>
      </section>

      {/* ✉️ Subscribe */}
      <section className="call-to-action">
        <h2>Stay Connected!</h2>
        <p>Get updates on new dishes, offers & events. No spam, promise!</p>
        <form className="cta-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="animated-btn orange">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
