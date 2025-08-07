import React from 'react';

const MenuItemCard = ({ item, onAddToCart }) => (
  <div className="menu-card">
    <h3>{item.name}</h3>
    <p>{item.description}</p>
    <p>₹{item.price}</p>
    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
  </div>
);

export default MenuItemCard;
