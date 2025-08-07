import React from 'react';
import './OrderTracker.css';

const OrderTracker = ({ status }) => {
  const steps = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];

  const currentIndex = steps.indexOf(status);

  return (
    <div className="tracker">
      {steps.map((step, idx) => (
        <div key={idx} className={`step ${idx <= currentIndex ? 'active' : ''}`}>
          <div className="circle">{idx + 1}</div>
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderTracker;
