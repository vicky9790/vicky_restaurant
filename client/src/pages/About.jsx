import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Vicky-Restaurant</h1>
        <p>Authentic South Indian food delivered to your doorstep.</p>
      </div>

      <div className="about-content">
        <section>
          <h2>Our Story</h2>
          <p>
            Founded in 2025, Vicky-Restaurant started with a mission to bring the
            rich flavors of South Indian cuisine to everyone online. From crispy
            dosas to flavorful biryanis, we serve with love.
          </p>
        </section>

        <section>
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Fresh & Authentic Ingredients</li>
            <li>Fast Delivery</li>
            <li>Hygienic Packaging</li>
            <li>Affordable Pricing</li>
          </ul>
        </section>

        <section>
          <h2>Visit or Contact Us</h2>
          <p>
            📍 Coimbatore, Tamil Nadu <br />
            📞 +91 8056474755 <br />
            📧 support@vickyrestaurant.in
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
