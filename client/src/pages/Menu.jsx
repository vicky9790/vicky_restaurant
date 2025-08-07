// Updated Menu.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import { useCart } from '../CartContext';

const fallbackMenuItems = [
  {
    id: 1,
    name: 'Paneer Butter Masala',
    category: 'veg',
    image: '/images/bannerbuttermasala.jpg',
    price: 150,
    rating: 4.3,
  },
  {
    id: 2,
    name: 'Chicken 65',
    category: ['non-veg','chicken'],
    image: '/images/chiken65.jpg',
    price: 180,
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Veg Meals',
    category: 'veg',
    image: '/images/vegmeals.jpg',
    price: 120,
    rating: 4.1,
  },
  {
    id: 4,
    name: 'Mutton Curry',
    category: ['non-veg','mutton'],
    image: '/images/muttoncurry.jpg',
    price: 220,
    rating: 4.4,
  },
  {
    id: 5,
    name: 'Gobi Manchurian',
    category: 'veg',
    image: '/images/gobimanchurian.jpg',
    price: 100,
    rating: 4.2,
  },
  {
    id: 6,
    name: 'Idli',
    category: 'veg',
    image: '/images/idli.jpeg',
    price: 40,
    rating: 4.2,
  },
  {
    id: 7,
    name: 'Dosa',
    category: 'veg',
    image: '/images/dosa.jpg',
    price: 40,
    rating: 4.5,
  },
  {
    id: 8,
    name: 'Uttapam',
    category: 'veg',
    image: '/images/Uttapam.jpg',
    price: 50,
    rating: 4.3,
  },
  {
    id: 9,
    name: 'Parotta',
    category: 'veg',
    image: '/images/parrotta.jpg',
    price: 30,
    rating: 4.0,
  },
  {
    id: 10,
    name: 'Egg biriyani',
    category: ['non-veg','biriyani'],
    image: '/images/eggbiriyani.jpg',
    price: 150,
    rating: 4.1,
  },
  {
    id: 11,
    name: 'Chiken Biriyani',
    category: ['non-veg','biriyani','chicken'],
    image: '/images/cbiriyani.jpeg',
    price: 200,
    rating: 4.6,
  },
  {
    id: 12,
    name: 'Naan',
    category: 'veg',
    image: '/images/naan.jpg',
    price: 50,
    rating: 4.3,
  },
  {
    id: 13,
    name: 'Pongal',
    category: 'Veg',
    image: '/images/pongal.jpg',
    price: 80,
    rating: 4.3,
  },
  {
    id: 14,
    name: 'Curd Rice',
    category: 'Veg',
    image: '/images/curdrice.jpg',
    price: 90,
    rating: 4.5,
  },
  {
    id: 15,
    name: 'Veg Noodles',
    category: 'Veg',
    image: '/images/vegnoodles.jpg',
    price: 130,
    rating: 4.3,
  },
  {
    id: 16,
    name: 'Chicken Noodles',
    category: ['non-veg','chicken'],
    image: '/images/cnoodles.jpg',
    price: 180,
    rating: 4.8,
  },
  {
    id: 17,
    name: 'Egg Noodles',
    category: 'non-veg',
    image: '/images/eggnoodles.jpg',
    price: 150,
    rating: 3.7,
  },
  {
    id: 18,
    name: 'Grill Chicken(Half)',
    category: ['non-veg','chicken'],
    image: '/images/grillchicken.jpg',
    price: 320,
    rating: 4.7,
  },
  {
    id: 19,
    name: 'Tandoori Chicken(Half)',
    category: ['non-veg','chicken'],
    image: '/images/tandoorichicken.jpg',
    price: 340,
    rating: 4.5,
  },
  {
    id: 20,
    name: 'Chicken Gravy',
    category: ['non-veg','chicken'],
    image: '/images/chickengravy.jpg',
    price: 120,
    rating: 4.3,
  },
  {
    id: 21,
    name: 'Butter Chicken',
    category: ['non-veg','chicken'],
    image: '/images/butterchicken.jpg',
    price: 190,
    rating: 4.9,
  },
  {
    id: 22,
    name: 'Mutton Gravy',
    category: ['non-veg','mutton'],
    image: '/images/muttongravy.jpg',
    price: 240,
    rating: 4.7,
  },
  {
    id: 23,
    name: 'Chiken Tikka Masala', 
    category: ['non-veg','chicken'],
    image: '/images/chikentikkamasala.jpg',
    price: 180,
    rating: 4.5,
  },
  {
    id: 24,
    name: 'Tandoori Chiken Tikka',
    category: ['non-veg','chicken'],
    image: '/images/tchickentikka.jpg',
    price: 150,
    rating: 4.6,
  },
  {
    id: 25,
    name: 'Chicken Chettinad',
    category: ['non-veg','chicken'],
    image: '/images/chickenchettinad.jpg',
    price: 160,
    rating: 4.1,
  },
  {
    id: 26,
    name: 'Chicken Lolipop(5pcs)',
    category: ['non-veg','chicken'],
    image: '/images/clolipop.jpg',
    price: 110,
    rating: 3.8,
  },
  {
    id: 27,
    name: 'Chilli Chicken',
    category: ['non-veg','chicken'],
    image: '/images/chillichicken.jpg',
    price: 130,
    rating: 4.5,
  },
  {
    id: 28,
    name: 'Dragon Chicken',
    category: ['non-veg','chicken'],
    image: '/images/dragonchicken.jpg',
    price: 150,
    rating: 4.4,
  },
  {
    id: 29,
    name: 'Hyderabadi Chicken Biriyani',
    category: ['non-veg','chicken','biriyani'],
    image: '/images/hbiriyani.jpg',
    price: 180,
    rating: 4.1,
  },
  {
    id: 30,
    name: 'Fried Chicken',
    category: ['non-veg','chicken'],
    image: '/images/vfc.jpg',
    price: 220,
    rating: 4.9,
  },

  {
    id: 31,
    name: 'Chickem Shawarma',
    category: ['non-veg','chicken'],
    image: '/images/cshawarma.jpg',
    price: 100,
    rating: 4.3,
  },

  {
    id: 32,
    name: 'Mutton Biriyani',
    category: ['non-veg','mutton', 'biriyani'],
    image: '/images/muttonbiriyani.jpg',
    price: 250,
    rating: 4.5,
  },

  {
    id: 33,
    name: 'Mutton Ghee Roast',
    category: ['non-veg','mutton'],
    image: '/images/muttongheeroast.jpg',
    price: 220,
    rating: 4.6,
  },
  {
    id: 34,
    name: 'Mutton Kola Urundai(5pcs)',
    category: ['non-veg','mutton'],
    image: '/images/mkola.jpg',
    price: 90,
    rating: 4.9,
  },
  {
    id: 35,
    name: 'Mutton Chukka',
    category: ['non-veg','mutton'],
    image: '/images/mchukka.jpg',
    price: 140,
    rating: 4.2,
  },
  {
    id: 36,
    name: 'Mutton Kebab',
    category: ['non-veg','mutton'],
    image: '/images/mkebab.jpg',
    price: 150,
    rating: 4.6,
  },
  {
    id: 37,
    name: 'Mutton Nalli(4pcs)',
    category: ['non-veg','mutton'],
    image: '/images/mnalli.jpg',
    price: 250,
    rating: 4.3,
  },
  {
    id: 38,
    name: 'Mutton Stew',
    category: ['non-veg','mutton'],
    image: '/images/mstew.jpg',
    price: 190,
    rating: 3.5,
  },
  {
    id: 39,
    name: 'Prawn Biriyani',
    category: ['non-veg','biriyani'],
    image: '/images/prawnbiriyani.jpg',
    price: 250,
    rating: 4.5,
  },
  {
    id: 40,
    name: 'Fish Biriyani',
    category: ['non-veg','biriyani'],
    image: '/images/fishbiriyani.jpg',
    price: 250,
    rating: 4.5,
  },
  {
    id: 41,
    name: 'Veg Biriyani',
    category: ['veg','biriyani'],
    image: '/images/vegbiriyani.jpg',
    price: 250,
    rating: 4.5,
  },
  {
    id: 42,
    name: 'Chiken Mandi (quarter)',
    category: ['non-veg','biriyani','chicken'],
    image: '/images/cmandi.jpg',
    price: 190,
    rating: 5,
  },
  {
    id: 43,
    name: 'Mutton Mandi',
    category: ['non-veg','biriyani','mutton'],
    image: '/images/mmandi.jpg',
    price: 190,
    rating: 5,
  },
  {
    id: 44,
    name: 'Seeraga Samba Mutton Biriyani',
    category: ['non-veg','biriyani','mutton'],
    image: '/images/ssmbiriyani.jpg',
    price: 260,
    rating: 4.9,
  },
  {
    id: 45,
    name: 'Seeraga Samba Chicken Biriyani',
    category: ['non-veg','biriyani','chiken'],
    image: '/images/sscbiriyani.jpg',
    price: 210,
    rating: 4.6,
  },
  {
    id: 46,
    name: 'Fish Fry',
    category: ['non-veg'],
    image: '/images/fishfry.jpg',
    price: 180,
    rating: 4.1,
  },
  {
    id: 47,
    name: 'Fish Curry',
    category: ['non-veg'],
    image: '/images/fishcurry.jpg',
    price: 150,
    rating: 4.3,
  },
  {
    id: 48,
    name: 'Fish Tawa Fry',
    category: ['non-veg'],
    image: '/images/ftawafry.jpg',
    price: 100,
    rating: 4.6,
  },
  {
    id: 49,
    name: 'Prawn Curry',
    category: ['non-veg'],
    image: '/images/prawncurry.jpg',
    price: 150,
    rating: 4.2,
  },
  {
    id: 50,
    name: 'Prawn Fry',
    category: ['non-veg'],
    image: '/images/prawnfry.jpg',
    price: 180,
    rating: 4.6,
  },
  {
    id: 51,
    name: 'Chapati',
    category: ['veg'],
    image: '/images/chapati.jpg',
    price: 30,
    rating: 4.6,
  },
  {
    id: 52,
    name: 'Rawa Upma',
    category: ['veg'],
    image: '/images/upma.jpg',
    price: 90,
    rating: 4.0,
  },
  {
    id: 53,
    name: 'Rawa Dosa',
    category: ['veg'],
    image: '/images/rawadosa.jpg',
    price: 50,
    rating: 4.1,
  },
  {
    id: 54,
    name: 'Chicken Pizza',
    category: ['non-veg','chicken'],
    image: '/images/chickenpizza.jpg',
    price: 180,
    rating: 4.3,
  },
  {
    id: 55,
    name: 'Panner Tikka Pizza',
    category: ['veg'],
    image: '/images/ptpizza.jpg',
    price: 140,
    rating: 4.7,
  },
  {
    id: 56,
    name: 'Panner Burger',
    category: ['veg'],
    image: '/images/pburger.jpg',
    price: 100,
    rating: 4.2,
  },
  {
    id: 57,
    name: 'Chicken Burger',
    category: ['non-veg','chicken'],
    image: '/images/cburger.jpg',
    price: 150,
    rating: 4.8,
  },

  
  
];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [userRatings, setUserRatings] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5050/api/menu')
      .then(res => setMenuItems(res.data))
      .catch(err => {
        console.error('API error, using fallback menu:', err);
        setMenuItems(fallbackMenuItems);
      });
  }, []);

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((i) => i.id === item.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };
  

  const handleUserRating = (itemId, rating) => {
    setUserRatings(prev => ({ ...prev, [itemId]: rating }));
    alert(`⭐ Thank you for rating this item ${rating} star${rating > 1 ? 's' : ''}!`);
  };

  const filteredItems =
  filter === 'all'
    ? menuItems
    : menuItems.filter(item =>
        Array.isArray(item.category)
          ? item.category.includes(filter)
          : item.category === filter
      );


  return (
    <div className="menu-page">
      <h2>🍽️ Our Menu</h2>

      <div className="menu-filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('veg')} className={filter === 'veg' ? 'active' : ''}>Veg</button>
        <button onClick={() => setFilter('non-veg')} className={filter === 'non-veg' ? 'active' : ''}>Non-Veg</button>
        <button onClick={() => setFilter('biriyani')} className={filter === 'biriyani' ? 'active' : ''}>Biriyani</button>
        <button onClick={() => setFilter('chicken')} className={filter === 'chicken' ? 'active' : ''}>Chicken</button>
        <button onClick={() => setFilter('mutton')} className={filter === 'mutton' ? 'active' : ''}>Mutton</button>
      </div>

      <div className="menu-grid">
        {filteredItems.map(item => {
          const currentUserRating = userRatings[item.id] || 0;
          return (
            <div key={item.id} className="menu-card">
  <img src={item.image} alt={item.name} />
  <h3>{item.name}</h3>
  <div className="menu-card-content">
    <p className="menu-price">₹ {item.price}</p>

    <div className="rating-display">
      <span className="stars">
        {'★'.repeat(Math.floor(item.rating || 4))}
        {'☆'.repeat(5 - Math.floor(item.rating || 4))}
      </span>
      <span className="rating-value">({item.rating || '4.0'})</span>
    </div>

    <div className="user-rating">
      <span>Rate this:</span>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`star-input ${currentUserRating >= star ? 'filled' : ''}`}
          onClick={() => handleUserRating(item.id, star)}
        >
          ★
        </span>
      ))}
    </div>
    <button className="add-cart-btn" onClick={() => handleAddToCart(item)}>
      Add to Cart
    </button>
  </div>
</div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
